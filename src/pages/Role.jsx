import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Role = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleRoleSelect = (roleId) => {
    localStorage.setItem("Role_Id", roleId);
    navigate("/register");
  };

  const bgGradient = isLight
    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-900"
    : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100";

  const cardLight = "bg-white border-orange-200 hover:shadow-2xl hover:border-orange-400 text-gray-900";
  const cardDark = "bg-gray-900/60 border-orange-500 hover:border-orange-400 hover:shadow-xl text-gray-100";

  const iconTeacher = isLight ? "text-orange-500" : "text-orange-400";
  const iconStudent = isLight ? "text-yellow-500" : "text-yellow-400";

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${bgGradient}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 md:w-3/4 lg:w-2/3">
        {/* Teacher Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer rounded-2xl shadow-xl p-10 flex flex-col items-center text-center border transition backdrop-blur-md ${
            isLight ? cardLight : cardDark
          }`}
          onClick={() => handleRoleSelect(2)}
        >
          <BookOpen className={`w-16 h-16 mb-6 ${iconTeacher}`} />
          <h2 className="text-2xl font-bold mb-4">Teacher</h2>
          <p>
            Join as a teacher to guide students, create courses, and share your
            knowledge with learners worldwide.
          </p>
        </motion.div>

        {/* Student Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`cursor-pointer rounded-2xl shadow-xl p-10 flex flex-col items-center text-center border transition backdrop-blur-md ${
            isLight ? cardLight : cardDark
          }`}
          onClick={() => handleRoleSelect(3)}
        >
          <GraduationCap className={`w-16 h-16 mb-6 ${iconStudent}`} />
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
