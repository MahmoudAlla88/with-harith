
// import React, { useState, useEffect } from 'react';
// import { ref, get, set, update } from '../firebase'; 
// import axios from 'axios';
// import { database ,onValue, auth} from '../firebase';
// import Swal from 'sweetalert2';
// import './task.css';

// const TaskCard = ({
//     id,
//     title = 'No title provided', 
//     description = 'No description available', 
//     startDate = 'No start date', 
//     endDate = 'No end date', 
//     status = 'No status', 
//     assignee = 'N/A', 
//     priority = 'Normal', 
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [assignedUsers, setAssignedUsers] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);
//     const [userId, setUserId] = useState(null);
//     const [showStatusSelect, setShowStatusSelect] = useState(false);
//     const [newStatus, setNewStatus] = useState(status);
//     const [updatedTitle, setUpdatedTitle] = useState(title);
//     const [updatedDescription, setUpdatedDescription] = useState(description);
//     const [updatedPriority, setUpdatedPriority] = useState(priority);
//     const [showAddUserForm, setShowAddUserForm] = useState(false);
//     const [role, setRole] = useState(null);
//     const [isManager, setIsManager] = useState(false);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//       switch (status) {
//         case 'Completed':
//           return '#0f766e'; 
//         case 'In Progress':
//           return '#f59e0b';  
//         case 'Pending':
//           return '#be185d';  
//         default:
//           return '#d1d5db';  
//       }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const fetchAssignedUsers = async () => {
//         try {
//             const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//             const snapshot = await get(assignedUsersRef);
//             const assignedUsersData = snapshot.val() || {};

//             const usersRef = ref(database, 'users');
//             const usersSnapshot = await get(usersRef);
//             const usersData = usersSnapshot.val() || {};

//             const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         } catch (error) {
//             console.error('Error fetching assigned users:', error);
//         }
//     };

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             setUserId(user.uid);
//         }
//     }, []);

//     useEffect(() => {
//         if (!userId) return;
    
//         const roleRef = ref(database, `users/${userId}/role`);
//         const unsubscribe = onValue(roleRef, (snapshot) => {
//             const role = snapshot.val();
//             setIsManager(role === 'manager');
//         });
    
//         fetchAssignedUsers();
    
//         return () => unsubscribe();
//     }, [id, userId]);
    

//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();

//             let userExists = false;
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     break;
//                 }
//             }

//             if (userExists) {
//                 const userIdToAdd = Object.keys(users).find(userId => users[userId].email === userEmail);
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);

//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, true);

//                 await fetchAssignedUsers();

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success!',
//                     text: 'User added to the task successfully!',
//                 });
//                 setUserEmail('');
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: 'User not found! Please make sure the user is registered.',
//                 });
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };

//     const handleUpdateTask = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, {
//                 title: updatedTitle,
//                 description: updatedDescription,
//                 priority: updatedPriority,
//                 status: newStatus 
//             });
//             setShowUpdateForm(false);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Task updated successfully!',
//             });
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     const handleSoftDelete = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, { isDeleted: true });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Task marked as deleted!',
//             });
//         } catch (error) {
//             console.error('Error marking task as deleted:', error);
//         }
//     };

//     const handleStatusChange = async (e) => {
//         const selectedStatus = e.target.value;
//         window.location.reload(); 
//         setNewStatus(selectedStatus); 
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, { status: selectedStatus });
//             setShowStatusSelect(false); 
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };





//     useEffect(() => {
//         const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//         const unsubscribe = onValue(assignedUsersRef, (snapshot) => {
//             const assignedUsersData = snapshot.val() || {};
//             const usersList = Object.keys(assignedUsersData).map(userId => assignedUsersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         });
    
//         return () => unsubscribe();
//     }, [id]);

   
    

    
//     return (
//         <div className="card1">
//             <div className="card-header1">
//                 <div>
//                     <h1 className="priority1">{priority}</h1>
//                 </div>
//                 <div className="status-btn"></div>
//                 <h2 className="text-sm font-semibold">{title}</h2>
//             </div>

//             <div className="card-description1">
//                 <p className="text-xs">{description}</p>
//                 <div className="dates1">
//                     <div className="date-item1">
//                         <div className="flex justify-between text-xs mt-2">
//                             <span>Start: {getDate(startDate)}</span>
//                             <span style={{width:"50px"}}></span>
//                             <span>End: {getDate(endDate)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="card-status-btn1">
//                 <button
//                     style={{ background: getStatusColor(status) }}
//                     onClick={() => setShowStatusSelect(!showStatusSelect)}
//                     className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
//                 >
//                     {newStatus}
//                 </button>
//             </div>

