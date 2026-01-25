import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error Response:', errorData);
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data = await response.json();
      console.log('Success Response:', data);
      const { token, username, email: userEmail, id, roles } = data;

      // Store token and user info
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id,
        username,
        email: userEmail,
        roles,
      }));

      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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
          background: var(--surface);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
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
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .signin-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 400;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: #var(--text-secondary);
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
          color: var(--text-muted);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 11px 12px 11px 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          font-size: 14px;
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: var(--surface);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          margin-top: 12px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 24px;
          margin-top: 12px;
        }

        .forgot-password {
          font-size: 13px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }



        .alert {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          border: 1px solid;
        }

        .alert-danger {
          background: rgba(220, 38, 38, 0.1) /* keep as-is OR later make var */;
          color: #fca5a5 /* keep for now */;
          border-color: #7f1d1d;
        }

        .signin-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #00A550 0%, #00A550 100%);
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
          color: var(--border);
          font-size: 12px;
        }

        .signin-divider::before,
        .signin-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .signin-divider span {
          padding: 0 12px;
        }

        .signin-footer {
          text-align: center;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .signin-footer a {
          color: var(--primary);
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
            font-size: 22px;
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
              <Mail size={14} className="form-input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-wrapper">
              <Lock size={14} className="form-input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-actions">
            <a href="#forgot" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
              Forgot password?
            </a>
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