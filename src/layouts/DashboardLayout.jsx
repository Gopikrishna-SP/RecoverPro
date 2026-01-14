import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/Searchbar';
import ProfileDropdown from '../components/Profile';
import NotificationDisplay from '../components/NotificationDisplay';

export default function DashboardLayout({ children, pageTitle = 'Dashboard' }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const location = useLocation();
  const showSearch = location.pathname === '/dashboard';


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
        }

        .main-content {
          flex: 1;
          margin-left: 230px;
          width: calc(100% - 230px);
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 220ms ease;
        }

        .main-content.collapsed {
          margin-left: 72px;
          width: calc(100% - 72px);
        }

        .topbar {
          background: rgba(15, 23, 42, 0.8);
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(71, 85, 105, 0.2);
          width: 100%;
          flex-shrink: 0;
          position: relative;
          z-index: 50;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
          min-width: 0;
          width: 100%;
        }

        .search-wrapper-topbar {
          flex: 1;
          min-width: 200px;
          max-width: 500px;
        }

        .page-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a202c;
          min-width: fit-content;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-left: auto;
          position: relative;
        }

        .icon-btn {
          background: none;
          border: none;
          box-shadow: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          color: #718096;
        }


        .content-area {
          flex: 1;
          padding: 24px;
          width: 100%;
          overflow-y: auto;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .topbar {
            padding: 12px 20px;
          }

          .search-wrapper-topbar {
            flex: 0 1 300px;
          }

          .content-area {
            padding: 18px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            width: 100%;
          }

          .main-content.collapsed {
            margin-left: 0;
            width: 100%;
          }

          .topbar {
            padding: 12px 16px;
            flex-wrap: wrap;
          }

          .topbar-left {
            flex: 0 0 100%;
            gap: 12px;
            margin-bottom: 8px;
          }

          .search-wrapper-topbar {
            flex: 1;
          }

          .page-title {
            font-size: 18px;
          }

          .topbar-right {
            gap: 12px;
          }

          .content-area {
            padding: 16px;
          }
        }
      `}</style>

      <div className="dashboard-layout">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(prev => !prev)}
        />

        <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="topbar">
            <div className="topbar-left">
              <div className="search-wrapper-topbar">
                {showSearch && <SearchBar />}
              </div>
            </div>

            <div className="topbar-right">
              <NotificationDisplay />
              <ProfileDropdown />
            </div>
          </div>

          <div className="content-area">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}