import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (token && user) {
    // Redirect based on role when already logged in
    const redirectPath = user.role === "Admin" ? "/admin" : "/app";
    return <Navigate to={redirectPath} replace />;
  }
  // Agar login nahi, allow access
  return children;
};

export default GuestRoute;
