import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../apis/authApi";
import { useTheme } from "../context/ThemeProvider"; // ✅ theme hook

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ theme context

  const [formData, setFormData] = useState({
    User_Name: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone_Number: "",
    Password: "",
    Role_Id: localStorage.getItem("Role_Id") || "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => registerApi(formData),
    onSuccess: (data) => {
      alert("Registered Successfully");
      navigate("/verifyOtp");
      console.log(data);
    },
    onError: (err) => {
      alert(err.message || "Registration failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { User_Name, Email, Phone_Number, Password } = formData;
    if (!User_Name || !Email || !Phone_Number || !Password) {
      alert("Fill all the fields");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500
        ${theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative transition-colors duration-500
          ${theme === "light"
            ? "bg-white border border-gray-200"
            : "bg-purple-950/40 backdrop-blur-xl border border-purple-600/40"}
        `}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-center
            ${theme === "light"
              ? "text-gray-800"
              : "bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent"}
          `}
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User_Name */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <User className="text-pink-400 mr-2" />
            <input
              type="text"
              name="User_Name"
              placeholder="User Name"
              value={formData.User_Name}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* First Name */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <User className="text-pink-400 mr-2" />
            <input
              type="text"
              name="First_Name"
              placeholder="First Name"
              value={formData.First_Name}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Last Name */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <User className="text-pink-400 mr-2" />
            <input
              type="text"
              name="Last_Name"
              placeholder="Last Name"
              value={formData.Last_Name}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <Mail className="text-pink-400 mr-2" />
            <input
              type="Email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <Phone className="text-pink-400 mr-2" />
            <input
              type="text"
              name="Phone_Number"
              placeholder="Phone Number"
              value={formData.Phone_Number}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div
            className={`flex items-center rounded-lg px-3 relative transition-colors focus-within:ring-2 focus-within:ring-pink-400
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800/40"}
            `}
          >
            <Lock className="text-pink-400 mr-2" />
            <input
              type={showPassword ? "text" : "Password"}
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-pink-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white shadow-md"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
