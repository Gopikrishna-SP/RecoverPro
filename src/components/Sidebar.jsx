import React, { useState } from 'react';
import { Home, FileText, BarChart3, Settings, ChevronDown, LogOut } from 'lucide-react';

export default function Sidebar({ collapsed, onToggle }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  const handleMenuClick = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  const handleSignOut = () => {
    console.log('Sign out');
  };

  const handleSignOutClick = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      return;
    }
    handleSignOut();
  };

  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      subItems: ['Dashboard', 'Create Account', 'Broadcast']
    },
    {
      icon: FileText,
      label: 'Loans',
      subItems: ['Allocation', 'Assign Case', 'Upload']
    },
    {
      icon: BarChart3,
      label: 'Visits',
      subItems: ['Visit Log', 'Start Visit']
    },
    {
      icon: Settings,
      label: 'Settings',
      subItems: ['Change Password']
    },
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0f172a;
        }

        .sidebar {
          width: 230px;
          background: rgba(15, 23, 42, 0.8);
          border-right: 1px solid #2a3f52;
          padding: 24px 0 0 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          transition: width 220ms ease;
          will-change: width;
          overflow-y: auto;
          box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.05);
        }

        .sidebar.collapsed {
          width: 72px;
          padding-top: 12px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px 32px;
          transition: all 180ms ease;
          cursor: pointer;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        .logo-text {
          transition: opacity 150ms ease;
          font-weight: 700;
          font-size: 1.2rem;
          background: linear-gradient(90deg, #60a5fa 0%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sidebar.collapsed .logo {
          justify-content: center;
          padding: 8px 0 20px;
        }

        .sidebar.collapsed .logo-text {
          opacity: 0;
          display: none;
        }

        .menu-section {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 20px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          color: #8b94a5;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border-left: 3px solid transparent;
          justify-content: space-between;
        }

        .menu-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border-left-color: #22d3ee;
        }

        .menu-item.active {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-left-color: #22d3ee;
        }

        .menu-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .menu-item-icon {
          display: flex;
          align-items: center;
        }

        .chevron-icon {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .menu-item.expanded .chevron-icon {
          transform: rotate(180deg);
        }

        .sidebar.collapsed .menu-item {
          justify-content: center;
          padding: 12px 0;
        }

        .sidebar.collapsed .menu-item-left span {
          display: none;
        }

        .sidebar.collapsed .menu-item .chevron-icon {
          display: none;
        }

        .submenu {
          background: rgba(10, 25, 47, 0.6);
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .submenu.open {
          max-height: 500px;
        }

        .submenu-item {
          padding: 10px 24px 10px 48px;
          color: #6b7a8a;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border-left: 3px solid transparent;
        }

        .submenu-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border-left-color: #22d3ee;
        }

        .sidebar.collapsed .submenu {
          display: none;
        }

        .sidebar-footer {
          padding: 16px 20px 24px 20px;
          border-top: 1px solid #2a3f52;
          margin-top: auto;
        }

        .signout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          width: 100%;
          background: none;
          border: none;
          border-radius: 8px;
          color: #8b94a5;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .signout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .signout-btn svg {
          flex-shrink: 0;
          color: inherit;
        }

        .sidebar.collapsed .sidebar-footer {
          padding: 8px 0;
          border-top: none;
          display: flex;
          justify-content: center;
        }

        .sidebar.collapsed .signout-btn {
          padding: 10px;
          border-radius: 50%;
          width: 44px;
          justify-content: center;
        }

        .sidebar.collapsed .signout-btn span {
          display: none;
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div
          className="logo"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggle();
          }}
        >
          <div className="logo-icon">
            <svg
              viewBox="0 0 229 229"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <clipPath id="shieldClip">
                  <path
                    d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
                c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
                c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
                c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
                c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
                  />
                </clipPath>

                {/* Inset shield clip (prevents bleed) */}
                <clipPath id="shieldClipInset">
                  <path
                    d="M180.4,48.9l-24.5,24.5c14.2,14.2,21.4,31.6,21.4,51.1
            c0,19.9-7.2,37.1-21.4,51.3c-14.2,14.2-31.6,21.4-51.1,21.4
            c-19.9,0-37.1-7.2-51.3-21.4l24.5-24.3
            c-14.2-14.2-21.4-31.6-21.4-51.3s7.2-37.1,21.4-51.3
            c14.2-14.2,31.6-21.4,51.3-21.4c19.7,0,37.1,7.2,51.1,21.4z"
                  />
                </clipPath>


                <clipPath id="diagBlue">
                  <polygon points="0,0 229,0 0,229" />
                </clipPath>

                <clipPath id="diagTeal">
                  <polygon points="229,0 229,229 0,229" />
                </clipPath>
              </defs>

              {/* BLUE HALF */}
              <path
                d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
            c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
            c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
            c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
            c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
                clipPath="url(#diagBlue)"
                fill="#2563EB"
              />

              {/* TEAL HALF */}
              <path
                d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
            c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
            c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
            c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
            c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
                clipPath="url(#diagTeal)"
                fill="#14B8A6"
              />
            </svg>
          </div>
          <span
            className="logo-text"
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              background: 'linear-gradient(90deg, #2563EB 50%, #14B8A6 50%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            RecoverPro
          </span>
        </div>

        <div className="menu-section">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                className={`menu-item ${expandedMenu === index ? 'active expanded' : ''}`}
                onClick={() => handleMenuClick(index)}
              >
                <div className="menu-item-left">
                  <div className="menu-item-icon">
                    <item.icon size={20} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <div className="chevron-icon">
                  <ChevronDown size={16} />
                </div>
              </div>
              <div className={`submenu ${expandedMenu === index ? 'open' : ''}`}>
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="submenu-item">
                    {subItem}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="signout-btn" onClick={handleSignOutClick}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}