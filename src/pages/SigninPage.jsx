import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .signin-container {
          width: 100%;
          max-width: 420px;
          background: rgba(30, 40, 50, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid #2d3748;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .signin-header {
          margin-bottom: 32px;
        }

        .signin-title {
          font-size: 28px;
          font-weight: 700;
          color: #e5e7eb;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .signin-subtitle {
          font-size: 14px;
          color: #a0aec0;
          font-weight: 400;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e0;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input-icon {
          position: absolute;
          left: 12px;
          color: #718096;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 11px 12px 11px 40px;
          border-radius: 8px;
          border: 1px solid #4a5568;
          background: rgba(55, 65, 81, 0.4);
          font-size: 14px;
          color: #e5e7eb;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input::placeholder {
          color: #718096;
        }

        .form-input:focus {
          outline: none;
          border-color: #2563EB;
          background: rgba(55, 65, 81, 0.6);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          margin-top: 12px;
        }

        .forgot-password {
          text-align: right;
        }

        .forgot-password a {
          font-size: 12px;
          color: #2563EB;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .forgot-password a:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remember-me input {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #2563EB;
        }

        .remember-me label {
          font-size: 12px;
          color: #a0aec0;
          cursor: pointer;
          margin: 0;
        }

        .alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          border: 1px solid;
        }

        .alert-danger {
          background: rgba(220, 38, 38, 0.1);
          color: #fca5a5;
          border-color: #7f1d1d;
        }

        .signin-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #2563EB 0%, #1e40af 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          letter-spacing: 0.3px;
        }

        .signin-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
        }

        .signin-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .signin-divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: #4a5568;
          font-size: 12px;
        }

        .signin-divider::before,
        .signin-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #4a5568;
        }

        .signin-divider span {
          padding: 0 12px;
        }

        .signin-footer {
          text-align: center;
          color: #a0aec0;
          font-size: 12px;
        }

        .signin-footer a {
          color: #2563EB;
          text-decoration: none;
          font-weight: 600;
        }

        .signin-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .signin-container {
            padding: 28px;
            border-radius: 10px;
          }

          .signin-title {
            font-size: 24px;
          }

          .form-input {
            padding: 10px 12px 10px 36px;
            font-size: 13px;
          }

          .signin-btn {
            padding: 11px 14px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="signin-container">
        <div className="signin-header">
          <h1 className="signin-title">Welcome Back</h1>
          <p className="signin-subtitle">Sign in to access your recovery workspace</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Work Email</label>
            <div className="form-input-wrapper">
              <Mail size={18} className="form-input-icon" />
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-wrapper">
              <Lock size={18} className="form-input-icon" />
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot-password">
              <a href="#reset">Reset password?</a>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signin-divider">
          <span>Need access?</span>
        </div>

        <div className="signin-footer">
          Contact your <a href="#admin">administrator</a> to request access
        </div>
      </div>
    </>
  );
}