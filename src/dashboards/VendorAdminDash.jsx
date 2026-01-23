import { useState, useEffect } from 'react';
import { Users, Briefcase, CheckCircle, AlertCircle, Eye, Loader, AlertTriangle, X, FileText, Phone, MapPin } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0f172a 100%);
    min-height: 100vh;
    color: #e2e8f0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .header-left h1 {
    font-size: 36px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .header-left p {
    font-size: 14px;
    color: #94a3b8;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
    transform: translateY(-4px);
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
    word-break: break-word;
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
    flex-wrap: wrap;
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
    font-family: inherit;
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

  .action-btn.action-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .action-btn.action-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  .action-btn.action-secondary {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .action-btn.action-secondary:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
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
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: rgba(0, 0, 0, 0.2);
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

  .status-assigned {
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
  }

  .status-unassigned {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
  }

  .status-inactive {
    background: rgba(107, 114, 128, 0.2);
    color: #d1d5db;
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
    font-family: inherit;
  }

  .action-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: #94a3b8;
  }

  .error-banner {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: #fca5a5;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 100%);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 16px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    background: rgba(15, 23, 42, 0.8);
    position: sticky;
    top: 0;
  }

  .modal-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .close-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
  }

  .modal-body {
    padding: 24px;
  }

  .officer-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .officer-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .officer-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .officer-header h3 {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
  }

  .officer-header p {
    font-size: 13px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .officer-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-item {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 10px;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .stat-item:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .stat-item label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 8px;
  }

  .stat-item span {
    font-size: 18px;
    font-weight: 600;
    color: #60a5fa;
  }

  .modal-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #94a3b8;
    gap: 12px;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .officer-stats {
      grid-template-columns: 1fr;
    }
    .case-details {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .table-container {
      font-size: 12px;
    }
    td, th {
      padding: 8px;
    }
  }
`;

export default function VendorAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [fieldOfficers, setFieldOfficers] = useState([]);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerPerformance, setOfficerPerformance] = useState(null);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [performanceError, setPerformanceError] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/vendor/dashboard';

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '';
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      };

      const [statsRes, officersRes, casesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats`, { method: 'GET', headers, credentials: 'include' }),
        fetch(`${API_BASE_URL}/field-officers`, { method: 'GET', headers, credentials: 'include' }),
        fetch(`${API_BASE_URL}/cases`, { method: 'GET', headers, credentials: 'include' }),
      ]);

      if (statsRes.status === 401 || officersRes.status === 401 || casesRes.status === 401) {
        setError('Unauthorized - Please login again');
        setLoading(false);
        return;
      }

      if (!statsRes.ok || !officersRes.ok || !casesRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const statsData = await statsRes.json();
      const officersData = await officersRes.json();
      const casesData = await casesRes.json();

      setStats(statsData || {});
      setFieldOfficers(Array.isArray(officersData) ? officersData : []);
      setCases(Array.isArray(casesData) ? casesData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const openOfficerDetailsModal = async (officer) => {
    setSelectedOfficer(officer);
    setShowOfficerModal(true);
    setPerformanceLoading(true);
    setPerformanceError(null);
    setOfficerPerformance(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      };

      const response = await fetch(
        `${API_BASE_URL}/officer/${officer.id}/performance`,
        { method: 'GET', headers, credentials: 'include' }
      );

      if (response.ok) {
        const data = await response.json();
        setOfficerPerformance(data);
      } else {
        setPerformanceError('Failed to load officer performance.');
      }
    } catch (err) {
      setPerformanceError('Error fetching officer details.');
      console.error('Fetch error:', err);
    } finally {
      setPerformanceLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    const statusMap = {
      ASSIGNED: { className: 'status-assigned', label: 'Assigned' },
      UNASSIGNED: { className: 'status-unassigned', label: 'Unassigned' },
      PENDING: { className: 'status-pending', label: 'Pending' },
      COMPLETED: { className: 'status-completed', label: 'Completed' },
    };
    const statusObj = statusMap[status] || { className: 'status-pending', label: status };
    return <span className={`status-badge ${statusObj.className}`}>{statusObj.label}</span>;
  };

  const formatCurrency = (value) => {
    if (!value) return '₹0';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? '₹0' : '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  if (loading && !stats) {
    return (
      <>
        <style>{styles}</style>
        <div className="container">
          <div className="modal-loading">
            <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <span>Loading dashboard...</span>
          </div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <div className="header-left">
            <h1>Here's what's happening</h1>
            <p>Oversee field officers, allocations, and case assignments</p>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <AlertTriangle size={20} />
            <div>{error}</div>
          </div>
        )}

        {stats && (
          <div className="stats-grid">
            {[
              { label: 'Visits Pending Today', value: stats.visitsPendingToday || 0, icon: AlertCircle, color: 'orange' },
              { label: 'Collections Today', value: formatCurrency(stats.collectionsToday || 0), icon: Users, color: 'green' },
              { label: 'Visits Completed Today', value: stats.visitsCompletedToday || 0, icon: CheckCircle, color: 'blue' },
              { label: 'Total Active Cases', value: stats.totalActiveCases || 0, icon: Briefcase, color: 'purple' },
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
        )}

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            Assigned Cases
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="content-grid">
            <div className="card">
              <h3>Field Officers – Pending Overview</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Total Pending</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldOfficers.length > 0 ? (
                      fieldOfficers.map((officer) => {
                        const totalPending = officer.pendingCases || 0;
                        return (
                          <tr key={officer.id}>
                            <td>{officer.name || 'N/A'}</td>
                            <td>{totalPending}</td>
                            <td>
                              <button
                                className="action-btn"
                                onClick={() => openOfficerDetailsModal(officer)}
                              >
                                <Eye size={14} /> View
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="empty-state">
                          No field officers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="content-grid">
            {cases.length > 0 ? (
              cases.map((caseItem) => (
                <div key={caseItem.caseId} className="case-item">
                  <div className="case-header">
                    <div>
                      <div className="case-title">{caseItem.borrowerName || caseItem.customerName}</div>
                      <div className="case-id">
                        Case ID: {caseItem.caseId} | Loan: {caseItem.loanNumber}
                      </div>
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
                        <span>{formatCurrency(caseItem.loanAmount)}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-icon">
                        <Phone size={16} />
                      </div>
                      <div className="detail-content">
                        <label>Contact</label>
                        <span>{caseItem.phone || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-icon">
                        <MapPin size={16} />
                      </div>
                      <div className="detail-content">
                        <label>Location</label>
                        <span>{caseItem.location || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {caseItem.address && (
                    <div className="case-address">
                      <MapPin size={16} className="case-address-icon" />
                      <div className="address-text">{caseItem.address}</div>
                    </div>
                  )}

                  <div className="case-actions">
                    <button className="action-btn action-primary">
                      <FileText size={16} /> Case Details
                    </button>
                    <button className="action-btn action-secondary">
                      <MapPin size={16} /> Addresses
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">
                <p style={{ textAlign: 'center', color: '#94a3b8' }}>No cases assigned yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showOfficerModal && (
        <div className="modal-overlay" onClick={() => setShowOfficerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Field Officer Details</h2>
              <button className="close-btn" onClick={() => setShowOfficerModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {performanceLoading ? (
                <div className="modal-loading">
                  <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Loading officer details...</span>
                </div>
              ) : performanceError ? (
                <div className="error-banner">
                  <AlertTriangle size={16} />
                  <div>{performanceError}</div>
                </div>
              ) : officerPerformance ? (
                <div className="officer-card">
                  <div className="officer-header">
                    <div>
                      <h3>{selectedOfficer?.name || 'N/A'}</h3>
                      <p>{selectedOfficer?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="officer-stats">
                    <div className="stat-item">
                      <label>Total Cases</label>
                      <span>{officerPerformance.totalCases || 0}</span>
                    </div>
                    <div className="stat-item">
                      <label>Assigned Cases</label>
                      <span>{officerPerformance.assignedCases || 0}</span>
                    </div>
                    <div className="stat-item">
                      <label>Pending Cases</label>
                      <span>{officerPerformance.pendingCases || 0}</span>
                    </div>
                    <div className="stat-item">
                      <label>Completed Cases</label>
                      <span>{officerPerformance.completedCases || 0}</span>
                    </div>
                    <div className="stat-item">
                      <label>Completion Rate</label>
                      <span>{officerPerformance.completionRate || 0}%</span>
                    </div>
                    <div className="stat-item">
                      <label>Total Collection</label>
                      <span>{formatCurrency(officerPerformance.totalCollection || 0)}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}