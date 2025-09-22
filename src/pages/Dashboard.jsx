// Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Megaphone,
} from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const Dashboard = () => {
  const { theme } = useTheme();

  // Assignments
  const assignments = [
    { id: 1, title: "Math Homework", subject: "Mathematics", dueDate: "2025-09-15", status: "Pending" },
    { id: 2, title: "English Essay", subject: "English Literature", dueDate: "2025-09-18", status: "Completed" },
    { id: 3, title: "Science Project", subject: "Physics", dueDate: "2025-09-20", status: "In Progress" },
  ];

  // Deadlines
  const deadlines = [
    { id: 1, task: "History Assignment", dueDate: "2025-09-12" },
    { id: 2, task: "Chemistry Lab Report", dueDate: "2025-09-14" },
  ];

  // Announcements
  const announcements = [
    { id: 1, message: "New courses will start from next week." },
    { id: 2, message: "Holiday on 20th September." },
  ];

  // Stats
  const stats = [
    { id: 1, label: "Total Assignments", value: assignments.length, color: "text-orange-500", icon: <BookOpen size={20} /> },
    { id: 2, label: "Completed", value: assignments.filter(a => a.status === "Completed").length, color: "text-green-500", icon: <CheckCircle size={20} /> },
    { id: 3, label: "Pending", value: assignments.filter(a => a.status === "Pending").length, color: "text-red-500", icon: <AlertCircle size={20} /> },
    { id: 4, label: "In Progress", value: assignments.filter(a => a.status === "In Progress").length, color: "text-yellow-500", icon: <Clock size={20} /> },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className={`text-3xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>Dashboard</h1>
        <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
          Welcome back! Here’s what’s happening.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl p-4 text-center shadow-md flex flex-col items-center gap-2 ${
              theme === "light"
                ? "bg-white border border-gray-200 text-black"
                : "bg-gray-800 border border-gray-700 text-gray-200"
            }`}
          >
            <div className={s.color}>{s.icon}</div>
            <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>{s.label}</p>
            <h2 className={`text-2xl font-bold ${s.color}`}>{s.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Assignments */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
          Assignments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl p-5 shadow-lg transition-all ${
                theme === "light"
                  ? "bg-white border border-gray-200 text-black hover:shadow-xl"
                  : "bg-gray-800 border border-gray-700 text-gray-200 hover:shadow-xl"
              }`}
            >
              <h3 className="text-xl font-semibold text-orange-500">{a.title}</h3>
              <p className="mt-1">Subject: {a.subject}</p>
              <p className="text-sm text-gray-400">Due: {new Date(a.dueDate).toLocaleDateString()}</p>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                  a.status === "Completed"
                    ? "bg-green-100 text-green-600 dark:bg-green-600/30 dark:text-green-400"
                    : a.status === "Pending"
                    ? "bg-red-100 text-red-600 dark:bg-red-600/30 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-600/30 dark:text-yellow-400"
                }`}
              >
                {a.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deadlines */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
          Upcoming Deadlines
        </h2>
        <ul className="space-y-3">
          {deadlines.map((d, i) => (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-lg p-3 flex justify-between items-center shadow-md ${
                theme === "light"
                  ? "bg-white border border-gray-200 text-black"
                  : "bg-gray-800 border border-gray-700 text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-500" />
                <span>{d.task}</span>
              </div>
              <span className="text-sm text-gray-400">{new Date(d.dueDate).toLocaleDateString()}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Announcements */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"}`}>
          Announcements
        </h2>
        <ul className="space-y-3">
          {announcements.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-lg p-3 shadow-md flex items-center gap-2 ${
                theme === "light"
                  ? "bg-white border border-gray-200 text-black"
                  : "bg-gray-800 border border-gray-700 text-gray-200"
              }`}
            >
              <Megaphone size={18} className="text-orange-500" />
              {n.message}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
