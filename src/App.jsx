import { Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./pages/SigninPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <SigninPage />
          </PublicLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <DashboardLayout pageTitle="Dashboard">
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}