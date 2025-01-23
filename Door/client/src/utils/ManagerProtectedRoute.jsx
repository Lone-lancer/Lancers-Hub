import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const ManagerProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = token && role === "manager";

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ManagerProtectedRoute;
