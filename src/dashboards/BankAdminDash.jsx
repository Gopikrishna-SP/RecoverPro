import { useState } from 'react';
import { Users, FileText, TrendingUp, AlertCircle, Plus, Eye } from 'lucide-react';

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

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 12px;
    font-size: 12px;
    font-weight: 600;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    padding: 14px 12px;
    font-size: 14px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.1);
  }

  tr:hover {
    background: rgba(59, 130, 246, 0.05);
  }

  .status-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 12px;
    display: inline-block;
  }

  .status-active {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }

  .status-rejected {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }

  .action-btn {
    background: none;
    border: none;
    color: #60a5fa;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }

  .action-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
  }

  .single-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    max-width: 600px;
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
  }
`;

export default function BankAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const allocations = [
    { id: 'ALL001', vendor: 'Vendor A', amount: '₹50,000', status: 'active', date: '2024-01-10' },
    { id: 'ALL002', vendor: 'Vendor B', amount: '₹75,000', status: 'pending', date: '2024-01-09' },
    { id: 'ALL003', vendor: 'Vendor C', amount: '₹60,000', status: 'active', date: '2024-01-08' },
    { id: 'ALL004', vendor: 'Vendor D', amount: '₹45,000', status: 'rejected', date: '2024-01-07' },
  ];

  const visits = [
    { id: 'VIS001', allocation: 'ALL001', officer: 'Officer A', status: 'completed', date: '2024-01-10' },
    { id: 'VIS002', allocation: 'ALL002', officer: 'Officer B', status: 'pending', date: '2024-01-09' },
    { id: 'VIS003', allocation: 'ALL001', officer: 'Officer C', status: 'completed', date: '2024-01-08' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'active' || status === 'completed') {
      return <span className={`status-badge status-active`}>Active</span>;
    } else if (status === 'pending') {
      return <span className={`status-badge status-pending`}>Pending</span>;
    } else if (status === 'rejected') {
      return <span className={`status-badge status-rejected`}>Rejected</span>;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here’s what’s happening</h1>
          <p>Overview of bank operations, partner entities, and field activity</p>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total Allocations', value: '48', icon: FileText, color: 'blue' },
            { label: 'Active Field Visits', value: '12', icon: Users, color: 'green' },
            { label: 'Pending Reviews', value: '7', icon: AlertCircle, color: 'orange' },
            { label: 'Completion Rate', value: '94%', icon: TrendingUp, color: 'purple' },
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
          {['overview', 'allocations', 'visits'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'allocations' && 'Allocations'}
              {tab === 'visits' && 'Field Visits'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="content-grid">
            <div className="card">
              <h3>Recent Allocations</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocations.slice(0, 3).map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.vendor}</td>
                        <td>{item.amount}</td>
                        <td>{getStatusBadge(item.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>Recent Field Visits</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Officer</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.slice(0, 3).map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.officer}</td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocations' && (
          <div className="card">
            <h3>All Allocations</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.vendor}</td>
                      <td>{item.amount}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>{item.date}</td>
                      <td>
                        <button className="action-btn">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="card">
            <h3>Field Visit Logs</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Allocation</th>
                    <th>Officer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.allocation}</td>
                      <td>{item.officer}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>{item.date}</td>
                      <td>
                        <button className="action-btn">
                          <Eye size={14} /> Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}