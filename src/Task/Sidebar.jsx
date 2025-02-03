// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { MdDashboard, MdOutlineTaskAlt, MdAddTask, MdPendingActions, MdCloudDone, MdOutlineAccessTimeFilled, MdQueryStats } from "react-icons/md";
// import { GrTask, GrInProgress } from "react-icons/gr";

// const Sidebar = () => {
//     const [taskStats, setTaskStats] = useState({
//         pending: 0,
//         inProgress: 0,
//         completed: 0,
//         deployed: 0,
//         deferred: 0,
//     });

//     useEffect(() => {
//         const fetchTaskStats = async () => {
//             try {
//                 const response = await axios.get("https://reactprojectteam-default-rtdb.firebaseio.com/tasks.json");
                
//                 if (response.data) {
//                     const data = response.data;
//                     const tasksArray = Object.keys(data).map(key => ({
//                         id: key,
//                         ...data[key],
//                     }));

//                     const stats = {
//                         pending: tasksArray.filter(task => task.status === 'Pending').length,
//                         inProgress: tasksArray.filter(task => task.status === 'In Progress').length,
//                         completed: tasksArray.filter(task => task.status === 'Completed').length,
//                         deployed: tasksArray.filter(task => task.status === 'Deployed').length,
//                         deferred: tasksArray.filter(task => task.status === 'Deferred').length,
//                     };

//                     setTaskStats(stats);
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching task stats:", error);
//             }
//         };

//         fetchTaskStats();
//     }, []);

//     return (
//         <div className="bg-indigo-600 min-h-[100vh] sm:min-h-screen w-[5rem] sm:w-[19rem] flex flex-col gap-4 shadow-lg">
//             {/* Header */}
//             <div className="flex items-center gap-2 justify-center h-20 text-white text-2xl font-bold mt-6">
//                 <GrTask className="text-3xl" />
//                 <span className='sm:block hidden font-semibold'>
//                      Manage Mate
//                 </span>
//             </div>

//             {/* Navigation Links */}
//             <nav className="flex flex-col gap-2 px-4">
//                 <Link to='/AllTasks' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdDashboard className="text-2xl" />
//                     <span className='sm:block hidden'> Dashboard </span>
//                 </Link>
//                 <Link to='/addTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdAddTask className="text-2xl" />
//                     <span className='sm:block hidden'> Add New Tasks </span>
//                 </Link>
//                 <Link to='/statsTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdQueryStats className="text-2xl" />
//                     <span className='sm:block hidden'> Task Stats </span>
//                 </Link>
//                 <Link to='/completeTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdOutlineTaskAlt className="text-2xl" />
//                     <span className='sm:block hidden'> Completed Tasks </span>
//                 </Link>
//                 <Link to='/pendingTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdPendingActions className="text-2xl" />
//                     <span className='sm:block hidden'> Pending Tasks </span>
//                 </Link>
//                 <Link to='/inProgressTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <GrInProgress className="text-2xl" />
//                     <span className='sm:block hidden'> In Progress Tasks </span>
//                 </Link>
//                 <Link to='/deployedTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdCloudDone className="text-2xl" />
//                     <span className='sm:block hidden'> Deployed Tasks </span>
//                 </Link>
//                 <Link to='/deferredTask' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdOutlineAccessTimeFilled className="text-2xl" />
//                     <span className='sm:block hidden'> Deferred Tasks </span>
//                 </Link>
//                 <Link to='/' className="px-4 py-3 font-semibold text-lg text-white hover:bg-indigo-700 rounded-lg transition duration-300 flex items-center gap-3">
//                     <MdDashboard className="text-2xl" />
//                     <span className='sm:block hidden'> Go Back</span>
//                 </Link>
              
//             </nav>
         
//         </div>
//     );
// };

// export default Sidebar;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import Swal from 'sweetalert2';

const Sidebar = () => {
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    deployed: 0,
    deferred: 0,
  });

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
          title: 'Error!',
          text: 'Failed to fetch task stats.',
          icon: 'error',
          confirmButtonText: 'OK'
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
        <span className="text-white text-xl font-semibold hidden sm:block">ManageMate</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link
          to="/AllTasks"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdDashboard className="text-2xl" />
          <span className="hidden sm:inline-block">Dashboard</span>
        </Link>

        {/* <Link
          to="/addTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdAddTask className="text-2xl" />
          <span className="hidden sm:inline-block">Add New Tasks</span>
        </Link> */}

        <Link
          to="/statsTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdQueryStats className="text-2xl" />
          <span className="hidden sm:inline-block">Task Stats</span>
        </Link>

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

        {/* <Link
          to="/deployedTask"
          className="text-white hover:text-indigo-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
        >
          <MdCloudDone className="text-2xl" />
          <span className="hidden sm:inline-block">Deployed Tasks</span>
        </Link> */}

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
          <MdDashboard className="text-2xl" />
          <span className="hidden sm:inline-block">Go Back</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;