import {
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = ({ pageTitle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className={`h-16 flex items-center justify-between px-4 md:px-6 shadow-md transition-colors duration-300
        ${
          theme === "light"
            ? "bg-white text-gray-900 border-b border-gray-200"
            : "bg-[#1a172e] text-white border-b border-gray-800"
        }`}
    >
      {/* Left: Page Title */}
      <motion.h1
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-lg md:text-xl font-bold capitalize truncate text-orange-500"
      >
        {pageTitle}
      </motion.h1>

      {/* Right: Theme Toggle + Dropdown */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9, rotate: 180 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-500 shadow-md
            ${
              theme === "light"
                ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
            }`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        {/* User Dropdown */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 font-medium
              ${
                theme === "light"
                  ? "hover:bg-orange-50 text-gray-800"
                  : "hover:bg-[#2b2840] text-white"
              }`}
          >
            <UserIcon size={18} className="text-orange-500" />
            <span className="hidden md:block">
              {user ? `${user.First_Name} ${user.Last_Name}` : "User"}
            </span>
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden z-50
                  ${
                    theme === "light"
                      ? "bg-white text-gray-800"
                      : "bg-[#2b2840] text-white"
                  }`}
              >
                <NavLink
                  to={`/app/profile/${user?.User_Id}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 dark:hover:bg-[#3a3650] transition-colors"
                >
                  <UserIcon size={16} className="text-orange-500" /> Profile
                </NavLink>
                <NavLink
                  to="/app/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 dark:hover:bg-[#3a3650] transition-colors"
                >
                  <SettingsIcon size={16} className="text-orange-500" /> Settings
                </NavLink>
                <NavLink
                  to="/app/logout"
                  className="flex items-center gap-2 px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/40 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
