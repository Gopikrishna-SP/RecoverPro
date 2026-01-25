import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/Searchbar';
import ProfileDropdown from '../components/Profile';
import NotificationDisplay from '../components/NotificationDisplay';

export default function DashboardLayout({ children, pageTitle = 'Dashboard' }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
        background: #f8fafc;
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
        background: #f1f5f9;
      }

      .dashboard-layout.notifications-open {
        filter: blur(5px);
        transition: filter 0.2s ease;
        pointer-events: none;
      }

      .dashboard-layout.blurred {
        filter: blur(6px);
        transition: filter 0.25s ease;
        pointer-events: none;
        user-select: none;
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
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e8f0;
        width: 100%;
        flex-shrink: 0;
        position: relative;
        z-index: 50;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      .topbar-left {
        display: flex;
        align-items: center;
        gap: 24px;
        flex: 0 1 auto;
        min-width: 0;
      }

      .search-wrapper-topbar {
        flex: 0 1 400px;
        min-width: 200px;
      }

      .page-title {
        font-size: 18px;
        font-weight: 600;
        color: #0f172a;
        min-width: fit-content;
        white-space: nowrap;
      }

      .topbar-right {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: auto;
        position: relative;
        flex-shrink: 0;
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
        transition: all 0.2s ease;
        position: relative;
        color: #475569;
        flex-shrink: 0;
      }

      .icon-btn:hover {
        background: #f1f5f9;
        color: #0f172a;
      }

      .content-area {
        flex: 1;
        padding: 24px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: #f8fafc;
        position: relative;
        z-index: 1;
      }

      .content-area::-webkit-scrollbar {
        width: 8px;
      }

      .content-area::-webkit-scrollbar-track {
        background: transparent;
      }

      .content-area::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }

      .content-area::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }

      @media (max-width: 1024px) {
        .topbar {
          padding: 12px 20px;
        }

        .topbar-left {
          gap: 16px;
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
          gap: 12px;
        }

        .topbar-left {
          flex: 0 0 100%;
          gap: 12px;
          margin-bottom: 4px;
        }

        .search-wrapper-topbar {
          flex: 1;
          min-width: 0;
        }

        .page-title {
          font-size: 16px;
        }

        .topbar-right {
          flex: 0 0 auto;
          gap: 12px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
        }

        .content-area {
          padding: 16px;
        }
      }

      @media (max-width: 480px) {
        .topbar {
          padding: 10px 12px;
        }

        .page-title {
          font-size: 14px;
        }

        .content-area {
          padding: 12px;
        }
      }
      `}</style>

      <div className={`dashboard-layout ${notificationsOpen ? 'notifications-open' : ''}`}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)} />
        <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="topbar">
            <div className="topbar-left">
              <div className="search-wrapper-topbar">
                {showSearch && <SearchBar />}
              </div>
            </div>

            <div className="topbar-right">
              <NotificationDisplay
                onOpen={() => setNotificationsOpen(true)}
                onClose={() => setNotificationsOpen(false)}
              />
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