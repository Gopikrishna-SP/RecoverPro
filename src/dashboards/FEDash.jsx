import { useState } from 'react';
import { MapPin, FileText, CheckCircle, Clock, Camera, Phone, Navigation, Eye } from 'lucide-react';

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
    grid-template-columns: 1fr;
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

  .case-item {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .case-item:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }

  .case-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .case-title {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
  }

  .case-id {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .status-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 12px;
    display: inline-block;
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }

  .status-inprogress {
    background: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
  }

  .status-completed {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
  }

  .case-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(71, 85, 105, 0.1);
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .detail-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    flex-shrink: 0;
  }

  .detail-content label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
  }

  .detail-content span {
    font-size: 14px;
    color: #e2e8f0;
  }

  .case-address {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    gap: 12px;
  }

  .case-address-icon {
    color: #60a5fa;
    flex-shrink: 0;
  }

  .address-text {
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.5;
  }

  .case-actions {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .action-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .action-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  .action-secondary {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .action-secondary:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
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

  .view-btn {
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

  .view-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .case-details {
      grid-template-columns: 1fr;
    }
  }
`;

export default function FieldExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState('cases');

  const cases = [
    {
      id: 'CASE001',
      loanNumber: 'LN-2024-001',
      borrower: 'Rajesh Kumar',
      loanAmount: '₹5,00,000',
      status: 'pending',
      address: '123 Main Street, Bengaluru, Karnataka 560001',
      phone: '+91 98765 43210',
      coordinates: '12.9716° N, 77.5946° E'
    },
    {
      id: 'CASE002',
      loanNumber: 'LN-2024-002',
      borrower: 'Priya Sharma',
      loanAmount: '₹3,50,000',
      status: 'inprogress',
      address: '456 Oak Lane, Mysuru, Karnataka 570001',
      phone: '+91 87654 32109',
      coordinates: '12.2958° N, 76.6394° E'
    },
    {
      id: 'CASE003',
      loanNumber: 'LN-2024-003',
      borrower: 'Amit Singh',
      loanAmount: '₹7,50,000',
      status: 'completed',
      address: '789 Elm Road, Pune, Maharashtra 411001',
      phone: '+91 76543 21098',
      coordinates: '18.5204° N, 73.8567° E'
    },
    {
      id: 'CASE004',
      loanNumber: 'LN-2024-004',
      borrower: 'Neha Gupta',
      loanAmount: '₹4,25,000',
      status: 'pending',
      address: '321 Pine Street, Chennai, Tamil Nadu 600001',
      phone: '+91 65432 10987',
      coordinates: '13.0827° N, 80.2707° E'
    }
  ];

  const addresses = [
    { id: 1, loanNumber: 'LN-2024-001', location: '123 Main Street, Bengaluru', status: 'verified', lastVisit: '2024-01-10' },
    { id: 2, loanNumber: 'LN-2024-002', location: '456 Oak Lane, Mysuru', status: 'pending', lastVisit: 'Not visited' },
    { id: 3, loanNumber: 'LN-2024-003', location: '789 Elm Road, Pune', status: 'verified', lastVisit: '2024-01-08' },
    { id: 4, loanNumber: 'LN-2024-004', location: '321 Pine Street, Chennai', status: 'rejected', lastVisit: '2024-01-06' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className={`status-badge status-completed`}>Completed</span>;
    } else if (status === 'inprogress') {
      return <span className={`status-badge status-inprogress`}>In Progress</span>;
    } else if (status === 'pending') {
      return <span className={`status-badge status-pending`}>Pending</span>;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here’s what’s happening</h1>
          <p>Manage assigned cases, schedule and track field visits, and access location details.</p>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total Cases', value: '18', icon: FileText, color: 'blue' },
            { label: 'Completed Visits', value: '12', icon: CheckCircle, color: 'green' },
            { label: 'Pending Cases', value: '4', icon: Clock, color: 'orange' },
            { label: 'In Progress', value: '2', icon: Navigation, color: 'purple' },
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
          {['cases', 'addresses'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'cases' && 'Assigned Cases'}
              {tab === 'addresses' && 'Addresses to Visit'}
            </button>
          ))}
        </div>

        {activeTab === 'cases' && (
          <div className="content-grid">
            <div>
              {cases.map((caseItem) => (
                <div key={caseItem.id} className="case-item">
                  <div className="case-header">
                    <div>
                      <div className="case-title">{caseItem.borrower}</div>
                      <div className="case-id">Case ID: {caseItem.id} | Loan: {caseItem.loanNumber}</div>
                    </div>
                    {getStatusBadge(caseItem.status)}
                  </div>

                  <div className="case-details">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <FileText size={16} />
                      </div>
                      <div className="detail-content">
                        <label>Loan Amount</label>
                        <span>{caseItem.loanAmount}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Phone size={16} />
                      </div>
                      <div className="detail-content">
                        <label>Contact</label>
                        <span>{caseItem.phone}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Navigation size={16} />
                      </div>
                      <div className="detail-content">
                        <label>Coordinates</label>
                        <span>{caseItem.coordinates}</span>
                      </div>
                    </div>
                  </div>

                  <div className="case-address">
                    <MapPin size={16} className="case-address-icon" />
                    <div className="address-text">{caseItem.address}</div>
                  </div>

                  <div className="case-actions">
                    <button className="action-btn action-primary">
                      <Camera size={16} /> Start Visit
                    </button>
                    <button className="action-btn action-secondary">
                      <MapPin size={16} /> Navigate
                    </button>
                    <button className="action-btn action-secondary">
                      <Eye size={16} /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="content-grid">
            <div className="card">
              <h3>Addresses to Visit</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Loan Number</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Last Visit</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addresses.map((addr) => (
                      <tr key={addr.id}>
                        <td>{addr.loanNumber}</td>
                        <td>{addr.location}</td>
                        <td>
                          <span className={`status-badge status-${addr.status === 'verified' ? 'completed' : addr.status === 'pending' ? 'pending' : 'inprogress'}`}>
                            {addr.status.charAt(0).toUpperCase() + addr.status.slice(1)}
                          </span>
                        </td>
                        <td>{addr.lastVisit}</td>
                        <td>
                          <button className="view-btn">
                            <Navigation size={14} /> Navigate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}