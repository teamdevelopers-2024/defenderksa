import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  // Check if the user is authenticated (e.g., by checking a token in localStorage)
  const isAuthenticated = !!localStorage.getItem("DefenderauthToken");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child component (e.g., AdminDashboard)
  return children;
};

export default AuthGuard;
