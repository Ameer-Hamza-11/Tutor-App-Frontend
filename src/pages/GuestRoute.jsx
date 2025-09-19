import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Agar login hai, redirect to /app
    return <Navigate to="/app" replace />;
  }
  // Agar login nahi, allow access
  return children;
};

export default GuestRoute;
