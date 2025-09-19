import { Sun, Moon, LogOut, User as UserIcon, Settings as SettingsIcon } from "lucide-react";
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
        ${theme === "light" ? "bg-white text-gray-900" : "bg-[#1a172e] text-white"}`}
    >
      {/* Left: Page Title */}
      <motion.h1
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-lg md:text-xl font-semibold capitalize truncate"
      >
        {pageTitle}
      </motion.h1>

      {/* Right: Theme Toggle + Dropdown */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:rotate-180 transition-transform duration-300
            bg-gray-200 dark:bg-[#2b2840] text-gray-800 dark:text-white"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        {/* User Dropdown */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2b2840] transition-colors duration-300"
          >
            <UserIcon size={18} />
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
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg overflow-hidden z-50
                  ${theme === "light" ? "bg-white text-gray-800" : "bg-[#2b2840] text-white"}`}
              >
                <NavLink
                  to={`/app/profile/${user?.User_Id}`}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-[#3a3650] transition-colors duration-200"
                >
                  <UserIcon size={16} /> Profile
                </NavLink>
                <NavLink
                  to="/app/settings"
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-[#3a3650] transition-colors duration-200"
                >
                  <SettingsIcon size={16} /> Settings
                </NavLink>
                <NavLink
                  to="/app/logout"
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-100 dark:hover:bg-red-600 text-red-500 dark:text-red-400 transition-colors duration-200"
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
