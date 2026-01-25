import React, { useState, useEffect } from 'react';
import { Home, FileText, BarChart3, Settings, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ collapsed, onToggle }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  // Extract roles from JWT token
  const decodeTokenAndSetRoles = () => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      try {
        // Decode JWT
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const decoded = JSON.parse(jsonPayload);
        console.log('Decoded Token:', decoded);
        console.log('User Roles:', decoded.roles);
        
        // Set roles from token
        if (decoded.roles && Array.isArray(decoded.roles)) {
          setUserRoles(decoded.roles);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  // Run on mount and when token changes
  useEffect(() => {
    decodeTokenAndSetRoles();

    // Listen for storage changes (when user logs in from another tab)
    const handleStorageChange = () => {
      console.log('Token changed, updating sidebar...');
      decodeTokenAndSetRoles();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for token changes every 500ms
    const interval = setInterval(() => {
      decodeTokenAndSetRoles();
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Check if user has required role
  const hasRole = (requiredRoles) => {
    if (!requiredRoles) return true;
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }
    return requiredRoles.some(role => userRoles.includes(role));
  };

  // Filter submenu items based on user roles
  const getFilteredSubItems = (subItems) => {
    return subItems.filter(item => {
      if (!item.requiredRoles) return true;
      return hasRole(item.requiredRoles);
    });
  };

  const handleMenuClick = (index, defaultPath) => {
    setExpandedMenu(expandedMenu === index ? null : index);
    if (defaultPath) {
      navigate(defaultPath);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleSignOutClick = () => {
    if (collapsed) {
      onToggle();
      return;
    }
    handleSignOut();
  };

  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      defaultPath: '/dashboard',
      requiredRoles: null,
      subItems: [
        { 
          label: 'Dashboard', 
          path: '/dashboard',
          requiredRoles: null
        },
        { 
          label: 'Create Account', 
          path: '/dashboard/create-account',
          requiredRoles: ['ROLE_SUPER_ADMIN']
        },
        { 
          label: 'Broadcast', 
          path: '/dashboard/broadcast',
          requiredRoles: ['ROLE_SUPER_ADMIN', 'ROLE_BANK_ADMIN']
        }
      ]
    },
    {
      icon: FileText,
      label: 'Loans',
      defaultPath: '/loans/allocation',
      requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN'],
      subItems: [
        { 
          label: 'Allocation', 
          path: '/loans/allocation',
          requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN']
        },
        { 
          label: 'Assign Case', 
          path: '/loans/assign',
          requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN']
        },
        { 
          label: 'Upload', 
          path: '/loans/upload',
          requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN']
        }
      ]
    },
    {
      icon: BarChart3,
      label: 'Visits',
      defaultPath: '/visits/log',
      requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN', 'ROLE_FO'],
      subItems: [
        { 
          label: 'Visit Log', 
          path: '/visits/log',
          requiredRoles: ['ROLE_BANK_ADMIN', 'ROLE_VENDOR_ADMIN']
        },
        { 
          label: 'My Visit', 
          path: '/visits/my-visit',
          requiredRoles: ['ROLE_FO', 'ROLE_VENDOR_ADMIN']
        }
      ]
    },
    {
      icon: Settings,
      label: 'Settings',
      defaultPath: '/settings/password',
      requiredRoles: null,
      subItems: [
        { 
          label: 'Change Password', 
          path: '/settings/password',
          requiredRoles: null
        }
      ]
    }
  ];

  // Filter menu items based on roles
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.requiredRoles) return true;
    return hasRole(item.requiredRoles);
  });

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
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
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
          box-shadow: none;
          z-index: 1000;
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
          background-color: #00A550;
          color: #fff;
          flex-shrink: 0;
        }

        .logo-text {
          transition: opacity 150ms ease;
          font-weight: 700;
          font-size: 1.2rem;
          background-color: #334155;
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
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border-left: 3px solid transparent;
          justify-content: space-between;
        }

        .menu-item:hover {
          background-color: #f1f5f9;
          color: #2563eb;
          border-left-color: #2563eb;
        }

        .menu-item.active {
          background-color: #eff6ff;
          color: #2563eb;
          border-left-color: #2563eb;
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
          background: #f8fafc;
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
          color: #64748b;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border-left: 3px solid transparent;
        }

        .submenu-item:hover {
          background: #e0f2fe;
          color: #2563eb;
          border-left-color: #2563eb;
        }

        .sidebar.collapsed .submenu {
          display: none;
        }

        .sidebar-footer {
          padding: 16px 20px 24px 20px;
          border-top: 1px solid #e5e7eb;
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
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .signout-btn:hover {
          color: #dc2626;
          background: #fee2e2;
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
          background: rgba(148,163,184,0.4);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(148,163,184,0.6);
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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 229 229"
              width="16"
              height="16"
              shape-rendering="geometricPrecision"
            >
              <path
                d="M183.4,45.9l-26.5,26.5c15.4,15.3,23.2,33.8,23.2,55.5
         c0,21.7-7.7,40.2-23.2,55.5c-15.3,15.3-33.8,23-55.3,23
         c-21.7,0-40.2-7.7-55.5-23l26.5-26.3
         c-15.3-15.3-23-33.8-23-55.5s7.7-40.2,23-55.6
         c15.3-15.3,33.8-23,55.5-23c21.6,0,40.1,7.7,55.5,23z"
                fill="#FFFFFF"
              />

              <line
                x1="40"
                y1="189"
                x2="189"
                y2="40"
                stroke="#FFFFFF"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className="logo-text"
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#334155",
            }}
          >
            RecoverPro
          </span>
        </div>

        <div className="menu-section">
          {filteredMenuItems.map((item, index) => {
            const filteredSubItems = getFilteredSubItems(item.subItems);
            return (
              <div key={index}>
                <div
                  className={`menu-item ${expandedMenu === index ? 'active expanded' : ''}`}
                  onClick={() => handleMenuClick(index, item.defaultPath)}
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
                  {filteredSubItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="submenu-item"
                      onClick={() => navigate(subItem.path)}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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