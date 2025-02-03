
// // import  { useState } from "react";
// // import "./App.css";
// // import SignInForm from "./components/Login";
// // import SignUpForm from "./components/Register";

// // export default function App() {
// //   const [type, setType] = useState("signIn");
// //   const handleOnClick = text => {
// //     if (text !== type) {
// //       setType(text);
// //       return;
// //     }
// //   };
// //   const containerClass =
// //     "container " + (type === "signUp" ? "right-panel-active" : "");
// //   return (
// //     <div className="App">
// //       <h2>Sign in/up Form</h2>
// //       <div className={containerClass} id="container">
// //         <SignUpForm />
// //         <SignInForm />
// //         <div className="overlay-container">
// //           <div className="overlay">
// //             <div className="overlay-panel overlay-left">
// //               <h1>Welcome Back!</h1>
// //               <p>
// //                 To keep connected with us please login with your personal info
// //               </p>
// //               <button
// //                 className="ghost"
// //                 id="signIn"
// //                 onClick={() => handleOnClick("signIn")}
// //               >
// //                 Sign In
// //               </button>
// //             </div>
// //             <div className="overlay-panel overlay-right">
// //               <h1>Hello, Friend!</h1>
// //               <p>Enter your personal details and start journey with us</p>
// //               <button
// //                 className="ghost "
// //                 id="signUp"
// //                 onClick={() => handleOnClick("signUp")}
// //               >
// //                 Sign Up
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './index.css';
// import AddTask from './Task/AddTask';
// import Sidebar from './Task/Sidebar';
// import AllTasks from './Task/AllTasks';
// import CompleteTask from './Task/CompleteTask';
// import InProgressTask from './Task/InProgressTask';
// import Dashboard from './Task/Dashboard';
// import PendingTask from './Task/PendingTask';
// import Deployed from './Task/Deployed';
// import Deferred from './Task/Deferred';
// import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import  Home  from './components/home/home';
// import AboutUs from './about/AboutUs';
// import ContactUs from './about/ContactUs';
// import UserProfilePage from './UserProfilePage';
// import Articles from './about/Articles';
// import ArticleDetail from './about/ArticleDetail';
// const App = () => {
//   return (
//     <Router> {/* هنا تم إضافة BrowserRouter */}
//       <div className='flex h-full'>
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<AllTasks />} />
//           <Route path="/addTask" element={<AddTask />} />
//           <Route path="/allTask" element={<AllTasks />} />
//           <Route path="/completeTask" element={<CompleteTask />} />
//           <Route path="/pendingTask" element={<PendingTask />} />
//           <Route path="/deployedTask" element={<Deployed />} />
//           <Route path="/deferredTask" element={<Deferred />} />
//           <Route path="/inProgressTask" element={<InProgressTask />} />
//           <Route path="/statsTask" element={<Dashboard />} />
    
//         </Routes>
//       </div>
//     </Router> 

//   //   <Router>
//   //   <Routes>
//   //     {/* تحديد المسارات الخاصة بالصفحات */}
//   //     <Route path="/login" element={<Login />} />
//   //     <Route path="/ContactUs" element={<ContactUs />} />
//   //     <Route path="/AboutUs" element={<AboutUs />} />
//   //     <Route path="/UserProfilePage" element={<UserProfilePage />} />
     
//   //   </Routes>
//   // </Router>
// //  <Router>
// // <Routes>
  
// //   <Route path="/ArticleDetail" element={<ArticleDetail/>} />
// //   <Route path="/Articles" element={<Articles />} />
// //   <Route path="/ContactUs" element={<ContactUs />} />
// //   <Route path="/AboutUs" element={<AboutUs />} />    
// //    <Route path="/UserProfilePage" element={<UserProfilePage />} />
// //   <Route path="/login" element={<Login />} />
// //   <Route path="/register" element={<Register />} />
// //   <Route path="/home" element={<Home />} />

// // </Routes>
// //  </Router> 

     

   




//   );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AddTask from "./Task/AddTask";
import Sidebar from "./Task/Sidebar";
import AllTasks from "./Task/AllTasks";
import CompleteTask from "./Task/CompleteTask";
import InProgressTask from "./Task/InProgressTask";
import Dashboard from "./Task/Dashboard";
import PendingTask from "./Task/PendingTask";
import Deployed from "./Task/Deployed";
import Deferred from "./Task/Deferred";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home/home";
import AboutUs from "./about/AboutUs";
import ContactUs from "./about/ContactUs";
import UserProfilePage from "./UserProfilePage";
import Articles from "./about/Articles";
import ArticleDetail from "./about/ArticleDetail";
import AddArticle from "./about/AddArticle";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* General Routes - No Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/UserProfilePage" element={<UserProfilePage />} />
        <Route path="/add-article" element={<AddArticle />} />
        {/* Routes with Sidebar */}
        <Route
          path="/AllTasks"
          element={
            <div className="flex h-full">
              <Sidebar />
              <AllTasks />
            </div>
          }
        />
        <Route
          path="/addTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <AddTask />
            </div>
          }
        />
        <Route
          path="/completeTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <CompleteTask />
            </div>
          }
        />
        <Route
          path="/inProgressTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <InProgressTask />
            </div>
          }
        />
        <Route
          path="/statsTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <div className="flex h-full">
              <Sidebar />
              <AllTasks />
            </div>
          }
        />
        <Route
          path="/pendingTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <PendingTask />
            </div>
          }
        />
        <Route
          path="/deployedTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <Deployed />
            </div>
          }
        />
        <Route
          path="/deferredTask"
          element={
            <div className="flex h-full">
              <Sidebar />
              <Deferred />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;