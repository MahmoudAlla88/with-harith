import React from "react";
import  { useState, useEffect } from "react";
import GoUpButton from "./GoUpButton"; // تأكد من استيراد المكون الجديد
import "./Master.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Swal from "sweetalert2"; // استيراد SweetAlert2


const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // تحقق من حالة المستخدم عند تحميل المكون
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // قم بتحديث الحالة حسب حالة المستخدم
    });

    return () => unsubscribe(); // نظف الاشتراك عند إلغاء تحميل المكون
  }, []);
  const handleGetStarted = () => {
    if (user) {
      // إذا كان المستخدم مسجلاً للدخول، اذهب إلى صفحة "AllTasks"
      navigate("/AllTasks");
    } else {
      // إذا لم يكن مسجلاً، اعرض تنبيه باستخدام SweetAlert
      Swal.fire({
        icon: "warning",
        title: "Please log in first",
        text: "You need to be logged in to access the tasks.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };

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
              create, manage, and track your tasks, set priorities, and
              collaborate with your team. Whether you're handling personal to-do
              lists or team projects, our platform helps you stay on top of
              everything.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                 hover:bg-blue-700 transform hover:-translate-y-1 
                 transition-all duration-200 shadow-lg 
                 hover:shadow-xl font-medium"
              style={{ alignContent: "center" }}
            >
              Get Started
            </button>
          </div>
          <div className="image">
            <img src="/src/components/img/landing-image.png" alt="Landing" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-400 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat Item 1 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate__animated animate__fadeInUp">
              <h3 className="text-3xl font-bold text-blue-600">250+</h3>
              <p className="text-gray-600 mt-2">Tasks Completed</p>
            </div>

            {/* Stat Item 2 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate__animated animate__fadeInUp animate__delay-0.2s">
              <h3 className="text-3xl font-bold text-blue-600">15K+</h3>
              <p className="text-gray-600 mt-2">New Tasks Added Daily</p>
            </div>

            {/* Stat Item 3 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate__animated animate__fadeInUp animate__delay-0.4s">
              <h3 className="text-3xl font-bold text-blue-600">80%</h3>
              <p className="text-gray-600 mt-2">Tasks Completed on Time</p>
            </div>

            {/* Stat Item 4 */}
            <div className="stats-item bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate__animated animate__fadeInUp animate__delay-0.6s">
              <h3 className="text-3xl font-bold text-blue-600">300%</h3>
              <p className="text-gray-600 mt-2">Improved Team Efficiency</p>
            </div>
          </div>
        </div>
      </div>

      <GoUpButton />
    </div>
  );
};

export default Landing;
