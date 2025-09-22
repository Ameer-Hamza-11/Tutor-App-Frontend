import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../apis/authApi";
import { useTheme } from "../context/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => forgotPasswordApi(Email),
    onSuccess: (data) => {
      alert(data.message || "OTP sent to your email.");
      navigate("/reset-password");
    },
    onError: (err) => alert(err.message || "Request failed"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Email) return alert("Please enter your email");
    mutation.mutate();
  };

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardStyle = isLight
    ? "bg-white border border-orange-200"
    : "bg-gray-900/60 border border-orange-500";

  const inputBg = isLight ? "bg-gray-100" : "bg-gray-800/40";

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${bgGradient}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl transition-colors duration-500 ${cardStyle}`}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${
            isLight
              ? "text-orange-600"
              : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
          }`}
        >
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className={`flex items-center rounded-lg px-3 transition-colors ${inputBg}`}>
            <Mail className="text-orange-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none py-2 placeholder-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-2 mt-4 rounded-lg font-semibold text-white shadow-md ${
              isLight
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
            }`}
          >
            {mutation.isPending ? "Sending..." : "Send OTP"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          <Link className="font-semibold text-orange-500 hover:text-orange-400" to="/login">
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
