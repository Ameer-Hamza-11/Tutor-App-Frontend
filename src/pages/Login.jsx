import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi,updateFcmTokenApi } from "../apis/authApi";
import { useDispatch } from "react-redux";
import { setToken, setProfile } from "../../store/slices/authSlice";
import { setAuthToken } from "../apis/client";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";
import { requestFCMToken } from "../firebase/firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: () => loginApi(formData),
    onSuccess: async (data) => {
      if (!data?.token || !data?.user) return alert("Invalid response from server");

      toast.success("Login Successful");
      dispatch(setToken(data.token));
      setAuthToken(data.token);
      dispatch(setProfile({ user: data.user }));

      // ✅ FCM token generate + backend update
      const fcmToken = await requestFCMToken();
      if (fcmToken) {
        await updateFcmTokenApi(fcmToken);
        localStorage.setItem("fcmToken", fcmToken);
      }

      const redirectPath = data.user?.role === "Admin" ? "/admin" : "/app";
      navigate(redirectPath);
    },
    onError: (err) => toast.error(err.message || "Login failed"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Email, Password } = formData;
    if (!Email || !Password) return alert("Fill all the fields");

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
    <div className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${bgGradient}`}>
      <Motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative transition-colors duration-500 ${cardStyle}`}
      >
        <h2 className={`text-3xl font-extrabold mb-6 text-center ${isLight ? "text-orange-600" : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"}`}>
          Login
        </h2>

        {/* Role selection button removed per requirement */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className={`flex items-center rounded-lg px-3 transition-colors ${inputBg}`}>
            <Mail className="text-orange-400 mr-2" />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className={`flex items-center rounded-lg px-3 relative transition-colors ${inputBg}`}>
            <Lock className="text-orange-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
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

          {/* Submit */}
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-2 mt-4 rounded-lg font-semibold shadow-md text-white ${isLight
              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
              }`}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link className="font-semibold text-orange-500 hover:text-orange-400" to="/register">
            Register
          </Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link className="font-semibold text-orange-500 hover:text-orange-400" to="/forgot-password">
            Forgot Password?
          </Link>
        </p>
      </Motion.div>
    </div>
  );
};

export default Login;
