import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AdminLayoutRoutes from "./AdminLayoutRoutes";
import NotFound from "../components/NotFound/NotFound";  // Make sure you import the NotFound component

function LayoutRoutes() {
  return (
    <Router>
      <Routes>
        {/* User Side Routes */}
        <Route path="/" element={<MainPage />} />   
        {/* <Route path="/all-products" element={<AllProductsList />} /> */}

        {/* Admin Side Routes */}
        <Route path="/admin/*" element={<AdminLayoutRoutes />} />
        
        {/* Catch-All Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LayoutRoutes;
