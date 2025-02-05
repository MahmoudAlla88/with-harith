import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ref, get, database , auth } from "../firebase";

import { IoArrowBack } from "react-icons/io5";
import {
  MdDashboard,
  MdOutlineTaskAlt,
  MdAddTask,
  MdPendingActions,
  MdCloudDone,
  MdOutlineAccessTimeFilled,
  MdQueryStats,
} from "react-icons/md";
import { GrTask, GrInProgress } from "react-icons/gr";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    deployed: 0,
    deferred: 0,
  });

  const [user, setUser] = useState(null); // تعيين قيمة المستخدم من Firebase Auth
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (user) {
        const userRef = ref(database, `users/${user.uid}/role`); // استخدم userRef هنا بدلاً من roleRef
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const role = snapshot.val();
          console.log(role);
          if (role === "manager") {
            setIsManager(true);
          } else {
            setIsManager(false);
          }
        }
      }
    };

    if (user) {
      checkRole();
    }
  }, [user]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // تحديث المتغير user
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await axios.get(
          "https://reactprojectteam-default-rtdb.firebaseio.com/tasks.json"
        );

        if (response.data) {
          const data = response.data;
          const tasksArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const stats = {
            pending: tasksArray.filter((task) => task.status === "Pending")
              .length,
            inProgress: tasksArray.filter(
              (task) => task.status === "In Progress"
            ).length,
            completed: tasksArray.filter((task) => task.status === "Completed")
              .length,
            deployed: tasksArray.filter((task) => task.status === "Deployed")
              .length,
            deferred: tasksArray.filter((task) => task.status === "Deferred")
              .length,
          };

          setTaskStats(stats);
        }
      } catch (error) {
        // استخدم SweetAlert لعرض الخطأ
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch task stats.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchTaskStats();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 min-h-screen w-[80px] sm:w-[250px] flex flex-col gap-6 py-8 px-4 shadow-lg transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <GrTask className="text-white text-3xl" />
        <span className="text-white text-xl font-semibold hidden sm:block">
          ManageMate
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
      {isManager && (    <Link
          to="/AllTasksM"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdDashboard className="text-2xl" />
          <span className="hidden sm:inline-block">Dashboard</span>
        </Link>)}
      {!isManager && (    <Link
          to="/AllTasks"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdDashboard className="text-2xl" />
          <span className="hidden sm:inline-block">Dashboard</span>
        </Link>)}
        {isManager && (
          <Link
            to="/statsTask"
            className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
          >
            <MdQueryStats className="text-2xl" />
            <span className="hidden sm:inline-block">Task Analytics</span>
          </Link>
        )}

        <Link
          to="/completeTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdOutlineTaskAlt className="text-2xl" />
          <span className="hidden sm:inline-block">Completed </span>
        </Link>

        <Link
          to="/pendingTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdPendingActions className="text-2xl" />
          <span className="hidden sm:inline-block">Pending Tasks</span>
        </Link>

        <Link
          to="/inProgressTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <GrInProgress className="text-2xl" />
          <span className="hidden sm:inline-block">In Progress</span>
        </Link>

        <Link
          to="/deferredTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdOutlineAccessTimeFilled className="text-2xl" />
          <span className="hidden sm:inline-block">Deferred Tasks</span>
        </Link>

        <Link
          to="/"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <IoArrowBack className="text-2xl" />
          <span className="hidden sm:inline-block">Go Back</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
