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
        ${theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
        }
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Edit Profile */}
        <section className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("profile")}
          >
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <p className="text-sm text-gray-500">
              Update your personal details.
            </p>
          </div>

          <AnimatePresence>
            {openSection === "profile" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <EditProfileForm />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Change Role */}
        <section className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("role")}
          >
            <h2 className="text-xl font-semibold">Change Role</h2>
            <p className="text-sm text-gray-500">
              Switch between Student or Tutor role.
            </p>
          </div>

          <AnimatePresence>
            {openSection === "role" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <ChangeRoleForm />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Change Password */}
        <section className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("password")}
          >
            <h2 className="text-xl font-semibold">Change Password</h2>
            <p className="text-sm text-gray-500">
              Update your login credentials securely.
            </p>
          </div>

          <AnimatePresence>
            {openSection === "password" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "fit-content" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 overflow-hidden"
              >
                <ChangePasswordForm />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Danger Zone */}
        <section className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("danger")}
          >
            <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
            <p className="text-sm text-gray-500">Manage account risks.</p>
          </div>

          <AnimatePresence>
            {openSection === "danger" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <DangerZone />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </motion.div>
    </div>
  );
};

export default Settings;
