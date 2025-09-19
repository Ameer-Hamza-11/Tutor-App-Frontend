import React, { useState } from "react";
import { motion } from "framer-motion";

const EducationForm = ({ setEducationDetails }) => {
  const [education, setEducation] = useState({
    Degree: "",
    Institution: "",
    Start_Year: "",
    End_Year: "",
    Grade: "",
  });

  const handleChange = (e) => {
    const updated = { ...education, [e.target.name]: e.target.value };
    setEducation(updated);
    setEducationDetails([updated]); // 👈 multiple entries ke liye array banega
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400">
        Education Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="Degree"
          placeholder="Degree"
          value={education.Degree}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          name="Institution"
          placeholder="Institution"
          value={education.Institution}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          type="number"
          name="Start_Year"
          placeholder="Start Year"
          value={education.Start_Year}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          type="number"
          name="End_Year"
          placeholder="End Year"
          value={education.End_Year}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />
        <input
          name="Grade"
          placeholder="Grade"
          value={education.Grade}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none sm:col-span-2"
        />
      </div>
    </motion.div>
  );
};

export default EducationForm;
