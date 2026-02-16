import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminDashboard from "./dashboards/Admin/AdminDashboard";
import AdminSignup from "./dashboards/Admin/AdminSignup";

import EmployeeDashboard from "./dashboards/employee/EmployeeDashboard";
import Products from "./dashboards/Admin/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* ✅ ADD THIS LINE */}
        <Route path="/admin/signup" element={<Signup />} />

        {/* EMPLOYEE */}
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
