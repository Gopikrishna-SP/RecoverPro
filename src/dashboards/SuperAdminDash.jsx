import { useState } from 'react';
import { Users, Building2, Landmark, Bell, BarChart3, Plus } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
    min-height: 100vh;
    color: #e2e8f0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px;
  }

  .header {
    margin-bottom: 40px;
  }

  .header h1 {
    font-size: 36px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .header p {
    font-size: 14px;
    color: #94a3b8;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .stat-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .stat-info p:first-child {
    font-size: 12px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-info p:last-child {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
  }

  .stat-icon.blue {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  }

  .stat-icon.green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .stat-icon.purple {
    background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
  }

  .stat-icon.orange {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(30, 41, 59, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 10px;
    padding: 6px;
    width: fit-content;
    margin-bottom: 32px;
  }

  .tab-btn {
    padding: 10px 24px;
    border: none;
    background: transparent;
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .tab-btn:hover:not(.active) {
    color: #ffffff;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
  }

  .card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .item:hover {
    border-color: rgba(71, 85, 105, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }

  .item-label {
    color: #cbd5e1;
    font-size: 14px;
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    padding: 4px 12px;
    border-radius: 12px;
  }

  .setup-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .setup-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .setup-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .setup-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 6px;
    transition: color 0.3s ease;
  }

  .setup-card:hover .setup-content h4 {
    color: #60a5fa;
  }

  .setup-content p {
    font-size: 12px;
    color: #94a3b8;
  }

  .setup-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .setup-card:hover .setup-icon {
    transform: scale(1.1);
  }

  .notification-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 32px;
    max-width: 600px;
  }

  .notification-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .notification-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .notification-header h2 {
    font-size: 22px;
    font-weight: 600;
    color: #ffffff;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px 16px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #64748b;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.9);
  }

  .form-group textarea {
    resize: none;
    font-family: inherit;
  }

  .submit-btn {
    width: 100%;
    padding: 12px 24px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 8px;
  }

  .submit-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .content-grid {
      grid-template-columns: 1fr;
    }
    .setup-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here’s what’s happening</h1>
          <p>Operational overview of vendors, banks, and system users</p>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total Vendors', value: '12', icon: Building2, color: 'blue' },
            { label: 'Total Banks', value: '8', icon: Landmark, color: 'green' },
            { label: 'Total Field Executives', value: '156', icon: Users, color: 'purple' },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <p>{stat.label}</p>
                  <p>{stat.value}</p>
                </div>
                <div className={`stat-icon ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tabs">
          {['overview', 'setup', 'notifications'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'setup' && 'Setup Entity'}
              {tab === 'notifications' && 'Notifications'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="content-grid">
            <div className="card">
              <h3>Active Vendors</h3>
              <div className="item-list">
                {['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'].map((v, i) => (
                  <div key={i} className="item">
                    <span className="item-label">{v}</span>
                    <span className="badge">Active</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Active Banks</h3>
              <div className="item-list">
                {['Bank 1', 'Bank 2', 'Bank 3', 'Bank 4'].map((b, i) => (
                  <div key={i} className="item">
                    <span className="item-label">{b}</span>
                    <span className="badge">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'setup' && (
          <div className="setup-grid">
            {[
              { title: 'Create Vendor', desc: 'Register and setup new vendor', icon: Building2 },
              { title: 'Create Bank', desc: 'Add new bank to system', icon: Landmark },
              { title: 'Add Vendor Admin', desc: 'Create vendor administrator', icon: Users },
              { title: 'Add Bank Admin', desc: 'Create bank administrator', icon: Users },
              { title: 'Create FOS', desc: 'Register field officer supervisor', icon: Users },
            ].map((item, i) => (
              <div key={i} className="setup-card">
                <div className="setup-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="setup-icon">
                  <Plus size={20} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notification-card">
            <div className="notification-header">
              <div className="notification-icon">
                <Bell size={20} />
              </div>
              <h2>Broadcast Notifications</h2>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Notification title" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="Broadcast message to all users"></textarea>
            </div>

            <div className="form-group">
              <label>Target Role</label>
              <select>
                <option>All Users</option>
                <option>Vendors</option>
                <option>Banks</option>
                <option>Field Officers</option>
              </select>
            </div>

            <button className="submit-btn">Send Notification</button>
          </div>
        )}
      </div>
    </>
  );
}