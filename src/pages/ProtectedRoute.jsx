import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/UI/Loader";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (!user) return <Loader />;

  console.log("User from Redux:", user);
  console.log("User Role:", user.role);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/app" replace />; // agar role match nahi karta
  }

  return <Outlet />; // agar role match karta
};

export default ProtectedRoute;
