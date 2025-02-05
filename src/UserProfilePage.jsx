import React, { useState, useEffect } from "react";
import {
  Edit,
  PhoneCall,
  Mail,
  Plus,
  Trash,
  Calendar,
  User,
  Briefcase,
  MapPin,
} from "lucide-react";
import { get, set, push, ref, remove } from "firebase/database";
import { database, auth } from "./firebase"; // تم إضافة auth هنا
import { useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  company: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  status: "",
  position: "",
  assignedTo: "",
  password: "",
};

const initialTask = {
  title: "",
  description: "",
  priority: "",
  deadline: "",
};

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(initialUser);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(initialTask);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [image, setImage] = useState(null);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("تم تسجيل الخروج بنجاح");
        window.location.href = "/login"; // إعادة توجيه إلى صفحة تسجيل الدخول
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء تسجيل الخروج:", error);
      });
  };

  useEffect(() => {
    if (!auth.currentUser.uid) {
      setError("User ID is required");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchUserData(), fetchTasks()]);
      } catch (err) {
        setError(err.message);
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const fetchUserData = async () => {
    const userRef = ref(database, `users/${auth.currentUser.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      setUser(snapshot.val());
    } else {
      throw new Error("User not found");
    }
  };

  const fetchTasks = async () => {
    const tasksRef = ref(database, `tasks/${auth.currentUser.uid}`);
    const snapshot = await get(tasksRef);
    if (snapshot.exists()) {
      const tasksData = snapshot.val();
      const tasksArray = Object.entries(tasksData).map(([id, task]) => ({
        id,
        ...task,
      }));
      setTasks(tasksArray);
    } else {
      setTasks([]);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;

      const taskRef = ref(
        database,
        `tasks/${userId || auth.currentUser.uid}/${taskId}`
      );
      await set(taskRef, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      setError("Failed to update task status");
      console.error("Error toggling task:", err);
    }
  };

  const addTask = async () => {
    try {
      if (
        !newTask.title ||
        !newTask.description ||
        !newTask.priority ||
        !newTask.deadline
      ) {
        setError("Please fill all task fields");
        return;
      }

      const tasksRef = ref(database, `tasks/${userId || auth.currentUser.uid}`);
      const newTaskRef = push(tasksRef);
      const taskData = { ...newTask, completed: false };

      await set(newTaskRef, taskData);

      setTasks((prevTasks) => [
        ...prevTasks,
        { id: newTaskRef.key, ...taskData },
      ]);
      setNewTask(initialTask);
      setIsAddingTask(false);
    } catch (err) {
      setError("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const taskRef = ref(
        database,
        `tasks/${userId || auth.currentUser.uid}/${taskId}`
      );
      await remove(taskRef);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to remove task");
      console.error("Error removing task:", err);
    }
  };

  const handleEditTask = async (taskId) => {
    try {
      const taskRef = ref(
        database,
        `tasks/${userId || auth.currentUser.uid}/${taskId}`
      );
      await set(taskRef, { ...taskToEdit, completed: false });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...taskToEdit } : task
        )
      );

      setIsAddingTask(false);
      setTaskToEdit(null);
    } catch (err) {
      setError("Failed to edit task");
      console.error("Error editing task:", err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const userRef = ref(database, `users/${userId || auth.currentUser.uid}`);
      await set(userRef, user);
      setIsEditingProfile(false);
    } catch (err) {
      setError("Failed to save profile");
      console.error("Error saving profile:", err);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // تحديث الصورة المعروضة
      };
      reader.readAsDataURL(file); // قراءة الصورة وتحويلها إلى Base64
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <img
                    src={image || "/api/placeholder/400/400"}
                    alt={user.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                  />
                  <button
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                    className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <input
                    id="imageInput"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                    <span className="text-gray-600">{user.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">
  <button
    onClick={() => (window.location.href = `mailto:${user.email}`)} // يفتح تطبيق البريد الإلكتروني
    className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
  >
    <Mail className="w-4 h-4 mr-2" />
    Message
  </button>

  <button
    onClick={() => setIsEditingProfile(true)}
    className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
  >
    Edit Profile
  </button>

  <button
    onClick={handleLogout}
    className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
  >
    Logout
  </button>
</div>

              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.position}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Reports to {user.assignedTo}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>
                      {user.location}, {user.city}, {user.state}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PhoneCall className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              {isEditingProfile ? (
                <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Edit Profile
                    </h3>
                    <input
                      type="text"
                      placeholder="position"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.position}
                      onChange={(e) =>
                        setUser({ ...user, position: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.firstName}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.lastName}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="location"
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={user.location}
                      onChange={(e) =>
                        setUser({ ...user, location: e.target.value })
                      }
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
              <></>
              )}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Tasks</h3>
                {user.role && user.role === "manager" && (
                  <button
                    onClick={() => setIsAddingTask(!isAddingTask)}
                    className="text-blue-600"
                  >
                    <Plus size={14} />
                    {isAddingTask ? "Cancel" : "Add Task"}
                  </button>
                )}
              </div>

              {isAddingTask && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Task Title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Task Description"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Priority"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                  />
                  <button
                    onClick={
                      taskToEdit ? () => handleEditTask(taskToEdit.id) : addTask
                    }
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
                  >
                    {taskToEdit ? "Save Changes" : "Add Task"}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingTask(false);
                      setTaskToEdit(null);
                    }}
                    className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="mt-4 space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div>
                      <span className="text-lg">{task.title}</span>
                      <p className="text-sm text-gray-600">{task.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setTaskToEdit(task);
                          setIsAddingTask(true);
                        }}
                        className="text-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
