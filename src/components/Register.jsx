// import { useState } from "react";
// import { auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, database, ref, set } from "../firebase"; // Firebase imports
// import "./Register.css";

// function SignUpForm() {
//   const [state, setState] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "User",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     general: "",
//   });

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setState({ ...state, [name]: value });
//   };

//   const validateForm = () => {
//     let errors = {};
//     if (!state.firstName) errors.firstName = "First name is required.";
//     if (!state.lastName) errors.lastName = "Last name is required.";
//     if (!state.email) errors.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(state.email)) errors.email = "Please enter a valid email address.";
//     if (!state.password) errors.password = "Password is required.";
//     else if (state.password.length < 6) errors.password = "Password must be at least 6 characters long.";
//     if (state.password !== state.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    
//     setError(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleOnSubmit = async (evt) => {
//     evt.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);

//     try {
//       const { firstName, lastName, email, password, role } = state;
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data to Firebase Realtime Database using set
//       const dbRef = ref(database, 'users/' + user.uid);
//       await set(dbRef, { firstName, lastName, email, role });

//       alert("Sign up successful!");
//       setState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "User" });
//     } catch (error) {
//       setError((prev) => ({ ...prev, general: "An error occurred during sign up. Please try again." }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignUp = async () => {
//     const provider = new GoogleAuthProvider();
//     setLoading(true);

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const userData = { firstName: user.displayName.split(" ")[0], lastName: user.displayName.split(" ")[1], email: user.email, role: "User" };

//       // Save user data to Firebase Realtime Database using set
//       const dbRef = ref(database, 'users/' + user.uid);
//       await set(dbRef, userData);

//       alert("Google Sign Up successful!");
//     } catch (error) {
//       setError((prev) => ({ ...prev, general: "An error occurred during Google sign up. Please try again." }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit}>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <h1>Sign Up</h1>
//         {error.general && <p className="error-message general-error">{error.general}</p>}
//         <div className="input-container">
//           <input type="text" name="firstName" value={state.firstName} onChange={handleChange} placeholder="First Name" required />
//           {error.firstName && <p className="error-message">{error.firstName}</p>}
//         </div>
//         <div className="input-container">
//           <input type="text" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Last Name" required />
//           {error.lastName && <p className="error-message">{error.lastName}</p>}
//         </div>
//         <div className="input-container">
//           <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" required />
//           {error.email && <p className="error-message">{error.email}</p>}
//         </div>
//         <div className="input-container">
//           <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" required />
//           {error.password && <p className="error-message">{error.password}</p>}
//         </div>
//         <div className="input-container">
//           <input type="password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
//           {error.confirmPassword && <p className="error-message">{error.confirmPassword}</p>}
//         </div>
//         <div className="input-container">
//           <select name="role" value={state.role} onChange={handleChange} required>
//             <option value="User">User</option>
//             <option value="Manager">Manager</option>
//           </select>
//         </div>
//         <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
//         <br />
//         <button type="button" onClick={handleGoogleSignUp} disabled={loading}>{loading ? "Processing..." : "Sign up with Google"}</button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;





// // const Register = () => {
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     role: "user", // Add role as "user" by default
// //   });
// //   const [error, setError] = useState("");
// //   const [successMessage, setSuccessMessage] = useState(""); // Add success message state
// //   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccessMessage("");

// //     // Check if passwords match
// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match!");
// //       return;
// //     }

// //     try {
// //       // Register the user with Firebase
// //       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
// //       const user = userCredential.user;

// //       // Save user data to Firebase Realtime Database
// //       await set(ref(database, `users/${user.uid}`), {
// //         firstName: formData.firstName,
// //         lastName: formData.lastName,
// //         email: formData.email,
// //         role: formData.role, // Save the role
// //       });

// //       setSuccessMessage("Account created successfully!"); // Show success message
// //       console.log("User registered:", user);
// //       setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
// //     } catch (error) {
// //       setError(error.message);
// //       console.error("Error registering user:", error.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Account</h2>
// //         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
// //         {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>} {/* Display success message */}
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
// //             <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
// //             <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
// //             <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //           </div>
// //           <div className="mb-6 relative">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
// //             <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="eye-icon"
// //             >
// //               👁️
// //             </button>
// //           </div>
// //           <div className="mb-6 relative">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
// //             <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
// //             <button
// //               type="button"
// //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //               className="eye-icon"
// //             >
// //               👁️
// //             </button>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
// //             <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
// //               <option value="user">Team Member</option>
// //               <option value="manager">Manager</option>
// //             </select>
// //           </div>
// //           <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Create Account</button>
// //         </form>
// //         <p className="mt-4 text-center text-gray-600">
// //           Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };



// // import {
// //   auth,
// //   createUserWithEmailAndPassword,
// //   GoogleAuthProvider,
// //   signInWithPopup,
// //   database,
// //   ref,
// //   set,
// // } from "../firebase";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, database, ref, set } from "../firebase"; // Firebase imports
import axios from "axios"; // Importing Axios
import "./Register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", 
    role: "user", // Add role as "user" by default
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add success message state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Register the user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user data to Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role, // Save the role
      });

      setSuccessMessage("Account created successfully!"); // Show success message
      console.log("User registered:", user);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>} {/* Display success message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              👁️
            </button> */}
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {/* <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="eye-icon"
            >
              👁️
            </button> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="user">Team Member</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">Create Account</button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
