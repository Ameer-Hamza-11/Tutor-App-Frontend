import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  User,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user); // { Role: "Student"/"Teacher"/"Admin", ... }

  let links = [
    { name: "Dashboard", path: "/app", icon: <Home size={20} /> },
    { name: "Courses", path: "/app/courses", icon: <BookOpen size={20} /> },
    { name: "Find Jobs", path: "/app/find-jobs", icon: <Users size={20} />, roles: ["Teacher"] },
    { name: "Create Student Profile", path: "/create-student-profile", icon: <User size={20} />, roles: ["Student"] },
    { name: "Profile", path: `/app/profile/${user.User_Id}`, icon: <User size={20} /> },
    { name: "Settings", path: "/app/settings", icon: <Settings size={20} /> },
    { name: "Admin Panel", path: "/admin", icon: <Users size={20} />, roles: ["Admin"] },
  ]

  links = links.filter(link => {
    if (user.role === "Admin") return true; // Admin sees all links
    return !link.roles || link.roles.includes(user.role);
  });

  const sidebarBase =
    theme === "light"
      ? "bg-white text-gray-900 border-r border-gray-200"
      : "bg-[#121022] text-gray-100 border-r border-gray-800";

  // ✅ Active Link Styles
  const activeLink =
    theme === "light"
      ? "bg-blue-500 text-white shadow-md"
      : "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg";

  const hoverLink =
    theme === "light" ? "hover:bg-gray-100" : "hover:bg-[#1e1c2e]";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 ${theme === "light" ? "text-gray-900" : "text-white"
          }`}
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen w-64 flex-col p-4 transition-colors duration-300 ${sidebarBase}`}
      >
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Tutor App
        </motion.h1>

        {/* Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={link.path}
                end={link.path === "/app"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? activeLink : hoverLink
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 
            bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-lg"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </motion.button>
      </div>

      {/* Mobile Sidebar with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 h-screen w-64 flex flex-col p-4 z-40 ${sidebarBase}`}
          >
            {/* Close Button */}
            <button
              className={`self-end mb-6 ${theme === "light" ? "text-gray-900" : "text-white"
                }`}
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              Tutor App
            </motion.h1>

            {/* Links */}
            <nav className="flex flex-col gap-2 flex-1">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/app"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? activeLink : hoverLink
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 
                bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-lg"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
