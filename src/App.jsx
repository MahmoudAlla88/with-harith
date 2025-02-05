
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
import AllTasksM from "./Task/AllTaskM";

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
          path="/AllTasksM"
          element={
            <div className="flex h-full">
              <Sidebar />
              <AllTasksM />
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