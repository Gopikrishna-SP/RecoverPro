import { useState } from 'react';
import { Users, FileText, TrendingUp, AlertCircle, Eye } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f8fafc;
    min-height: 100vh;
    color: #334155;
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
    color: #0f172a;
    margin-bottom: 8px;
  }

  .header p {
    font-size: 14px;
    color: #64748b;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .stat-card {
    background-color: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    border-color: #2563eb;
    background: #f1f5f9;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
  }

  .stat-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .stat-info p:first-child {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-info p:last-child {
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
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
    background: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 6px;
    width: fit-content;
    margin-bottom: 32px;
  }

  .tab-btn {
    padding: 10px 24px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tab-btn.active {
    background-color: #2563eb;
    color: white;
  }

  .tab-btn:hover:not(.active) {
    color: #0f172a;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .card {
    background: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
  }

  .card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 16px;
  }

  .table-container {
    overflow-x: auto;
    border-radius: 8px;
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
    color: #64748b;
    border-bottom: 1px solid #e5e7eb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background-color: #f8fafc;
  }

  td {
    padding: 14px 12px;
    font-size: 14px;
    color: #334155;
    border-bottom: 1px solid #e5e7eb;
  }

  tr:hover {
    background: #f8fafc;
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
    color: #059669;
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.2);
    color: #d97706;
  }

  .status-rejected {
    background: rgba(239, 68, 68, 0.2);
    color: #dc2626;
  }

  .action-btn {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
  }

  .action-btn:hover {
    background: rgba(37, 99, 235, 0.1);
    color: #1d4ed8;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .container {
      padding: 16px;
    }
    .header h1 {
      font-size: 28px;
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
      return <span className="status-badge status-active">Active</span>;
    } else if (status === 'pending') {
      return <span className="status-badge status-pending">Pending</span>;
    } else if (status === 'rejected') {
      return <span className="status-badge status-rejected">Rejected</span>;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here's what's happening</h1>
          <p>Overview of bank operations, partner entities, and field activity</p>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total Allocations', value: '48', icon: FileText, color: 'blue' },
            { label: 'Active Field Visits', value: '12', icon: Users, color: 'green' },
            { label: 'Pending Reviews', value: '7', icon: AlertCircle, color: 'orange' },
            { label: 'Completion Rate', value: '94%', icon: TrendingUp, color: 'purple' },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
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