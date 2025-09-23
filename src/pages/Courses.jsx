import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import { BookOpen, Clock, GraduationCap, Search, Star } from "lucide-react";

const sampleCourses = [
  {
    id: 1,
    title: "Intro to Mathematics",
    subject: "Mathematics",
    level: "Beginner",
    durationHours: 24,
    rating: 4.6,
    students: 320,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "English Grammar Mastery",
    subject: "English",
    level: "Intermediate",
    durationHours: 18,
    rating: 4.3,
    students: 210,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    title: "Fundamentals of Physics",
    subject: "Physics",
    level: "Beginner",
    durationHours: 30,
    rating: 4.7,
    students: 150,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Chemistry Essentials",
    subject: "Chemistry",
    level: "Advanced",
    durationHours: 22,
    rating: 4.2,
    students: 95,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 5,
    title: "Biology for Everyone",
    subject: "Biology",
    level: "Intermediate",
    durationHours: 28,
    rating: 4.5,
    students: 175,
    color: "from-cyan-500 to-sky-500",
  },
  {
    id: 6,
    title: "World History Highlights",
    subject: "History",
    level: "Beginner",
    durationHours: 16,
    rating: 4.1,
    students: 140,
    color: "from-amber-500 to-orange-500",
  },
];

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");

  const filtered = useMemo(() => {
    return sampleCourses.filter((c) => {
      const matchesQuery = `${c.title} ${c.subject}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesLevel = level === "All" || c.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  const isLight = theme === "light";

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className={`text-3xl font-bold ${isLight ? "text-black" : "text-white"}`}>Courses</h1>
        <p className={`${isLight ? "text-gray-600" : "text-gray-400"}`}>
          Discover courses tailored to your learning goals.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 shadow-sm transition-colors ${
            isLight ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"
          }`}
        >
          <Search size={18} className="text-orange-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or subject"
            className={`w-full outline-none bg-transparent ${isLight ? "text-black" : "text-gray-100"}`}
          />
        </div>

        <div className="flex gap-2">
          {levels.map((lv) => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                level === lv
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow"
                  : isLight
                  ? "bg-white text-gray-800 border-gray-200 hover:bg-orange-50"
                  : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`rounded-xl overflow-hidden shadow-lg border transition-colors ${
              isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${c.color}`} />

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className={`text-lg font-semibold ${isLight ? "text-black" : "text-white"}`}>{c.title}</h3>
                  <p className="text-sm text-orange-500 font-medium flex items-center gap-1">
                    <BookOpen size={16} /> {c.subject}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    isLight
                      ? "bg-orange-100 text-orange-700"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {c.level}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Clock size={16} /> {c.durationHours}h
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Star size={16} className="text-yellow-400" /> {c.rating}
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <GraduationCap size={16} /> {c.students}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow hover:shadow-md transition">
                  Enroll
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                    isLight
                      ? "bg-white text-gray-800 border-gray-200 hover:bg-orange-50"
                      : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
