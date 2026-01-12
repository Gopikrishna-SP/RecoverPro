import React from 'react';
import Logo from '../components/Logo.jsx';  

export default function PublicLayout({ children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          font-family: 'Inter', sans-serif;
          background: #0f1419;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          color: #e5e7eb;
        }

        .public-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #0f1419 0%, #1a202c 100%);
        }

        .public-header {
          background: rgba(15, 20, 25, 0.95);
          backdrop-filter: blur(10px);
          padding: 16px 32px;
          border-bottom: 1px solid #2d3748;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .public-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .public-logo:hover {
          opacity: 0.8;
        }

        .logo-icon-public {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #2563EB 0%, #1e40af 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-text-public {
          font-weight: 700;
          font-size: 1.2rem;
          background: linear-gradient(90deg, #2563EB 50%, #14B8A6 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .public-nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          color: #a0aec0;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #2563EB;
        }

        .nav-link.active {
          color: #2563EB;
        }

        .public-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          width: 100%;
        }

        .content-wrapper {
          width: 100%;
          max-width: 420px;
        }

        .public-footer {
          background: rgba(15, 20, 25, 0.95);
          backdrop-filter: blur(10px);
          padding: 24px 32px;
          border-top: 1px solid #2d3748;
          text-align: center;
          color: #718096;
          font-size: 12px;
        }

        .footer-content {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 16px;
        }

        .footer-link {
          color: #718096;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #2563EB;
        }

        @media (max-width: 768px) {
          .public-header {
            padding: 12px 16px;
            flex-direction: column;
            gap: 16px;
          }

          .public-nav {
            gap: 16px;
            width: 100%;
            justify-content: center;
          }

          .nav-link {
            font-size: 13px;
          }

          .public-content {
            padding: 30px 16px;
          }

          .content-wrapper {
            max-width: 100%;
          }

          .public-footer {
            padding: 16px;
            font-size: 11px;
          }

          .footer-content {
            gap: 16px;
          }
        }
      `}</style>

      <div className="public-layout">
        <header className="public-header">
          <Logo />

          <nav className="public-nav">
            <a href="/" className="nav-link active">Sign In</a>
            <a href="#support" className="nav-link">Support</a>
            <a href="#docs" className="nav-link">Documentation</a>
          </nav>
        </header>

        <main className="public-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>

        <footer className="public-footer">
          <div className="footer-content">
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#security" className="footer-link">Security</a>
          </div>
          <p>&copy; 2024 RecoverPro. Internal Employee Application. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}