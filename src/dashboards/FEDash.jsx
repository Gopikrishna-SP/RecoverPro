import { useState, useEffect } from 'react';
import { MapPin, FileText, CheckCircle, Clock, Phone, Navigation, Loader } from 'lucide-react';
import StartVisit from '../pages/StartVisit';
import CaseDetailsPage from '../pages/CaseDetails';
import { AddressesPage } from '../pages/AddressModal';

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
    margin-bottom: 60px;
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
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .card {
    background: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
  }

  .case-item {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .case-item:hover {
    border-color: #2563eb;
    background: #f8fafc;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
  }

  .case-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .case-title {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
  }

  .case-id {
    font-size: 12px;
    color: #64748b;
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
    color: #d97706;
  }

  .status-inprogress {
    background: rgba(59, 130, 246, 0.2);
    color: #2563eb;
  }

  .status-completed {
    background: rgba(16, 185, 129, 0.2);
    color: #059669;
  }

  .case-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .detail-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .detail-content label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  .detail-content span {
    font-size: 14px;
    color: #334155;
    font-weight: 500;
  }

  .case-address {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
  }

  .case-address-icon {
    color: #2563eb;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .address-text {
    font-size: 13px;
    color: #64748b;
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
    background-color: #2563eb;
    color: white;
  }

  .action-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .action-secondary {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
  }

  .action-secondary:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #64748b;
  }

  .error {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .case-details {
      grid-template-columns: 1fr;
    }

    .case-actions {
      flex-direction: column;
    }

    .container {
      padding: 16px;
    }

    .header h1 {
      font-size: 28px;
    }
  }
`;

export default function FieldExecutiveDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('cases');
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoanNumber, setSelectedLoanNumber] = useState(null);
  const [selectedVisitData, setSelectedVisitData] = useState(null);

  const API_BASE = 'http://localhost:8080/api/fe';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const statsRes = await fetch(`${API_BASE}/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      const casesRes = await fetch(`${API_BASE}/dashboard/cases`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (casesRes.ok) {
        const casesData = await casesRes.json();
        setCases(casesData);
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data. Please ensure the backend is running.');
      setLoading(false);
      console.error('Fetch error:', err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="status-badge status-completed">Completed</span>;
    } else if (status === 'inprogress') {
      return <span className="status-badge status-inprogress">In Progress</span>;
    } else if (status === 'pending') {
      return <span className="status-badge status-pending">Pending</span>;
    }
  };

  const handleStartVisit = (loanNumber, address) => {
    setSelectedVisitData({ loanNumber, address });
    setCurrentPage('visit');
  };

  const handleOpenCaseDetails = (loanNumber) => {
    setSelectedLoanNumber(loanNumber);
    setCurrentPage('case-details');
  };

  const handleOpenAddresses = (loanNumber) => {
    setSelectedLoanNumber(loanNumber);
    setCurrentPage('addresses');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedLoanNumber(null);
    setSelectedVisitData(null);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="container">
          <div className="loading">
            <Loader size={32} />
            <span style={{ marginLeft: '12px' }}>Loading dashboard...</span>
          </div>
        </div>
      </>
    );
  }

  if (currentPage === 'case-details') {
    return (
      <>
        <style>{styles}</style>
        <div className="container">
          <CaseDetailsPage 
            loanNumber={selectedLoanNumber} 
            onBack={handleBackToDashboard}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'addresses') {
    return (
      <>
        <style>{styles}</style>
        <div className="container">
          <AddressesPage 
            loanNumber={selectedLoanNumber} 
            onBack={handleBackToDashboard}
            onStartVisit={handleStartVisit}
          />
        </div>
      </>
    );
  }

  if (currentPage === 'visit') {
    return (
      <>
        <style>{styles}</style>
        <div className="container">
          <StartVisit 
            loanData={selectedVisitData}
            onBack={handleBackToDashboard}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Here's what's happening</h1>
          <p>Manage assigned cases, schedule and track field visits, and access location details.</p>
        </div>

        {error && <div className="error">{error}</div>}

        {stats && (
          <div className="stats-grid">
            {[
              { label: 'Total Cases', value: stats.totalCases || 0, icon: FileText, color: 'blue' },
              { label: 'Completed Visits', value: stats.completedVisits || 0, icon: CheckCircle, color: 'green' },
              { label: 'Pending Cases', value: stats.pendingCases || 0, icon: Clock, color: 'orange' },
              { label: 'In Progress', value: stats.inProgress || 0, icon: Navigation, color: 'purple' },
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
        )}

        <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '2px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Assigned Cases</h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Review and manage your assigned cases</p>
        </div>

        {activeTab === 'cases' && (
          <div className="content-grid">
            <div>
              {cases.length > 0 ? (
                cases.map((caseItem) => (
                  <div key={caseItem.caseId} className="case-item">
                    <div className="case-header">
                      <div>
                        <div className="case-title">{caseItem.borrowerName}</div>
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
                          <MapPin size={16} />
                        </div>
                        <div className="detail-content">
                          <label>Location</label>
                          <span>{caseItem.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="case-address">
                      <MapPin size={16} className="case-address-icon" />
                      <div className="address-text">{caseItem.address}</div>
                    </div>

                    <div className="case-actions">
                      <button
                        className="action-btn action-primary"
                        onClick={() => handleOpenCaseDetails(caseItem.loanNumber)}
                      >
                        <FileText size={16} /> Case Details
                      </button>
                      <button
                        className="action-btn action-secondary"
                        onClick={() => handleOpenAddresses(caseItem.loanNumber)}
                      >
                        <MapPin size={16} /> Addresses
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card">
                  <p style={{ textAlign: 'center', color: '#64748b' }}>No cases assigned yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}