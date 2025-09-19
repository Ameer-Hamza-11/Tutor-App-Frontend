import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../apis/authApi";
import { useTheme } from "../context/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: () => resetPasswordApi(formData.otp, formData.newPassword),
    onSuccess: (data) => {
      alert(data.message || "Password reset successful");
      navigate("/login");
    },
    onError: (err) => {
      alert(err.message || "Reset password failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPassword) {
      alert("Please fill all fields");
      return;
    }
    mutation.mutate();
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500
        ${
          theme === "light"
            ? "bg-gray-50 text-gray-900"
            : "bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-500
          ${theme === "light" ? "bg-white" : "bg-purple-950"}
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Input */}
          <div
            className={`flex items-center rounded-lg px-3 transition-colors
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800"}
            `}
          >
            <KeyRound className="text-pink-400 mr-2" />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              className="w-full bg-transparent outline-none py-2"
              required
            />
          </div>

          {/* New Password Input */}
          <div
            className={`flex items-center rounded-lg px-3 relative transition-colors
              ${theme === "light" ? "bg-gray-100" : "bg-purple-800"}
            `}
          >
            <Lock className="text-pink-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
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

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold text-white"
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          <Link
            to="/login"
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
