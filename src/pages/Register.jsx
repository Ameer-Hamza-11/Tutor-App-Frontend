import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../apis/authApi";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: () => registerApi(formData),
    onSuccess: () => {
      toast.success("Registered Successfully");
      navigate("/verifyOtp");
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed");
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

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardStyle = isLight
    ? "bg-white border border-orange-200 focus-within:ring-orange-400"
    : "bg-gray-900/60 border border-orange-500 focus-within:ring-orange-400";

  const inputBg = isLight ? "bg-gray-100" : "bg-gray-800/40";

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${bgGradient}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative transition-colors duration-500 ${cardStyle}`}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${isLight
              ? "text-orange-600"
              : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            }`}
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <User className="text-orange-400 mr-2" />
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
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <User className="text-orange-400 mr-2" />
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
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <User className="text-orange-400 mr-2" />
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
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <Mail className="text-orange-400 mr-2" />
            <input
              type="email"
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
            className={`flex items-center rounded-lg px-3 transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <Phone className="text-orange-400 mr-2" />
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
            className={`flex items-center rounded-lg px-3 relative transition-colors focus-within:ring-2 ${inputBg}`}
          >
            <Lock className="text-orange-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
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
              className="absolute right-3 text-orange-400"
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
            className={`w-full py-2 mt-4 rounded-lg font-semibold shadow-md text-white ${isLight
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
              }`}
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-400"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
