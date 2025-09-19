import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/authApi";
import { useDispatch } from "react-redux";
import { setToken, setProfile } from "../../store/slices/authSlice";
import { setAuthToken } from "../apis/client";
import { useTheme } from "../context/ThemeProvider";  // ✅ import theme hook

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme(); // ✅ theme context use
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: () => loginApi(formData),
    onSuccess: (data) => {
      if (!data?.token || !data?.user) {
        alert("Invalid response from server");
        return;
      }
      dispatch(setToken(data.token));
      setAuthToken(data.token);
      dispatch(setProfile({ user: data.user }));

      alert("Login Successful");
      const role = data.user.role.toLowerCase();

      if (role === "student") navigate("/app");
      else if (role === "teacher") navigate("/app");
      else if (role === "admin") navigate("/app");
    },
    onError: (err) => alert(err.message || "Login failed"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Email, Password } = formData;
    if (!Email || !Password) {
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
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg relative transition-colors duration-500
          ${theme === "light" ? "bg-white" : "bg-purple-950"}
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800"}
            `}
          >
            <Mail className="text-pink-400 mr-2" />
            <input
              type="Email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
              required
            />
          </div>

          {/* Password */}
          <div
            className={`flex items-center rounded-lg px-3 relative transition-colors
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800"}
            `}
          >
            <Lock className="text-pink-400 mr-2" />
            <input
              type={showPassword ? "text" : "Password"}
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
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

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Register
          </Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link
            to="/forgot-password"
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
