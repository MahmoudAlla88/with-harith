
import React from "react";
import GoUpButton from "./GoUpButton"; // تأكد من استيراد المكون الجديد
import "./Master.css";
import {useNavigate }from "react-router-dom";
 
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing">
        <div className="container">
          {/* <div className="text">
            <h1>Welcome to the Task Management System</h1> */}
             <div className="flex flex-col items-start space-y-6 max-w-2xl text-left">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 ">
        Welcome to the Task Management System
      </h1>
      <p className="text-lg text-gray-600 ">
              Stay organized and boost your productivity! Here, you can easily
              create, manage, and track your tasks, set priorities, and collaborate
              with your team. Whether you're handling personal to-do lists or team
              projects, our platform helps you stay on top of everything.
            </p>
            <button
        onClick={() => navigate("/AllTasks")}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                 hover:bg-blue-700 transform hover:-translate-y-1 
                 transition-all duration-200 shadow-lg 
                 hover:shadow-xl font-medium "
                 style={{alignContent:"center",}}
      >
        Get Started
      </button>
          </div>
          <div className="image">
            <img src="/src/components/img/landing-image.png" alt="Landing" />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat Item 1 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-bold text-blue-600">250+</h3>
              <p className="text-gray-600 mt-2">Tasks Completed</p>
            </div>

            {/* Stat Item 2 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-bold text-blue-600">15K+</h3>
              <p className="text-gray-600 mt-2">New Tasks Added Daily</p>
            </div>

            {/* Stat Item 3 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-bold text-blue-600">80%</h3>
              <p className="text-gray-600 mt-2">Tasks Completed on Time</p>
            </div>

            {/* Stat Item 4 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-bold text-blue-600">300%</h3>
              <p className="text-gray-600 mt-2">Improved Team Efficiency</p>
            </div>
          </div>
        </div>
      </div>

      <GoUpButton /> {/* تضمين الزر هنا */}
    </div>
  );
};

export default Landing;

