import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Role = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRoleSelect = (roleId) => {
    localStorage.setItem("Role_Id", roleId);
    navigate("/register");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-pink-50 via-purple-50 to-white text-gray-900"
          : "bg-gradient-to-br from-[#1a103d] via-[#24114d] to-[#3a0d4a] text-white"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 md:w-3/4 lg:w-2/3">
        {/* Teacher Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer rounded-2xl shadow-xl p-10 flex flex-col items-center text-center border transition ${
            theme === "light"
              ? "bg-white border-gray-200 hover:shadow-2xl"
              : "bg-[#2b1a4d]/80 backdrop-blur-lg border-purple-500 hover:border-pink-400"
          }`}
          onClick={() => handleRoleSelect(2)}
        >
          <BookOpen
            className={`w-16 h-16 mb-6 ${
              theme === "light" ? "text-pink-500" : "text-pink-400"
            }`}
          />
          <h2 className="text-2xl font-bold mb-4">Teacher</h2>
          <p>
            Join as a teacher to guide students, create courses, and share your
            knowledge with learners worldwide.
          </p>
        </motion.div>

        {/* Student Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer rounded-2xl shadow-xl p-10 flex flex-col items-center text-center border transition ${
            theme === "light"
              ? "bg-white border-gray-200 hover:shadow-2xl"
              : "bg-[#2b1a4d]/80 backdrop-blur-lg border-pink-500 hover:border-purple-400"
          }`}
          onClick={() => handleRoleSelect(3)}
        >
          <GraduationCap
            className={`w-16 h-16 mb-6 ${
              theme === "light" ? "text-purple-500" : "text-purple-300"
            }`}
          />
          <h2 className="text-2xl font-bold mb-4">Student</h2>
          <p>
            Join as a student to find tutors, enroll in courses, and learn new
            skills with ease and flexibility.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Role;