//             {showStatusSelect && (
//                 <div className="px-6 pt-3">
//                     <select
//                         className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                         id="status"
//                         name="status"
//                         value={newStatus}
//                         onChange={handleStatusChange}
//                     >
//                         <option value="Pending">Pending</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                         <option value="Deployed">Deployed</option>
//                         <option value="Deferred">Deferred</option>
//                     </select>
//                 </div>
//             )}

//             <div className="card-users1">
//                 <div className="user-info1">
//                     <p className="text12">{assignee}</p>
//                     <div className="count1">
//                         <span className="circle1"></span>
//                         <p className="text12">{assignedUsersCount} Users</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setShowUserList(!showUserList)}
//                     className="user-btn1"
//                 >
//                     {showUserList ? 'Hide Users' : 'Show Users'}
//                 </button>
//             </div>

//             {showUserList && (
//                 <div className="card-user-list1">
//                     <h3 className="font-semibold text-gray-800 mb-3">Assigned Users</h3>
//                     <ul className="space-y-2">
//                         {assignedUsers.map((email, index) => (
//                             <li key={index} className="user-list-item1">
//                                 {email}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {isManager && (
//                 <div className="card-buttons1">
//                     <button
//                         onClick={() => setShowAddUserForm(true)}
//                         className="add-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Add User
//                     </button>
//                     <button
//                         onClick={() => setShowUpdateForm(true)}
//                         className="update-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Update
//                     </button>
//                     <button
//                         onClick={handleSoftDelete}
//                         onChange={handleStatusChange}
//                         className="delete-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             )}

//             {showUpdateForm && (
//                 <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Update Task</h3>
//                     <div className="space-y-4">
//                         <input
//                             type="text"
//                             value={updatedTitle}
//                             onChange={(e) => setUpdatedTitle(e.target.value)}
//                             placeholder="Updated title"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                         />
//                         <textarea
//                             value={updatedDescription}
//                             onChange={(e) => setUpdatedDescription(e.target.value)}
//                             placeholder="Updated description"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-24"
//                         />
//                         <select
//                             value={updatedPriority}
//                             onChange={(e) => setUpdatedPriority(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
//                         >
//                             <option value="P2">High</option>
//                             <option value="P1">Medium</option>
//                             <option value="P0">Low</option>
//                         </select>
//                         <div className="flex justify-between mt-4">
//                             <button
//                             onChange={handleStatusChange}
//                                 onClick={handleUpdateTask}
//                                 className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={() => setShowUpdateForm(false)}
//                                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition duration-300"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showAddUserForm && (
//                 <div className="card-form1">
//                     <div className="space-y-4">
//                         <input
//                             type="email"
//                             value={userEmail}
//                             onChange={(e) => setUserEmail(e.target.value)}
//                             placeholder="Enter user email"
//                         />
//                         <div className="flex justify-between">
//                             <button
//                             onChange={handleStatusChange}
//                                 onClick={handleAddUser}
//                                 className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-medium"
//                             >
//                                 Add User
//                             </button>
//                             <button
//                                 onClick={() => setShowAddUserForm(false)}
//                                 className="cancel-btn1"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TaskCard;


///////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { ref, get, set, update } from '../firebase'; 
// import axios from 'axios';
// import { database ,onValue, auth} from '../firebase';
// import Swal from 'sweetalert2';
// import './task.css';

// const TaskCard = ({
//     id,
//     title = 'No title provided', 
//     description = 'No description available', 
//     startDate = 'No start date', 
//     endDate = 'No end date', 
//     status = 'No status', 
//     assignee = 'N/A', 
//     priority = 'Normal', 
// }) => {
//     const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
//     const [assignedUsersCount, setAssignedUsersCount] = useState(0);
//     const [assignedUsers, setAssignedUsers] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [userEmail, setUserEmail] = useState('');
//     const [showUserList, setShowUserList] = useState(false);
//     const [userId, setUserId] = useState(null);
//     const [showStatusSelect, setShowStatusSelect] = useState(false);
//     const [newStatus, setNewStatus] = useState(status);
//     const [updatedTitle, setUpdatedTitle] = useState(title);
//     const [updatedDescription, setUpdatedDescription] = useState(description);
//     const [updatedPriority, setUpdatedPriority] = useState(priority);
//     const [showAddUserForm, setShowAddUserForm] = useState(false);
//     const [role, setRole] = useState(null);
//     const [isManager, setIsManager] = useState(false);

