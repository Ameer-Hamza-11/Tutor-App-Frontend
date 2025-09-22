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
  const isLight = theme === "light";

  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: () => resetPasswordApi(formData.otp, formData.newPassword),
    onSuccess: (data) => {
      alert(data.message || "Password reset successful");
      navigate("/login");
    },
    onError: (err) => alert(err.message || "Reset password failed"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPassword) {
      alert("Please fill all fields");
      return;
    }
    mutation.mutate();
  };

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardStyle = isLight
    ? "bg-white border border-orange-200"
    : "bg-gray-900/60 border border-orange-500";

  const inputBg = isLight ? "bg-gray-100 text-gray-900" : "bg-gray-800/40 text-white";

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${bgGradient}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center transition-colors duration-500 ${cardStyle}`}
      >
        <h2
          className={`text-3xl font-extrabold mb-4 ${
            isLight
              ? "text-orange-600"
              : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
          }`}
        >
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Input */}
          <div className={`flex items-center rounded-lg px-3 transition-colors ${inputBg}`}>
            <KeyRound className="text-orange-500 mr-2" />
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
          <div className={`flex items-center rounded-lg px-3 relative transition-colors ${inputBg}`}>
            <Lock className="text-orange-500 mr-2" />
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
              className="absolute right-3 text-orange-500"
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
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold text-white shadow-md"
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-400 font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
