import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { resendEmailApi } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider"; // ✅ theme hook

const ResendEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ theme context

  const mutation = useMutation({
    mutationFn: (email) => resendEmailApi(email),
    onSuccess: (data) => {
      alert(data.message);
      navigate("/verifyOtp"); // ✅ redirect to OTP page
    },
    onError: (error) => {
      alert(error.message || "Failed to resend email");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    mutation.mutate(email);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500
        ${theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg text-center transition-colors duration-500
          ${theme === "light" ? "bg-white border border-gray-200" : "bg-indigo-950"}
        `}
      >
        <h2 className="text-2xl font-bold mb-6">Resend Verification Email</h2>
        <p className="mb-6 text-sm text-gray-400">
          Enter your registered email to receive a new OTP.
        </p>

        {/* Email Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg outline-none border-2 transition-colors
              ${theme === "light"
                ? "bg-gray-100 text-gray-900 border-gray-200 focus:border-blue-500"
                : "bg-indigo-800 text-white border-transparent focus:border-blue-500"}
            `}
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold text-white"
          >
            {mutation.isPending ? "Sending..." : "Resend Email"}
          </motion.button>
        </form>

        {/* Error Message */}
        {mutation.isError && (
          <p className="text-red-400 mt-3">{mutation.error.message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ResendEmail;
