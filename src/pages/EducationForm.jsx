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
    setEducationDetails([updated]); // multiple entries ke liye array
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#1e1c2e] text-gray-900 dark:text-gray-200 
                 rounded-xl shadow-lg p-6 space-y-6 border border-gray-200 dark:border-orange-400/20"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
        Education Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="Degree"
          placeholder="Degree"
          value={education.Degree}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 
                     border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <input
          name="Institution"
          placeholder="Institution"
          value={education.Institution}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 
                     border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <input
          type="number"
          name="Start_Year"
          placeholder="Start Year"
          value={education.Start_Year}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 
                     border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <input
          type="number"
          name="End_Year"
          placeholder="End Year"
          value={education.End_Year}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 
                     border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <input
          name="Grade"
          placeholder="Grade"
          value={education.Grade}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 
                     border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none sm:col-span-2"
        />
      </div>
    </motion.div>
  );
};

export default EducationForm;
