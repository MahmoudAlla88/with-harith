import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import {
  auth,
  createUserWithEmailAndPassword,
  database,
  ref,
  set,
} from "../firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle registration and validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Regex validation
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/; // Supports Arabic & English
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(formData.firstName)) {
      Swal.fire("Error!", "First name should contain only letters.", "error");
      return;
    }

    if (!nameRegex.test(formData.lastName)) {
      Swal.fire("Error!", "Last name should contain only letters.", "error");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      Swal.fire("Error!", "Invalid email address.", "error");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      Swal.fire(
        "Error!",
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.",
        "error"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error!", "Passwords do not match!", "error");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
      });

      Swal.fire({
        title: "Registration Successful!",
        text: "You will be redirected to the login page.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="hidden md:flex bg-gradient-to-br from-blue-400 to-blue-800 flex-1 items-center justify-center p-8">
          <div className="text-white text-center">
            <h2 className="text-3xl font-light leading-relaxed mb-4 animate-pulse">
              Create an account to manage your tasks efficiently and stay organized with ease!
            </h2>
            <FaUserPlus className="text-5xl mt-4 mx-auto text-white animate-pulse" />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign up for Celebration
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            >
              <option value="user">Team Member</option>
              <option value="manager">Manager</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              <div id="para">Login</div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
