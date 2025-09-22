import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const mutation = useMutation({
    mutationFn: (code) => verifyOtpApi(code),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Verification failed");
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      alert("Please enter all 4 digits");
      return;
    }
    mutation.mutate(code);
  };

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardStyle = isLight
    ? "bg-white border border-orange-200"
    : "bg-gray-900/60 border border-orange-500";

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-500 ${bgGradient}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center transition-colors duration-500 ${cardStyle}`}
      >
        <h2 className={`text-3xl font-extrabold mb-4 ${isLight ? "text-orange-600" : "bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"}`}>
          Verify OTP
        </h2>
        <p className="mb-6 text-sm text-gray-400">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-lg outline-none border-2 transition-colors
                ${isLight
                  ? "bg-gray-100 text-gray-900 border-gray-200 focus:border-orange-500"
                  : "bg-gray-800 text-white border-transparent focus:border-orange-500"}`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-semibold text-white shadow-md"
        >
          {mutation.isPending ? "Verifying..." : "Verify"}
        </motion.button>

        {/* Resend Email Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/resend-email")}
          className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 font-semibold text-white"
        >
          Resend Email
        </motion.button>

        {/* Error Message */}
        {mutation.isError && (
          <p className="text-red-400 mt-3">{mutation.error.message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