//     const getDate = (dateString) => {
//         const dateObject = new Date(dateString);
//         return dateObject.toLocaleDateString();
//     };

//     const startDatee = getDate(startDate);
//     const endDatee = getDate(endDate);

//     const getStatusColor = (status) => {
//       switch (status) {
//         case 'Completed':
//           return '#0f766e'; 
//         case 'In Progress':
//           return '#f59e0b';  
//         case 'Pending':
//           return '#be185d';  
//         default:
//           return '#d1d5db';  
//       }
//     };

//     const handleToggleCompleted = async () => {
//         const newStatus = complete ? "Pending" : "Completed";
//         try {
//             await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
//             setComplete(!complete);
//         } catch (error) {
//             console.error("❌ Error updating task:", error);
//         }
//     };

//     const fetchAssignedUsers = async () => {
//         try {
//             const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//             const snapshot = await get(assignedUsersRef);
//             const assignedUsersData = snapshot.val() || {};

//             const usersRef = ref(database, 'users');
//             const usersSnapshot = await get(usersRef);
//             const usersData = usersSnapshot.val() || {};

//             const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         } catch (error) {
//             console.error('Error fetching assigned users:', error);
//         }
//     };

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             setUserId(user.uid);
//         }
//     }, []);

//     useEffect(() => {
//         if (!userId) return;
    
//         const roleRef = ref(database, `users/${userId}/role`);
//         const unsubscribe = onValue(roleRef, (snapshot) => {
//             const role = snapshot.val();
//             setIsManager(role === 'manager');
//         });
    
//         fetchAssignedUsers();
    
//         return () => unsubscribe();
//     }, [id, userId]);
    
//     const handleAddUser = async () => {
//         try {
//             const usersRef = ref(database, 'users');
//             const snapshot = await get(usersRef);
//             const users = snapshot.val();
    
//             let userExists = false;
//             let userIdToAdd = null;
    
//             for (const userId in users) {
//                 if (users[userId].email === userEmail) {
//                     userExists = true;
//                     userIdToAdd = userId;
//                     break;
//                 }
//             }
    
//             if (userExists && userIdToAdd) {
//                 // إضافة المستخدم إلى المهمة
//                 const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
//                 await set(taskRef, true);
    
//                 // تسجيل المهمة ضمن قائمة المهام الخاصة بالمستخدم
//                 const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
//                 await set(userTasksRef, {
//                     title: updatedTitle || title, // استخدام القيمة المحدثة إذا كانت موجودة
//                     description: updatedDescription || description,
//                     startDate: startDate,
//                     endDate: endDate,
//                     status: newStatus || status,
//                     priority: updatedPriority || priority
//                 });
    
//                 const updatedUserTasks = await get(userTasksRef);
//                 if (!updatedUserTasks.exists()) {
//                     console.error('❌ فشل في جلب المهام الجديدة للمستخدم.');
//                 } else {
//                     console.log('✅ تمت إضافة المهمة إلى المستخدم بنجاح:', updatedUserTasks.val());
//                 }
    
//                 await fetchAssignedUsers();
    
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success!',
//                     text: 'User added to the task successfully!',
//                 });
//                 setUserEmail('');
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: 'User not found! Please make sure the user is registered.',
//                 });
//             }
//         } catch (error) {
//             console.error('Error adding user to task:', error);
//         }
//     };
//     const [tasks, setTasks] = useState([]);
// const user = auth.currentUser;
// useEffect(() => {
//     if (!user) return;

//     const userTasksRef = ref(database, `users/${user.uid}/tasks`);
//     onValue(userTasksRef, (snapshot) => {
//         const tasksData = snapshot.val() || {};
//         const taskList = Object.keys(tasksData).map(taskId => ({
//             id: taskId,
//             ...tasksData[taskId]
//         }));
//         setTasks(taskList);
//     });
// }, [user]);
//     const handleUpdateTask = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, {
//                 title: updatedTitle,
//                 description: updatedDescription,
//                 priority: updatedPriority,
//                 status: newStatus 
//             });
//             setShowUpdateForm(false);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Task updated successfully!',
//             });
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     const handleSoftDelete = async () => {
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, { isDeleted: true });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Task marked as deleted!',
//             });
//         } catch (error) {
//             console.error('Error marking task as deleted:', error);
//         }
//     };

