
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";
import { database, ref, get } from "../firebase";
import { getAuth } from "../firebase"; // استيراد Firebase Authentication

const InProgressTask = () => {
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [loading, setLoading] = useState(true); // حالة التحميل

    useEffect(() => {
        const fetchInProgressTasks = async () => {
            try {
                const auth = getAuth(); // الحصول على المستخدم المتصل
                const user = auth.currentUser; // الحصول على معلومات المستخدم المتصل

                if (user) {
                    const tasksRef = ref(database, "tasks");
                    const snapshot = await get(tasksRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const tasksArray = Object.keys(data).map(key => ({
                            id: key,
                            ...data[key],
                        }));
                        
                        // تصفية المهام لتشمل فقط المهام الخاصة بالمستخدم والمتاحة
                        const filteredTasks = tasksArray.filter(task => task.status === 'In Progress' && task.userId === user.uid && !task.isDeleted
                        );
                        setInProgressTasks(filteredTasks);
                    }
                } else {
                    console.log("No user is logged in");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false); // إيقاف التحميل بعد الانتهاء
            }
        };

        fetchInProgressTasks();
    }, []);

    return (
        <div className="w-[70%] mx-auto">
            <div className="mt-10">
                <h1 className="text-3xl font-bold my-8 text-center">In Progress Tasks</h1>
            </div>
            {
                loading ? (
                    <div className="text-center mt-[17vh] sm:mt-[30vh]">Loading...</div> // عرض رسالة تحميل أثناء جلب البيانات
                ) : (
                    inProgressTasks.length > 0 ? (
                        <div className="flex flex-wrap gap-y-4 gap-x-14 overflow-y-scroll mt-5 h-[50vh] sm:h-[80vh] justify-center">
                            {inProgressTasks.map(task => (
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
                            <p>No in-progress tasks found. <Link to="/addTask" className="text-indigo-500">Add a new task</Link></p>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default InProgressTask;
