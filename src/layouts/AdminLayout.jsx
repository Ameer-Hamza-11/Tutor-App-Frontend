import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Users,
  ArrowLeft,
  Home,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../apis/fetchApi";
import { getAllDemoSchedules, getAllJobRequestApi } from "../apis/jobrequestsApi";
import { useTheme } from "../context/ThemeProvider";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ React Query Data
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const { data: jobrequests = [] } = useQuery({
    queryKey: ["jobrequests"],
    queryFn: getAllJobRequestApi,
  });
  const { data: demoschedules = [] } = useQuery({
    queryKey: ["demoschedules"],
    queryFn: getAllDemoSchedules,
  });

  // Button styles
  const btnBase =
    "flex items-center gap-2 w-full px-4 py-2 rounded-xl font-medium transition-all";
  const goBackStyle =
    theme === "light"
      ? `${btnBase} bg-gray-200 hover:bg-gray-300 text-gray-800`
      : `${btnBase} bg-gray-700 hover:bg-gray-600 text-white`;
  const goHomeStyle =
    theme === "light"
      ? `${btnBase} bg-orange-500 hover:bg-orange-600 text-white`
      : `${btnBase} bg-orange-600 hover:bg-orange-700 text-white`;

  return (
    <div
      className={`flex h-screen ${theme === "light"
        ? "bg-gray-100 text-black"
        : "bg-gray-900 text-gray-200"
        }`}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`${theme === "light"
          ? "bg-orange-500"
          : "bg-gray-800"
          } text-white w-64 flex flex-col shadow-xl fixed h-full z-20`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/requests"
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <ClipboardList size={20} /> Job Requests
          </NavLink>
          <NavLink
            to="/admin/demoSchedules"
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <CalendarDays size={20} /> Demo Schedules
          </NavLink>
          <NavLink
            to="/admin/tutorAssignments"
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <Users size={20} /> Tutor Assignments
          </NavLink>
          <NavLink
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            <Users size={20} /> Users
          </NavLink>
        </nav>

        {/* Footer Buttons */}
        <div className="px-4 py-4 border-t border-white/20 space-y-2">
          <button onClick={() => navigate(-1)} className={goBackStyle}>
            <ArrowLeft size={18} /> Go Back
          </button>
          <button onClick={() => navigate("/")} className={goHomeStyle}>
            <Home size={18} /> Go Home
          </button>
          <NavLink
            to="/app/logout"
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl hover:bg-gray-500 transition ${theme === "light"
              ? "text-black bg-gray-100 hover:bg-gray-200"
              : "text-white bg-gray-700 hover:bg-gray-600"
              }`}
          >
            <LogOut size={20} /> Logout
          </NavLink>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <header
          className={`flex items-center justify-between px-6 py-4 border-b shadow-sm ${theme === "light"
            ? "bg-white border-gray-200"
            : "bg-gray-800 border-gray-700"
            }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <Menu size={22} />
          </button>

          <h2
            className={`text-lg font-semibold ${theme === "light" ? "text-black" : "text-white"
              }`}
          >
            Welcome, Admin
          </h2>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Page Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${theme === "light" ? "bg-gray-50" : "bg-gray-900"
            }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <Outlet context={{ theme, users, jobrequests, demoschedules }} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
