import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut, onAuthStateChanged } from "../../firebase";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج

      // تأخير عرض SweetAlert بعد الانتقال إلى الصفحة الرئيسية
      setTimeout(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }, 500); // تأخير بسيط لضمان تحميل الصفحة
    } catch (error) {
      Swal.fire({
        title: "Logout Error",
        text: "There was an error while logging out. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/Articles", label: "Articles" },
  ];

  const handleTasksClick = (e) => {
    if (!user) {
      e.preventDefault(); // منع الانتقال إلى الصفحة
      Swal.fire({
        title: "Please log in",
        text: "To access the tasks page, you must log in first.",
        icon: "warning",
        confirmButtonText: "Okay",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            to={user ? "/home" : "/"}
            className="text-2xl font-bold text-white transition-transform duration-300 hover:scale-105"
          >
            Manage<span className="text-blue-200">Mate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-grow justify-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg font-medium text-blue-100 transition-all duration-300 hover:scale-105 hover:text-white hover:bg-blue-500/20"
              >
                {link.label}
              </Link>
            ))}

            {/* حماية رابط المهام */}
            <Link
              to={user ? "/AllTasks" : "#"}
              onClick={handleTasksClick}
              className="px-4 py-2 rounded-lg font-medium text-blue-100 transition-all duration-300 hover:scale-105 hover:text-white hover:bg-blue-500/20"
            >
              Tasks
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/UserProfilePage"
                  className="flex items-center space-x-2 text-blue-100 hover:text-white"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium truncate max-w-[150px]">
                    {user.email}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-blue-100 transition-all duration-300 hover:scale-110 hover:bg-blue-500/20 hover:text-white relative group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-300">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-white text-blue-600 font-medium shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg hover:text-white"
              >
                <div style={{ color: "blue" }}>Login</div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-blue-500/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-3 space-y-2 bg-blue-700 shadow-lg rounded-lg mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-6 py-3 text-blue-100 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/UserProfilePage"
                  className="flex items-center space-x-2 px-6 py-3 text-blue-100 hover:bg-blue-600 hover:text-white"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm truncate">{user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-blue-100 transition-all duration-300 hover:scale-110 hover:bg-blue-500/20 hover:text-white relative group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 transition-opacity duration-300">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block mx-6 text-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
      {/* Spacer div to push content below navbar */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;
