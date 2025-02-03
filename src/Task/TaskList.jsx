

//














































// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Task from './Task'; // استيراد مكون Task

// const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks.json";

// const TaskList = () => {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchTasks = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(FIREBASE_URL);
//             const data = response.data;

//             if (data) {
//                 const tasksArray = Object.keys(data).map(id => ({
//                     id,
//                     ...data[id],
//                 }));
//                 setTasks(tasksArray);
//             } else {
//                 setTasks([]); // إذا لم توجد بيانات، اجعل المصفوفة فارغة
//             }
//         } catch (error) {
//             console.error("❌ Error fetching tasks:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTasks(); // تحميل المهام عند تحميل الصفحة
//     }, []);

//     return (
//         <div className="task-list-container">
//             <button 
//                 onClick={fetchTasks} 
//                 className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700 transition">
//                 🔄 تحديث المهام
//             </button>

//             {loading ? (
//                 <p>⏳ تحميل المهام...</p>
//             ) : tasks.length > 0 ? (
//                 <ul className="task-list">
//                     {tasks.map(task => (
//                         <Task key={task.id} {...task} />
//                     ))}
//                 </ul>
//             ) : (
//                 <p>📭 لا توجد مهام متاحة.</p>
//             )}
//         </div>
//     );
// };

// export default TaskList;
