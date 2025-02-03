// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { auth, signInWithEmailAndPassword } from "../firebase";
// // import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// // import "./login.css";  // Import the CSS file for animations

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(
// //         auth,
// //         formData.email,
// //         formData.password
// //       );
// //       console.log("User logged in:", userCredential.user);
// //       navigate("/home");
// //     } catch (error) {
// //       setError(error.message);
// //       console.error("Error logging in:", error.message);
// //     }
// //   };

// //   const handleGoogleLogin = async () => {
// //     const provider = new GoogleAuthProvider();
// //     try {
// //       await signInWithPopup(auth, provider);
// //       navigate("/home");
// //     } catch (error) {
// //       setError(error.message);
// //       console.error("Google login error:", error.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
// //         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
// //               Email Address
// //             </label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
// //               placeholder="Enter your email"
// //               required
// //             />
// //           </div>
// //           <div className="mb-6">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
// //               placeholder="Enter your password"
// //               required
// //             />
// //           </div>
// //           <button

// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         <button
// //           onClick={handleGoogleLogin}
// //           className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
// //         >
// //           Login with Google
// //         </button>
// //         <p className="mt-4 text-center text-gray-600">
// //           Don't have an account?{" "}
// //           <Link to="/register" className="text-blue-600 hover:underline">
// //             Create an account
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from "react";
// import "./Register.css";

// import {
//   auth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "../firebase";

// function SignInForm() {
//   const [state, setState] = useState({ email: "", password: "" });

//   const handleChange = (evt) => {
//     setState({ ...state, [evt.target.name]: evt.target.value });
//   };

//   const handleOnSubmit = async (evt) => {
//     evt.preventDefault();
//     const { email, password } = state;
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       alert(`Welcome back, ${userCredential.user.email}!`);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       alert(`Google Sign-in successful! Welcome, ${result.user.displayName}`);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Sign In</h1>
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//            <br></br>
//         <button type="submit">Sign In</button>
//         <br></br>
//         <button type="button" onClick={handleGoogleSignIn}>
//           Sign in with Google
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./login.css";  // Import the CSS file for animations


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
         
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
        >
          Login with Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
