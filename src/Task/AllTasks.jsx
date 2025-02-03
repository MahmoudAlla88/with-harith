
// import { Link } from 'react-router-dom';

// import { useState, useEffect } from "react";
// import { database, ref, get, auth   } from "../firebase";
// import TaskCard from "./TaskCard";
// import { IoFilterSharp, IoClose } from "react-icons/io5";
// import { onAuthStateChanged } from "../firebase";
// import AddTask from './AddTask';
// const AllTasks = () => {
//     const [tasks, setTasks] = useState([]);
//     const [user, setUser] = useState(null); // Store the current authenticated user
//     const [startDate, setStartDate] = useState(null);
//     const [toggle, setToggle] = useState(false);
//     const [endDate, setEndDate] = useState(null);
//     const [statusFilter, setStatusFilter] = useState("All");
//     const [priorityFilter, setPriorityFilter] = useState("All");
//     const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);


//     // Get the current authenticated user
//     useEffect(() => {
//         onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser); // Set user if authenticated
//             } else {
//                 setUser(null); // Set user to null if not authenticated
//             }
//         });
//     }, []);

//     // Fetch tasks from Firebase
//     useEffect(() => {
//         const fetchTasks = async () => {
//             if (user) {
//                 try {
//                     const tasksRef = ref(database, "tasks");
//                     const snapshot = await get(tasksRef);
//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         const tasksArray = Object.keys(data).map((key) => ({
//                             id: key,
//                             ...data[key],
//                         }));
//                         // Filter tasks by the current user's ID (userId)
//                         if(user.role==="manager"){
//                             setTasks(tasksArray.filter(task => !task.isDeleted));
//                         }

//                             else{
//                         setTasks(tasksArray.filter((task) => task.userId === user.uid && !task.isDeleted));}
//                     }
//                 } catch (error) {
//                     console.error("Error fetching tasks:", error);
//                 }
//             }
//         };

//         fetchTasks();
//     }, [user]);

//     // Filter tasks based on criteria
//     const filteredTasks = tasks.filter((task) => {
//         const taskStartDate = new Date(task.startDate);
//         const taskEndDate = task.endDate ? new Date(task.endDate) : null;

//         const isDateInRange =
//             (!startDate || taskStartDate >= startDate) &&
//             (!endDate || taskEndDate <= endDate);

//         const isStatusMatch =
//             statusFilter === "All" || task.status === statusFilter;

//         const isPriorityMatch =
//             priorityFilter === "All" || task.priority === priorityFilter;

//         return isDateInRange && isStatusMatch && isPriorityMatch;
//     });

//     return (
//         <div className="w-[70%] mx-auto">
//             <div className="mt-10">
//                 <h1 className="text-3xl ubuntu-bold my-8 text-center">Task Board</h1>
//                 <div className="flex justify-between items-center" >
                  
   

//             {/* عرض الـ Modal عند النقر على الزر */}
//             <div style={{ display:" flex",
//     justifyCotent: "start"}}>
//             <AddTask isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} /></div>
//                     <div className="text-indigo-500 font-semibold">
//                         All Tasks ({filteredTasks.length})
//                     </div> 
//                      {/* <div */}
//                         {/* // onClick={() => { */}
//                         {/* //     setToggle(!toggle);
//                         // }}
                      
//                     //     className="flex justify-center items-center p-2 bg-indigo-500 rounded-xl"
//                     // > */}
//                         {/* {toggle ? (
//                             <IoClose className="text-xl text-white" />
//                         ) : (
//                             <IoFilterSharp className="text-xl text-white" />
//                         )} */}
//                     {/* {/* // </div> */}
//                 </div> 

