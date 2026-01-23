import { useState, useEffect } from 'react';
import { MapPin, FileText, CheckCircle, Clock, Camera, Phone, Navigation, Eye, Loader, X, ArrowRight } from 'lucide-react';
import StartVisit from '../pages/StartVisit';

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

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #94a3b8;
  }

  .error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  /* Modal Styles */
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
    sticky: top 0;
    background: rgba(15, 23, 42, 0.8);
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
  }

  .close-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
  }

  .modal-body {
    padding: 24px;
  }

  .loan-info {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .loan-info-label {
    font-size: 12px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
  }

  .loan-info-value {
    font-size: 18px;
    color: #60a5fa;
    font-weight: 700;
  }

  .addresses-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .address-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }

  .address-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .address-info {
    display: flex;
    gap: 12px;
    flex: 1;
  }

  .address-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    flex-shrink: 0;
  }

  .address-text-info {
    flex: 1;
  }

  .address-text-info label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  .address-text-info span {
    font-size: 14px;
    color: #e2e8f0;
    line-height: 1.4;
  }

  .address-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .modal-action-btn {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .modal-action-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .modal-action-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  .modal-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #94a3b8;
  }

  .modal-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 16px;
  }

  .detail-field {
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 10px;
    padding: 16px;
    transition: all 0.3s ease;
  }

  .detail-field:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .detail-field label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 8px;
  }

  .detail-field span {
    font-size: 15px;
    font-weight: 600;
    color: #60a5fa;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    .details-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .case-details {
      grid-template-columns: 1fr;
    }
    .address-card {
      flex-direction: column;
      align-items: flex-start;
    }
    .address-actions {
      width: 100%;
    }
    .modal-action-btn {
      flex: 1;
    }
  }
`;

export default function FieldExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState('cases');
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCaseDetailsModal, setShowCaseDetailsModal] = useState(false);
  const [selectedLoanNumber, setSelectedLoanNumber] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [caseDetails, setCaseDetails] = useState([]);
  const [caseDetailsLoading, setCaseDetailsLoading] = useState(false);
  const [caseDetailsError, setCaseDetailsError] = useState(null);

  const [showVisitModal, setShowVisitModal] = useState(false);
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

  const openCaseDetailsModal = async (loanNumber) => {
    setSelectedLoanNumber(loanNumber);
    setShowCaseDetailsModal(true);
    setCaseDetailsLoading(true);
    setCaseDetailsError(null);
    setCaseDetails([]);

    try {
      const response = await fetch(
        `${API_BASE}/cases`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Filter cases by loan number
        const filteredData = data.filter(item => item.loanNumber === loanNumber);
        setCaseDetails(filteredData);
      } else {
        setCaseDetailsError('Failed to load case details.');
      }
    } catch (err) {
      setCaseDetailsError('Error fetching case details. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setCaseDetailsLoading(false);
    }
  };

  const openAddressModal = async (loanNumber) => {
    setSelectedLoanNumber(loanNumber);
    setShowAddressModal(true);
    setAddressLoading(true);
    setAddressError(null);
    setAddresses([]);

    try {
      const response = await fetch(
        `${API_BASE}/cases/${loanNumber}/addresses`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        setAddressError('Failed to load addresses.');
      }
    } catch (err) {
      setAddressError('Error fetching addresses. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setAddressLoading(false);
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

  const handleNavigate = (address) => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  // And this function to open Start Visit modal:
  const handleStartVisit = (loanNumber, address) => {
    setSelectedVisitData({ loanNumber, address });
    setShowVisitModal(true);
  };

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

        <div className="tabs">
          {['cases'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              Assigned Cases
            </button>
          ))}
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
                        onClick={() => openCaseDetailsModal(caseItem.loanNumber)}
                      >
                        <FileText size={16} /> Case Details
                      </button>
                      <button
                        className="action-btn action-secondary"
                        onClick={() => openAddressModal(caseItem.loanNumber)}
                      >
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
          </div>
        )}
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Visit Addresses</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddressModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="loan-info">
                <div>
                  <div className="loan-info-label">Loan Number</div>
                  <div className="loan-info-value">{selectedLoanNumber}</div>
                </div>
              </div>

              {addressError && (
                <div className="modal-error">{addressError}</div>
              )}

              {addressLoading ? (
                <div className="modal-loading">
                  <Loader size={32} />
                  <span style={{ marginLeft: '12px' }}>Loading addresses...</span>
                </div>
              ) : addresses.length > 0 ? (
                <div className="addresses-list">
                  {addresses.map((address, idx) => (
                    <div key={idx} className="address-card">
                      <div className="address-info">
                        <div className="address-icon">
                          <MapPin size={20} />
                        </div>
                        <div className="address-text-info">
                          <label>Address</label>
                          <span>{address}</span>
                        </div>
                      </div>
                      <div className="address-actions">
                        {/* START VISIT BUTTON - Opens Start Visit Modal */}
                        <button
                          className="modal-action-btn modal-action-primary"
                          onClick={() => handleStartVisit(selectedLoanNumber, address)}
                        >
                          <Camera size={14} /> Start
                        </button>

                        {/* NAVIGATE BUTTON - Opens Google Maps in New Tab */}
                        <button
                          className="modal-action-btn modal-action-primary"
                          onClick={() => handleNavigate(address)}
                        >
                          <Navigation size={14} /> Go
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                  No addresses available for this loan.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Case Details Modal */}
      {showCaseDetailsModal && (
        <div className="modal-overlay" onClick={() => setShowCaseDetailsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Case Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowCaseDetailsModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="loan-info">
                <div>
                  <div className="loan-info-label">Loan Number</div>
                  <div className="loan-info-value">{selectedLoanNumber}</div>
                </div>
              </div>

              {caseDetailsError && (
                <div className="modal-error">{caseDetailsError}</div>
              )}

              {caseDetailsLoading ? (
                <div className="modal-loading">
                  <Loader size={32} />
                  <span style={{ marginLeft: '12px' }}>Loading case details...</span>
                </div>
              ) : caseDetails.length > 0 ? (
                <div className="details-grid">
                  {Object.entries(caseDetails[0]).map(([key, value]) => (
                    <div key={key} className="detail-field">
                      <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <span>{value || '-'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                  No case details available.
                </p>
              )}
            </div>
          </div>
        </div>

      )}

      {showVisitModal && (
        <StartVisit
          isOpen={showVisitModal}
          onClose={() => setShowVisitModal(false)}
          loanData={{
            loanNumber: selectedVisitData?.loanNumber,
            address: selectedVisitData?.address
          }}
        />
      )}
    </>
  );
}