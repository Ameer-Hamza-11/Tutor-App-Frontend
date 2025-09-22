import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { resendEmailApi } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider"; // ✅ theme hook
import toast from "react-hot-toast";

const ResendEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const mutation = useMutation({
    mutationFn: (email) => resendEmailApi(email),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/verifyOtp"); 
    },
    onError: (error) => {
      toast.error(error.message || "Failed to resend email");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    mutation.mutate(email);
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
          className={`text-3xl font-extrabold mb-4 ${isLight
              ? "text-orange-600"
              : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            }`}
        >
          Resend Verification Email
        </h2>
        <p className={`mb-6 text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          Enter your registered email to receive a new OTP.
        </p>

        {/* Email Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg outline-none border-2 transition-colors ${inputBg} border-transparent focus:border-orange-500`}
            required
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold text-white shadow-md"
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
