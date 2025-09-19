import React from "react";
import Navigation from "../components/Navigation";
import Topbar from "../components/TopBar";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

const Layout = () => {
    const location = useLocation();
    const { theme } = useTheme();
    
    
    const getPageTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Dashboard";
            case "/courses":
                return "Courses";
            case "/find-tutor":
                return "Find Tutor";
            case "/profile":
                return "Profile";
            case "/settings":
                return "Settings";
            default:
                return "";
        }
    };

    return (

        <div className={`flex h-screen ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-[#0e0c1c] text-gray-200"}`}>
            <Navigation />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar pageTitle={getPageTitle()} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>

    );
};

export default Layout;
