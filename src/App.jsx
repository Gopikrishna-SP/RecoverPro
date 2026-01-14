import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SigninPage from './pages/SigninPage';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';

import Dashboard from './pages/Dashboard';
import SuperAdminDash from './dashboards/SuperAdminDash';
import VisitLog from './pages/VisitLog';
import Allocation from './pages/Allocation';
import CaseAssign from './pages/CaseAssign';
import AllocationUpload from './pages/AllocationUpload';

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <SigninPage />
          </PublicLayout>
        }
      />

      {/* DASHBOARD LAYOUT ROUTES */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create-account" element={<SuperAdminDash defaultTab="setup" />} />
        <Route path="/dashboard/broadcast" element={<SuperAdminDash defaultTab="notifications" />} />

        {/* LOANS ROUTES */}
        <Route path="/loans/allocation" element={<Allocation />} />
        <Route path="/loans/assign" element={<CaseAssign />} />
        <Route path="/loans/upload" element={<AllocationUpload />} />

        {/* VISITS ROUTES */}
        <Route path="/visits/log" element={<VisitLog />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}