//     const handleStatusChange = async (e) => {
//         const selectedStatus = e.target.value;
//         window.location.reload(); 
//         setNewStatus(selectedStatus); 
//         try {
//             const taskRef = ref(database, `tasks/${id}`);
//             await update(taskRef, { status: selectedStatus });
//             setShowStatusSelect(false); 
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };





//     useEffect(() => {
//         const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
//         const unsubscribe = onValue(assignedUsersRef, (snapshot) => {
//             const assignedUsersData = snapshot.val() || {};
//             const usersList = Object.keys(assignedUsersData).map(userId => assignedUsersData[userId].email);
//             setAssignedUsers(usersList);
//             setAssignedUsersCount(usersList.length);
//         });
    
//         return () => unsubscribe();
//     }, [id]);

   
    

    
//     return (
//         <div className="card1">
//             <div className="card-header1">
//                 <div>
//                     <h1 className="priority1">{priority}</h1>
//                 </div>
//                 <div className="status-btn"></div>
//                 <h2 className="text-sm font-semibold">{title}</h2>
//             </div>

//             <div className="card-description1">
//                 <p className="text-xs">{description}</p>
//                 <div className="dates1">
//                     <div className="date-item1">
//                         <div className="flex justify-between text-xs mt-2">
//                             <span>Start: {getDate(startDate)}</span>
//                             <span style={{width:"50px"}}></span>
//                             <span>End: {getDate(endDate)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="card-status-btn1">
//                 <button
//                     style={{ background: getStatusColor(status) }}
//                     onClick={() => setShowStatusSelect(!showStatusSelect)}
//                     className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
//                 >
//                     {newStatus}
//                 </button>
//             </div>

//             {showStatusSelect && (
//                 <div className="px-6 pt-3">
//                     <select
//                         className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                         id="status"
//                         name="status"
//                         value={newStatus}
//                         onChange={handleStatusChange}
//                     >
//                         <option value="Pending">Pending</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                         <option value="Deployed">Deployed</option>
//                         <option value="Deferred">Deferred</option>
//                     </select>
//                 </div>
//             )}

//             <div className="card-users1">
//                 <div className="user-info1">
//                     <p className="text12">{assignee}</p>
//                     <div className="count1">
//                         <span className="circle1"></span>
//                         <p className="text12">{assignedUsersCount} Users</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setShowUserList(!showUserList)}
//                     className="user-btn1"
//                 >
//                     {showUserList ? 'Hide Users' : 'Show Users'}
//                 </button>
//             </div>

//             {showUserList && (
//                 <div className="card-user-list1">
//                     <h3 className="font-semibold text-gray-800 mb-3">Assigned Users</h3>
//                     <ul className="space-y-2">
//                         {assignedUsers.map((email, index) => (
//                             <li key={index} className="user-list-item1">
//                                 {email}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {isManager && (
//                 <div className="card-buttons1">
//                     <button
//                         onClick={() => setShowAddUserForm(true)}
//                         className="add-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Add User
//                     </button>
//                     <button
//                         onClick={() => setShowUpdateForm(true)}
//                         className="update-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Update
//                     </button>
//                     <button
//                         onClick={handleSoftDelete}
//                         onChange={handleStatusChange}
//                         className="delete-btn1"
//                         style={{ background: getStatusColor(status) }}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             )}

//             {showUpdateForm && (
//                 <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Update Task</h3>
//                     <div className="space-y-4">
//                         <input
//                             type="text"
//                             value={updatedTitle}
//                             onChange={(e) => setUpdatedTitle(e.target.value)}
//                             placeholder="Updated title"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                         />
//                         <textarea
//                             value={updatedDescription}
//                             onChange={(e) => setUpdatedDescription(e.target.value)}
//                             placeholder="Updated description"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-24"
//                         />
//                         <select
//                             value={updatedPriority}
//                             onChange={(e) => setUpdatedPriority(e.target.value)}
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
//                         >
//                             <option value="P2">High</option>
//                             <option value="P1">Medium</option>
//                             <option value="P0">Low</option>
//                         </select>
//                         <div className="flex justify-between mt-4">
//                             <button
//                             onChange={handleStatusChange}
//                                 onClick={handleUpdateTask}
//                                 className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={() => setShowUpdateForm(false)}
//                                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition duration-300"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showAddUserForm && (
//                 <div className="card-form1">
//                     <div className="space-y-4">
//                         <input
//                             type="email"
//                             value={userEmail}
//                             onChange={(e) => setUserEmail(e.target.value)}
//                             placeholder="Enter user email"
//                         />
//                         <div className="flex justify-between">
//                             <button
//                             onChange={handleStatusChange}
//                                 onClick={handleAddUser}
//                                 className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-medium"
//                             >
//                                 Add User
//                             </button>
//                             <button
//                                 onClick={() => setShowAddUserForm(false)}
//                                 className="cancel-btn1"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TaskCard;



