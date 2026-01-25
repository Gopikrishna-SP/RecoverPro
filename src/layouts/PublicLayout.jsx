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
        background: #ffffff;
        color: #0f172a;
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }

      .public-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        background: #ffffff;
      }

      .public-header {
        background: #ffffff;
        backdrop-filter: blur(10px);
        padding: 16px 32px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .public-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.2s ease;
        flex-shrink: 0;
      }

      .public-logo:hover {
        opacity: 0.8;
      }

      .logo-icon-public {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: white;
        font-weight: 700;
        font-size: 18px;
      }

      .logo-text-public {
        font-weight: 700;
        font-size: 1.1rem;
        color: #0f172a;
        letter-spacing: -0.5px;
      }

      .public-nav {
        display: flex;
        gap: 32px;
        align-items: center;
        flex-shrink: 0;
      }

      .nav-link {
        color: #64748b;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.2s ease;
        position: relative;
      }

      .nav-link:hover {
        color: #2563eb;
      }

      .nav-link.active {
        color: #2563eb;
        font-weight: 600;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #2563eb;
        transition: width 0.2s ease;
      }

      .nav-link.active::after {
        width: 100%;
      }

      .public-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        width: 100%;
      }

      .content-wrapper {
        width: 100%;
        max-width: 420px;
      }

      .public-footer {
        background: #ffffff;
        backdrop-filter: blur(10px);
        padding: 32px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
        color: #94a3b8;
        font-size: 12px;
        flex-shrink: 0;
      }

      .footer-content {
        display: flex;
        justify-content: center;
        gap: 32px;
        margin-bottom: 16px;
      }

      .footer-link {
        color: #64748b;
        text-decoration: none;
        transition: color 0.2s ease;
        font-weight: 500;
      }

      .footer-link:hover {
        color: #2563eb;
      }

      @media (max-width: 768px) {
        .public-header {
          padding: 12px 16px;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .public-nav {
          width: 100%;
          justify-content: flex-start;
          gap: 16px;
        }

        .nav-link {
          font-size: 13px;
        }

        .public-content {
          padding: 40px 16px;
        }

        .content-wrapper {
          max-width: 100%;
        }

        .public-footer {
          padding: 24px 16px;
          font-size: 11px;
        }

        .footer-content {
          flex-direction: column;
          gap: 12px;
        }
      }

      @media (max-width: 480px) {
        .public-header {
          padding: 10px 12px;
        }

        .logo-icon-public {
          width: 36px;
          height: 36px;
          font-size: 16px;
        }

        .public-logo {
          gap: 8px;
          font-size: 16px;
        }

        .public-nav {
          gap: 12px;
        }

        .nav-link {
          font-size: 12px;
        }

        .public-content {
          padding: 30px 12px;
        }

        .public-footer {
          padding: 16px 12px;
        }
      }
      `}</style>

      <div className="public-layout">
        <header className="public-header">
          <div style={{ background: "#ffffff", padding: "3px 6px", borderRadius: "1px" }}>
            <Logo />
          </div>

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
          <p>&copy; 2025 RecoverPro. Internal Employee Application. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}