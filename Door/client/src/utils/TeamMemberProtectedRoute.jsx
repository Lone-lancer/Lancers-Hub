import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const TeamMemberProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isTeamMember = token && role === "teammember";

  return isTeamMember ? <Outlet /> : <Navigate to="/login" />;
};

export default TeamMemberProtectedRoute;
