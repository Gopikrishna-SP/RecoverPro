import { useState } from 'react';
import { Users, Briefcase, CheckCircle, AlertCircle, Plus, Eye, Edit } from 'lucide-react';

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

  .status-inactive {
    background: rgba(107, 114, 128, 0.2);
    color: #d1d5db;
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
    margin-right: 8px;
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
    max-width: 700px;
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

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
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

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background: rgba(15, 23, 42, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(71, 85, 105, 0.2);
  }

  .info-item label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 4px;
  }

  .info-item span {
    font-size: 14px;
    color: #e2e8f0;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .content-grid {
      grid-template-columns: 1fr;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .info-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function VendorAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const fieldOfficers = [
    { id: 'FO001', name: 'John Smith', email: 'john@example.com', status: 'active', cases: 8, date: '2024-01-05' },
    { id: 'FO002', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', cases: 12, date: '2024-01-04' },
    { id: 'FO003', name: 'Mike Davis', email: 'mike@example.com', status: 'inactive', cases: 5, date: '2024-01-03' },
    { id: 'FO004', name: 'Emma Wilson', email: 'emma@example.com', status: 'active', cases: 10, date: '2024-01-02' },
  ];

  const allocations = [
    { id: 'ALL001', bank: 'Bank A', amount: '₹50,000', status: 'active', officer: 'John Smith', date: '2024-01-10' },
    { id: 'ALL002', bank: 'Bank B', amount: '₹75,000', status: 'pending', officer: 'Sarah Johnson', date: '2024-01-09' },
    { id: 'ALL003', bank: 'Bank A', amount: '₹60,000', status: 'active', officer: 'Emma Wilson', date: '2024-01-08' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className={`status-badge status-active`}>Active</span>;
    } else if (status === 'pending') {
      return <span className={`status-badge status-pending`}>Pending</span>;
    } else if (status === 'inactive') {
      return <span className={`status-badge status-inactive`}>Inactive</span>;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here’s what’s happening</h1>
          <p>Oversee field officers, allocations, and case assignments</p>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total Field Officers', value: '24', icon: Users, color: 'blue' },
            { label: 'Active Allocations', value: '18', icon: Briefcase, color: 'green' },
            { label: 'Total Cases', value: '156', icon: CheckCircle, color: 'purple' },
            { label: 'Pending Reviews', value: '5', icon: AlertCircle, color: 'orange' },
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
          {['overview', 'officers', 'allocations'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'officers' && 'Field Officers'}
              {tab === 'allocations' && 'Allocations'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="content-grid">
            <div className="card">
              <h3>Field Officers</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Cases</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldOfficers.slice(0, 3).map((officer) => (
                      <tr key={officer.id}>
                        <td>{officer.name}</td>
                        <td>{officer.cases}</td>
                        <td>{getStatusBadge(officer.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>Recent Allocations</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Bank</th>
                      <th>Status</th>
                      <th>Officer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocations.slice(0, 3).map((alloc) => (
                      <tr key={alloc.id}>
                        <td>{alloc.id}</td>
                        <td>{alloc.bank}</td>
                        <td>{getStatusBadge(alloc.status)}</td>
                        <td>{alloc.officer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'officers' && (
          <div className="card">
            <h3>Field Officers Management</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Cases</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldOfficers.map((officer) => (
                    <tr key={officer.id}>
                      <td>{officer.id}</td>
                      <td>{officer.name}</td>
                      <td>{officer.email}</td>
                      <td>{officer.cases}</td>
                      <td>{getStatusBadge(officer.status)}</td>
                      <td>
                        <button className="action-btn">
                          <Eye size={14} /> View
                        </button>
                        <button className="action-btn">
                          <Edit size={14} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'allocations' && (
          <div className="card">
            <h3>Allocation Management</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bank</th>
                    <th>Amount</th>
                    <th>Officer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((alloc) => (
                    <tr key={alloc.id}>
                      <td>{alloc.id}</td>
                      <td>{alloc.bank}</td>
                      <td>{alloc.amount}</td>
                      <td>{alloc.officer}</td>
                      <td>{getStatusBadge(alloc.status)}</td>
                      <td>{alloc.date}</td>
                      <td>
                        <button className="action-btn">
                          <Eye size={14} /> View
                        </button>
                        <button className="action-btn">
                          <Edit size={14} /> Edit
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