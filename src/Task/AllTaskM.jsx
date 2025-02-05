import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, ref, get, auth, set, update ,onValue} from "../firebase";
import TaskCard from "./TaskCard";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { onAuthStateChanged } from "../firebase";
import AddTask from "./AddTask";
import Swal from 'sweetalert2'; // Import SweetAlert

const AllTasksM = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;
  
const [isManager, setIsManager] = useState(false);
const [taskData, setTaskData] = useState(null); // لتخزين بيانات المهمة
  const [error, setError] = useState(null); // لتخزين الأخطاء
  const [loading, setLoading] = useState(true); // للتحقق إذا كانت البيانات لا تزال في مرحلة التحميل
  const [taskId, setTaskId] = useState(); 


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
    }, []);


    



    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                try {
                    const tasksRef = ref(database, "tasks");
                    const snapshot = await get(tasksRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const tasksArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                        setTasks(user.role === "manager" 
                            ? tasksArray.filter(task => !task.isDeleted) 
                            : tasksArray.filter(task => task.userId === user.uid && !task.isDeleted));
                    }
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was an error fetching tasks!',
                    });
                }
            }
        };
        fetchTasks();
    }, [user]);

    const filteredTasks = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = task.endDate ? new Date(task.endDate) : null;
        const isDateInRange = (!startDate || taskStartDate >= startDate) && (!endDate || taskEndDate <= endDate);
        const isStatusMatch = statusFilter === "All" || task.status === statusFilter;
        const isPriorityMatch = priorityFilter === "All" || task.priority === priorityFilter;
        return isDateInRange && isStatusMatch && isPriorityMatch;
    });

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle adding new task
    const handleAddTask = async (newTask) => {
        try {
            const tasksRef = ref(database, "tasks");
            const newTaskRef = tasksRef.push(); // Add task to Firebase
            await newTaskRef.set(newTask);

            // Update state with the new task
            setTasks((prevTasks) => [...prevTasks, { id: newTaskRef.key, ...newTask }]);
            setIsAddTaskOpen(false); // Close Add Task Modal
        } catch (error) {
            console.error("Error adding task:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error adding the task!',
            });
        }
    };

    // Handle updating task
    const handleUpdateTask = async (updatedTask) => {
        try {
            const taskRef = ref(database, "tasks/" + updatedTask.id);
            await update(taskRef, updatedTask);

            // Update state after modification
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error updating the task!',
            });
        }
    };
    const handleStatusChange = (event) => {
        setNewStatus(event.target.value); 
        window.location.reload(); // إعادة تحميل الصفحة تلقائيًا
    };
 
 useEffect(() => {
    if (!user) return;

    const roleRef = ref(database, `users/${user.uid}/role`);
    const unsubscribe = onValue(roleRef, (snapshot) => {
        const role = snapshot.val();
        setIsManager(role === 'manager');
    });

    return () => unsubscribe();
}, [user]);

        


   useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        // مرجع إلى المهام المخزنة داخل المستخدم الحالي
        const userTasksRef = ref(database, `users/${user.uid}/tasks`);
        
        // مراقبة التحديثات في المهام
        const unsubscribe = onValue(userTasksRef, (snapshot) => {
            const tasksData = snapshot.val() || {};
            const taskList = Object.keys(tasksData).map(taskId => ({
                id: taskId,
                ...tasksData[taskId]
            }));
            setTasks(taskList);
            setLoading(false);
        });

        return () => unsubscribe(); // تنظيف الاشتراك عند خروج المستخدم
    }, []);

    return (

        <div className="w-[70%] mx-auto">
            <div className="mt-10">
                <h1 className="text-3xl ubuntu-bold my-8 text-center">Task Board</h1>

                <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <p className="font-bold text-xl text-indigo-500">Filter</p>
                        <div className="flex justify-center gap-2 flex-col sm:flex-row items-center">
                            <input
                                className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto"
                                type="date"
                                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                            />
                            <input
                                className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto"
                                type="date"
                                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                                onChange={(e) => setEndDate(new Date(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <p className="font-bold text-xl text-indigo-400">Sort</p>
                        <div className="flex justify-center gap-2 flex-row items-center">
                            <select
                                className="bg-gray-200 p-2 rounded-xl"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Deployed">Deployed</option>
                                <option value="Deferred">Deferred</option>
                            </select>
                            <select
                                className="bg-gray-200 p-2 rounded-xl"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <option value="All">All Priority</option>
                                <option value="P0">Low</option>
                                <option value="P1">Medium</option>
                                <option value="P2">High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
            {isManager ? (   <div>
                    <AddTask isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAddTask={handleAddTask} onChange={handleStatusChange} />
                </div>):null}
                <div className="text-indigo-500 font-semibold">
                    All Tasks ({filteredTasks.length})
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-5">
                {currentTasks.length > 0 ? (
                    currentTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            {...task}
                            onUpdate={handleUpdateTask} // Pass update handler to TaskCard
                        />
                    ))
                ) : (
                    <div className="text-center mt-[17vh] sm:mt-[30vh]">
                        <p>
                            No tasks found.{" "}
                            <Link to="/addTask" className="text-indigo-500">
                                Add a new task
                            </Link>
                        </p>
                    </div>
                )}
            </div>

            {filteredTasks.length > 0 && totalPages > 1 && (
                <div className="flex justify-center mt-6 items-center gap-4">
                    <button
                        className={`p-3 bg-indigo-500 text-white rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <i className="fa fa-arrow-left text-xl"></i>
                    </button>

                    <span className="text-xl font-semibold text-indigo-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className={`p-3 bg-indigo-500 text-white rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa fa-arrow-right text-xl"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllTasksM;