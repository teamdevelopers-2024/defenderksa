import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/Dashboard";
import Login from "../components/AdminLogin/Login";
import AuthGuard from "./AuthGuard";
import NotFound from "../components/NotFound/NotFound";

function AdminLayoutRoutes() {
  return (
    <Routes>
      {/* Protected Route for Dashboard */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        }
      />
      {/* Public Route for Login */}
      <Route path="/login" element={<Login />} />
      {/* Catch-All Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminLayoutRoutes;
