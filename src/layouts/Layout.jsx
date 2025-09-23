import React from "react";
import Navigation from "../components/Navigation";
import Topbar from "../components/Topbar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Layout = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/app" || path === "/app/") return "Dashboard";
    if (path.startsWith("/app/courses")) return "Courses";
    if (path.startsWith("/app/find-jobs")) return "Find Jobs";
    if (path.startsWith("/app/profile")) return "Profile";
    if (path.startsWith("/app/settings")) return "Settings";
    if (path.startsWith("/app/create-student-profile")) return "Create Student Profile";
    return "";
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-900 text-gray-200"
      }`}
    >
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Right Side Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar with Orange Accent */}
        <Topbar pageTitle={getPageTitle()} />

        {/* Main Content Area */}
        <main
          className={`flex-1 p-4 md:p-6 overflow-y-auto transition-colors duration-300 ${
            theme === "light"
              ? "bg-gray-50"
              : "bg-gray-900"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
