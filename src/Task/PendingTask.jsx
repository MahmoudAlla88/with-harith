

import { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";
import { getAuth } from "../firebase"; // استيراد Firebase Authentication

const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks.json"; // رابط قاعدة البيانات

const PendingTask = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [loading, setLoading] = useState(true); // حالة التحميل

    useEffect(() => {
        const fetchPendingTasks = async () => {
            try {
                const auth = getAuth(); // الحصول على المستخدم المتصل
                const user = auth.currentUser; // الحصول على معلومات المستخدم المتصل

                if (user) {
                    const response = await axios.get(FIREBASE_URL);
                    if (response.data) {
                        const tasksArray = Object.keys(response.data).map(key => ({
                            id: key,
                            ...response.data[key],
                        }));
                        
                        // تصفية المهام لتشمل فقط المهام التي حالتها 'Pending' والمخصصة للمستخدم المتصل
                        const filteredTasks = tasksArray.filter(task =>
                            task.status === 'Pending' && task.userId === user.uid && !task.isDeleted
                        );
                        setPendingTasks(filteredTasks);
                    }
                } else {
                    console.log("No user is logged in");
                }
            } catch (error) {
                console.error("❌ Error fetching tasks:", error);
            } finally {
                setLoading(false); // إيقاف التحميل بعد الانتهاء
            }
        };

        fetchPendingTasks();
    }, []);

    return (
        <div className="w-[70%] mx-auto">
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-8 text-center">Pending Tasks</h1>
            </div>
            {
                loading ? (
                    <div className="text-center mt-[17vh] sm:mt-[30vh]">Loading...</div> // عرض رسالة تحميل أثناء جلب البيانات
                ) : (
                    pendingTasks.length > 0 ? (
                        <div className="flex flex-wrap gap-y-4 gap-x-14 overflow-y-scroll mt-5 h-[50vh] sm:h-[80vh] justify-center">
                            {pendingTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    startDate={task.startDate}
                                    endDate={task.endDate}
                                    status={task.status}
                                    assignee={task.assignee}
                                    priority={task.priority}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-[17vh] sm:mt-[30vh]">
                            <p>No pending tasks found. <Link to="/addTask" className="text-indigo-500">Add a new task</Link></p>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default PendingTask;
