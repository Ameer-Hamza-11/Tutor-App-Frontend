import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import EditProfileForm from "./settings/EditProfileForm";
import ChangeRoleForm from "./settings/ChangeRoleForm";
import ChangePasswordForm from "./settings/ChangePasswordForm";
import DangerZone from "./settings/DangerZone";

const Settings = () => {
  const { theme } = useTheme();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-500
        ${
          theme === "light"
            ? "bg-gray-50 text-gray-900"
            : "bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100"
        }
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1
          className={`text-3xl font-bold mb-6 ${
            theme === "light" ? "text-orange-600" : "text-orange-400"
          }`}
        >
          ⚙️ Settings
        </h1>

        {/* Section Reusable Card Style */}
        {[
          {
            id: "profile",
            title: "Edit Profile",
            desc: "Update your personal details.",
            form: <EditProfileForm />,
          },
          {
            id: "role",
            title: "Change Role",
            desc: "Switch between Student or Tutor role.",
            form: <ChangeRoleForm />,
          },
          {
            id: "password",
            title: "Change Password",
            desc: "Update your login credentials securely.",
            form: <ChangePasswordForm />,
          },
          {
            id: "danger",
            title: "Danger Zone",
            desc: "Manage account risks.",
            form: <DangerZone />,
            danger: true,
          },
        ].map((section) => (
          <section
            key={section.id}
            className={`p-6 rounded-xl shadow-lg border transition-all duration-300 cursor-pointer
              ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:border-orange-400"
                  : "bg-gray-900/60 border-gray-700 hover:border-orange-400/70"
              }
            `}
            onClick={() => toggleSection(section.id)}
          >
            <div>
              <h2
                className={`text-xl font-semibold flex items-center justify-between ${
                  section.danger
                    ? "text-red-600 dark:text-red-400"
                    : theme === "light"
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
              <p className="text-sm text-gray-500 mt-1">{section.desc}</p>
            </div>

            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 overflow-hidden"
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