//                 <div
//                     className={`${
//                         toggle ? "flex" : "flex"
//                     } mt-10 justify-between items-center sm:flex-row gap-4 flex-col-reverse`}
//                 >
//                     <div className="flex flex-col sm:flex-row gap-2">
//                         <div className="flex flex-col sm:flex-row gap-2 items-center">
//                             <p className="font-bold text-xl text-indigo-500">Filter </p>
//                             <div className="flex justify-center gap-[10px] sm:gap-2 flex-col sm:flex-row items-center">
//                                 <input
//                                     className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto appearance-none"
//                                     type="date"
//                                     value={
//                                         startDate
//                                             ? startDate.toISOString().split("T")[0]
//                                             : ""
//                                     }
//                                     onChange={(e) => setStartDate(new Date(e.target.value))}
//                                 />
//                                 <input
//                                     className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto appearance-none"
//                                     type="date"
//                                     value={
//                                         endDate ? endDate.toISOString().split("T")[0] : ""
//                                     }
//                                     onChange={(e) => setEndDate(new Date(e.target.value))}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex gap-2 flex-col sm:flex-row items-center">
//                         <p className="font-bold text-xl text-indigo-400">Sort </p>
//                         <div className="flex justify-center gap-[10px] sm:gap-3 flex-row items-center">
//                             <select
//                                 className="bg-gray-200 p-2 rounded-xl"
//                                 value={statusFilter}
//                                 onChange={(e) => setStatusFilter(e.target.value)}
//                             >
//                                 <option value="All">All Status</option>
//                                 <option value="Pending">Pending</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Completed">Completed</option>
//                                 <option value="Deployed">Deployed</option>
//                                 <option value="Deferred">Deferred</option>
//                             </select>
//                             <select
//                                 className="bg-gray-200 p-2 rounded-xl"
//                                 value={priorityFilter}
//                                 onChange={(e) => setPriorityFilter(e.target.value)}
//                             >
//                                 <option value="All">All Priority</option>
//                                 <option value="P0">low</option>
//                                 <option value="P1">meduim</option>
//                                 <option value="P2">high</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {filteredTasks.length > 0 ? (
//                 <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[80vh] sm:h-[80vh]">
//                     {filteredTasks.map((task) => (
//                         <TaskCard
//                             key={task.id}
//                             id={task.id}
//                             title={task.title}
//                             description={task.description}
//                             startDate={task.startDate}
//                             endDate={task.endDate}
//                             status={task.status}
//                             assignee={task.assignee}
//                             priority={task.priority}
                        
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center mt-[17vh] sm:mt-[30vh]">
//                     <p>
//                         No tasks found.{" "}
//                         <Link to="/addTask" className="text-indigo-500">
//                             Add a new task
//                         </Link>
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllTasks;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, ref, get, auth } from "../firebase";
import TaskCard from "./TaskCard";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { onAuthStateChanged } from "../firebase";
import AddTask from "./AddTask";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3; // عدد المهام لكل صفحة

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
    }, []);

// Get the current authenticated user
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set user if authenticated
            } else {
                setUser(null); // Set user to null if not authenticated
            }
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
    const itemsPerPage = 5;
    // تحديد المهام التي ستُعرض في الصفحة الحالية
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
   // const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTasks = filteredTasks.slice(startIndex, endIndex);
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
    
return (
    <div className="w-[70%] mx-auto">
        {/* العنوان الرئيسي */}
        <div className="mt-10">
            <h1 className="text-3xl ubuntu-bold my-8 text-center">Task Board</h1>

            {/* الفلترة والفرز */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                {/* الفلترة حسب التاريخ */}
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

                {/* الترتيب حسب الحالة والأولوية */}
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

        {/* إضافة مهمة جديدة */}
        <div className="flex justify-between items-center mt-4">
            <div>
                <AddTask isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
            </div>
            <div className="text-indigo-500 font-semibold">
                All Tasks ({filteredTasks.length})
            </div>
        </div>

        {/* عرض المهام المصفاة
        {filteredTasks.length > 0 ? (
            <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[80vh]">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>
        ) : (
            <div className="text-center mt-[17vh] sm:mt-[30vh]">
                <p>
                    No tasks found.{" "}
                    <Link to="/addTask" className="text-indigo-500">
                        Add a new task
                    </Link>
                </p>
            </div>
        )} */}

        {/* أزرار التنقل بين الصفحات
        {filteredTasks.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-4">
                <button
                    className="p-2 mx-2 bg-gray-200 rounded-xl"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="p-2">Page {currentPage} of {totalPages}</span>
                <button
                    className="p-2 mx-2 bg-gray-200 rounded-xl"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        )}
    </div>
);
}; */}
                {/* أزرار التنقل بين الصفحات */}
                {filteredTasks.length > 0 ? (
    <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[80vh]">
        {currentTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
        ))}
    </div>
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

{ /* أزرار التنقل بين الصفحات */ }
{filteredTasks.length > 0 && totalPages > 1 && (
    <div className="flex justify-center mt-4">
        <button
            className="p-2 mx-2 bg-gray-200 rounded-xl"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <span className="p-2">Page {currentPage} of {totalPages}</span>
        <button
            className="p-2 mx-2 bg-gray-200 rounded-xl"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
)}

        </div>
    );
};

export default AllTasks;

