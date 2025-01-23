import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const TeamLeaderProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isTeamLeader = token && role === "teamleader";

  return isTeamLeader ? <Outlet /> : <Navigate to="/login" />;
};

export default TeamLeaderProtectedRoute;
