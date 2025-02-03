
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, signInWithEmailAndPassword } from "../firebase";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import "./login.css";  // Import the CSS file for animations


// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       console.log("User logged in:", userCredential.user);
//       navigate("/home");
//     } catch (error) {
//       setError(error.message);
//       console.error("Error logging in:", error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       navigate("/home");
//     } catch (error) {
//       setError(error.message);
//       console.error("Google login error:", error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
         
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
//           >
//             Login
//           </button>
//         </form>
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
//         >
//           Login with Google
//         </button>
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in:", userCredential.user);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Section */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-400 to-blue-800 flex-1 items-center justify-center p-8">
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome back! Please log in to stay on top of your work</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in to Celebration</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Sign in
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
          >
            Login with Google
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account yet? {" "}
            <Link to="/register" className="text-indigo-600 hover:underline">sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
