import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-pink-900 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 rounded-2xl bg-purple-800/40 shadow-xl backdrop-blur-lg border border-purple-700 max-w-md"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-4 bg-pink-600 rounded-full"
          >
            <AlertTriangle size={60} className="text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold mb-3">Oops! Page Not Found</h1>
        <p className="text-gray-300 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 font-semibold shadow-lg"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
