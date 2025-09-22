import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardBg = isLight
    ? "bg-white/80 text-gray-900 border border-orange-200 shadow-lg"
    : "bg-gray-900/60 text-gray-100 border border-gray-700 shadow-2xl";

  const buttonGradient = isLight
    ? "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white"
    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white";

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ${bgGradient}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`text-center p-8 rounded-2xl ${cardBg} backdrop-blur-md max-w-md`}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-4 rounded-full ${isLight ? "bg-orange-400" : "bg-orange-600"}`}
          >
            <AlertTriangle size={60} className="text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold mb-3">Oops! Page Not Found</h1>
        <p className={`${isLight ? "text-gray-700" : "text-gray-300"} mb-6`}>
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${buttonGradient}`}
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
