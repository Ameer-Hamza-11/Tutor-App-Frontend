import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import ChangeRoleForm from "./settings/ChangeRoleForm";
import DangerZone from "./settings/DangerZone";

const Settings = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "role",
      title: "Change Role",
      desc: "Switch between Student or Tutor role.",
      form: <ChangeRoleForm />,
    },
    {
      id: "danger",
      title: "Danger Zone",
      desc: "Manage account risks.",
      form: <DangerZone />,
      danger: true,
    },
  ];

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-500 ${
        isLight
          ? "bg-orange-50 text-gray-900"
          : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1
          className={`text-3xl font-bold mb-6 ${
            isLight ? "text-orange-600" : "text-orange-400"
          }`}
        >
          ⚙️ Settings
        </h1>

        {sections.map((section) => (
          <section
            key={section.id}
            className={`p-6 rounded-xl shadow-lg border transition-all duration-300
              ${isLight
                ? "bg-white border-orange-200 hover:border-orange-400 hover:shadow-xl"
                : "bg-gray-900/60 border-gray-700 hover:border-orange-400/70 hover:shadow-lg"
              }`}
          >
            {/* Header */}
            <div
              className="cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <h2
                className={`text-xl font-semibold flex items-center justify-between ${
                  section.danger
                    ? "text-red-600 dark:text-red-400"
                    : isLight
                    ? "text-gray-900"
                    : "text-gray-100"
                }`}
              >
                {section.title}
                <span
                  className={`text-sm ${
                    openSection === section.id
                      ? "text-orange-500"
                      : "text-gray-400"
                  }`}
                >
                  {openSection === section.id ? "▲" : "▼"}
                </span>
              </h2>
              <p
                className={`text-sm mt-1 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {section.desc}
              </p>
            </div>

            {/* Form */}
            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {section.form}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}
      </motion.div>
    </div>
  );
};

export default Settings;
