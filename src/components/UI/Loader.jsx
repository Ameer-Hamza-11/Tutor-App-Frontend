import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500"></div>

        {/* Inner Glow Circle */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-md"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-32 absolute text-lg font-semibold text-pink-300 tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