import React, { useState, useEffect } from 'react';
import { ref, get, set, update } from '../firebase';
import axios from 'axios';
import { database, onValue, auth } from '../firebase';
import Swal from 'sweetalert2';
import './task.css';

const TaskCard = ({
    id,
    title = 'No title provided',
    description = 'No description available',
    startDate = 'No start date',
    endDate = 'No end date',
    status = 'No status',
    assignee = 'N/A',
    priority = 'Normal',
}) => {
    const [complete, setComplete] = useState(status && status.toLowerCase() === "completed");
    const [assignedUsersCount, setAssignedUsersCount] = useState(0);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showUserList, setShowUserList] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showStatusSelect, setShowStatusSelect] = useState(false);
    const [newStatus, setNewStatus] = useState(status);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedPriority, setUpdatedPriority] = useState(priority);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [role, setRole] = useState(null);
    const [isManager, setIsManager] = useState(false);

    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    };

    const startDatee = getDate(startDate);
    const endDatee = getDate(endDate);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return '#0f766e';
            case 'In Progress':
                return '#f59e0b';
            case 'Pending':
                return '#be185d';
            default:
                return '#d1d5db';
        }
    };

    const handleToggleCompleted = async () => {
        const newStatus = complete ? "Pending" : "Completed";
        try {
            await axios.patch(`${FIREBASE_URL}/${id}.json`, { status: newStatus });
            setComplete(!complete);
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    const fetchAssignedUsers = async () => {
        try {
            const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
            const snapshot = await get(assignedUsersRef);
            const assignedUsersData = snapshot.val() || {};

            const usersRef = ref(database, 'users');
            const usersSnapshot = await get(usersRef);
            const usersData = usersSnapshot.val() || {};

            const usersList = Object.keys(assignedUsersData).map(userId => usersData[userId].email);
            setAssignedUsers(usersList);
            setAssignedUsersCount(usersList.length);
        } catch (error) {
            console.error('Error fetching assigned users:', error);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const roleRef = ref(database, `users/${userId}/role`);
        const unsubscribe = onValue(roleRef, (snapshot) => {
            const role = snapshot.val();
            setIsManager(role === 'manager');
        });

        fetchAssignedUsers();

        return () => unsubscribe();
    }, [id, userId]);

    const handleAddUser = async () => {
        try {
            const usersRef = ref(database, 'users');
            const snapshot = await get(usersRef);
            const users = snapshot.val();

            let userExists = false;
            let userIdToAdd = null;

            for (const userId in users) {
                if (users[userId].email === userEmail) {
                    userExists = true;
                    userIdToAdd = userId;
                    break;
                }
            }

            if (userExists && userIdToAdd) {
                // إضافة المستخدم إلى المهمة
                const taskRef = ref(database, `tasks/${id}/assignedUsers/${userIdToAdd}`);
                await set(taskRef, true);

                // تسجيل المهمة ضمن قائمة المهام الخاصة بالمستخدم
                const userTasksRef = ref(database, `users/${userIdToAdd}/tasks/${id}`);
                await set(userTasksRef, {
                    title: updatedTitle || title,
                    description: updatedDescription || description,
                    startDate: startDate,
                    endDate: endDate,
                    status: newStatus || status,
                    priority: updatedPriority || priority
                });

                const updatedUserTasks = await get(userTasksRef);
                if (!updatedUserTasks.exists()) {
                    console.error('❌ فشل في جلب المهام الجديدة للمستخدم.');
                } else {
                    console.log('✅ تمت إضافة المهمة إلى المستخدم بنجاح:', updatedUserTasks.val());
                }

                await fetchAssignedUsers();

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User added to the task successfully!',
                });
                setUserEmail('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User not found! Please make sure the user is registered.',
                });
            }
        } catch (error) {
            console.error('Error adding user to task:', error);
        }
    };

    const [tasks, setTasks] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const userTasksRef = ref(database, `users/${user.uid}/tasks`);
        onValue(userTasksRef, (snapshot) => {
            const tasksData = snapshot.val() || {};
            const taskList = Object.keys(tasksData).map(taskId => ({
                id: taskId,
                ...tasksData[taskId]
            }));
            setTasks(taskList);
        });
    }, [user]);

    const handleUpdateTask = async () => {
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, {
                title: updatedTitle,
                description: updatedDescription,
                priority: updatedPriority,
                status: newStatus
            });
            setShowUpdateForm(false);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Task updated successfully!',
            });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleSoftDelete = async () => {
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, { isDeleted: true });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Task marked as deleted!',
            });
        } catch (error) {
            console.error('Error marking task as deleted:', error);
        }
    };

    const handleStatusChange = async (e) => {
        const selectedStatus = e.target.value;
        window.location.reload();
        setNewStatus(selectedStatus);
        try {
            const taskRef = ref(database, `tasks/${id}`);
            await update(taskRef, { status: selectedStatus });
            setShowStatusSelect(false);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        const assignedUsersRef = ref(database, `tasks/${id}/assignedUsers`);
        const unsubscribe = onValue(assignedUsersRef, (snapshot) => {
            const assignedUsersData = snapshot.val() || {};
            const usersList = Object.keys(assignedUsersData).map(userId => assignedUsersData[userId].email);
            setAssignedUsers(usersList);
            setAssignedUsersCount(usersList.length);
        });

        return () => unsubscribe();
    }, [id]);

    return (
        <div className="card1">
            <div className="card-header1">
                <div>
                    <h1 className="priority1">{priority}</h1>
                </div>
                <div className="status-btn"></div>
                <h2 className="text-sm font-semibold">{title}</h2>
            </div>

            <div className="card-description1">
                <p className="text-xs">{description}</p>
                <div className="dates1">
                    <div className="date-item1">
                        <div className="flex justify-between text-xs mt-2">
                            <span>Start: {getDate(startDate)}</span>
                            <span style={{ width: "50px" }}></span>
                            <span>End: {getDate(endDate)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-status-btn1">
                <button
                    style={{ background: getStatusColor(status) }}
                    onClick={() => setShowStatusSelect(!showStatusSelect)}
                    className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
                >
                    {newStatus}
                </button>
            </div>

            {showStatusSelect && (
                <div className="px-6 pt-3">
                    <select
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        id="status"
                        name="status"
                        value={newStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Deployed">Deployed</option>
                        <option value="Deferred">Deferred</option>
                    </select>
                </div>
            )}

            <div className="card-users1">
                <div className="user-info1">
                    <p className="text12">{assignee}</p>
                    <div className="count1">
                        <span className="circle1"></span>
                        <p className="text12">{assignedUsersCount} Users</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowUserList(!showUserList)}
                    className="user-btn1"
                >
                    {showUserList ? 'Hide Users' : 'Show Users'}
                </button>
            </div>

            {showUserList && (
                <div className="card-user-list1">
                    <h3 className="font-semibold text-gray-800 mb-3">Assigned Users</h3>
                    <ul className="space-y-2">
                        {assignedUsers.map((email, index) => (
                            <li key={index} className="user-list-item1">
                                {email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isManager && (
                <div className="card-buttons1">
                    <button
                        onClick={() => setShowAddUserForm(true)}
                        className="add-btn1"
                        style={{ background: getStatusColor(status) }}
                    >
                        Add User
                    </button>
                    <button
                        onClick={() => setShowUpdateForm(true)}
                        className="update-btn1"
                        style={{ background: getStatusColor(status) }}
                    >
                        Update
                    </button>
                    <button
                        onClick={handleSoftDelete}
                        onChange={handleStatusChange}
                        className="delete-btn1"
                        style={{ background: getStatusColor(status) }}
                    >
                        Delete
                    </button>
                </div>
            )}

            {showUpdateForm && (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Update Task</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            placeholder="Updated title"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            placeholder="Updated description"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-24"
                        />
                        <select
                            value={updatedPriority}
                            onChange={(e) => setUpdatedPriority(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                        >
                            <option value="P2">High</option>
                            <option value="P1">Medium</option>
                            <option value="P0">Low</option>
                        </select>
                        <div className="flex justify-between mt-4">
                            <button
                                onChange={handleStatusChange}
                                onClick={handleUpdateTask}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowUpdateForm(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddUserForm && (
                <div className="card-form1">
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Enter user email"
                        />
                        <div className="flex justify-between">
                            <button
                                onChange={handleStatusChange}
                                onClick={handleAddUser}
                                className="bg-blue-500 text-white py-2.5 px-4 rounded-xl font-medium"
                            >
                                Add User
                            </button>
                            <button
                                onClick={() => setShowAddUserForm(false)}
                                className="cancel-btn1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;