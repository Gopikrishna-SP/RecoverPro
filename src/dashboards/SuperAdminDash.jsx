import { useState, useEffect, useRef } from 'react';
import { Users, Building2, Landmark, Bell, Plus, X } from 'lucide-react';
import { API_BASE } from '../config';
import { getAuthHeaders } from '../api/auth';

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
    grid-template-columns: repeat(5, 1fr);
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

  .stat-icon.red {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .item:hover {
    border-color: #2563eb;
    background: #eff6ff;
  }

  .item-label {
    color: #334155;
    font-size: 14px;
    font-weight: 500;
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.2);
    color: #059669;
    padding: 4px 12px;
    border-radius: 12px;
  }

  .setup-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .setup-card {
    background: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .setup-card:hover {
    border-color: #2563eb;
    background: #f1f5f9;
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
  }

  .setup-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 6px;
  }

  .setup-content p {
    font-size: 12px;
    color: #64748b;
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
  }

  .notification-card {
    background: #ffffff;
    backdrop-filter: blur(10px);
    border: 1px solid #e5e7eb;
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
    color: #0f172a;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    color: #334155;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #cbd5e1;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: #2563eb;
    background: #f8fafc;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
    box-sizing: border-box;
  }

  .submit-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #64748b;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(4px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-overlay.open {
    display: flex;
  }

  .modal-content {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
    background: #eff6ff;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .modal-header h3 {
    color: #0f172a;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: #64748b;
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
    color: #2563eb;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-body .form-group {
    margin-bottom: 20px;
  }

  .modal-body .form-group input,
  .modal-body .form-group textarea,
  .modal-body .form-group select {
    width: 100%;
    padding: 12px 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    color: #334155;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .modal-body .form-group input::placeholder,
  .modal-body .form-group textarea::placeholder {
    color: #cbd5e1;
  }

  .modal-body .form-group input:focus,
  .modal-body .form-group textarea:focus,
  .modal-body .form-group select:focus {
    outline: none;
    border-color: #2563eb;
    background: #f8fafc;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .modal-body .submit-btn {
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
    box-sizing: border-box;
  }

  .modal-body .submit-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .modal-body .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .success-msg {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #059669;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .error-msg {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #dc2626;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 14px;
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

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: null });
  const [message, setMessage] = useState({ type: null, text: '' });

  const [formData, setFormData] = useState({
    bank: { bankName: '' },
    bankAdmin: { bankId: '', firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '' },
    vendor: { bankId: '', name: '' },
    vendorAdmin: { vendorId: '', firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '' },
    fo: { firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '', bankId: '', vendorId: '' },
    notification: { title: '', message: '' }
  });

  const messageTimerRef = useRef(null);

  useEffect(() => {
    fetchDashboardStats();
    return () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/dashboard/stats`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
      showMessage('error', 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    messageTimerRef.current = setTimeout(() => setMessage({ type: null, text: '' }), 3000);
  };

  const handleInputChange = (form, field, value) => {
    setFormData(prev => ({
      ...prev,
      [form]: { ...prev[form], [field]: value }
    }));
  };

  const createBank = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/super/banks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ bankName: formData.bank.bankName })
      });
      if (response.ok) {
        showMessage('success', 'Bank created successfully');
        setFormData(prev => ({ ...prev, bank: { bankName: '' } }));
        setModal({ open: false, type: null });
        fetchDashboardStats();
      } else {
        showMessage('error', 'Failed to create bank');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const createBankAdmin = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bankId: parseInt(formData.bankAdmin.bankId),
        firstName: formData.bankAdmin.firstName,
        lastName: formData.bankAdmin.lastName,
        username: formData.bankAdmin.username,
        email: formData.bankAdmin.email,
        password: formData.bankAdmin.password,
        phone: formData.bankAdmin.phone,
        location: formData.bankAdmin.location,
        organization: formData.bankAdmin.organization
      };
      const response = await fetch(`${API_BASE}/super/bank-admins`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        showMessage('success', 'Bank Admin created successfully');
        setFormData(prev => ({ ...prev, bankAdmin: { bankId: '', firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '' } }));
        setModal({ open: false, type: null });
        fetchDashboardStats();
      } else {
        showMessage('error', 'Failed to create bank admin');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const createVendor = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bankId: parseInt(formData.vendor.bankId),
        name: formData.vendor.name
      };
      const response = await fetch(`${API_BASE}/super/vendor`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        showMessage('success', 'Vendor created successfully');
        setFormData(prev => ({ ...prev, vendor: { bankId: '', name: '' } }));
        setModal({ open: false, type: null });
        fetchDashboardStats();
      } else {
        showMessage('error', 'Failed to create vendor');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const createVendorAdmin = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        vendorId: parseInt(formData.vendorAdmin.vendorId),
        firstName: formData.vendorAdmin.firstName,
        lastName: formData.vendorAdmin.lastName,
        username: formData.vendorAdmin.username,
        email: formData.vendorAdmin.email,
        password: formData.vendorAdmin.password,
        phone: formData.vendorAdmin.phone,
        location: formData.vendorAdmin.location,
        organization: formData.vendorAdmin.organization
      };
      const response = await fetch(`${API_BASE}/super/vendor-admins`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        showMessage('success', 'Vendor Admin created successfully');
        setFormData(prev => ({ ...prev, vendorAdmin: { vendorId: '', firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '' } }));
        setModal({ open: false, type: null });
        fetchDashboardStats();
      } else {
        showMessage('error', 'Failed to create vendor admin');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const createFO = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: formData.fo.firstName,
        lastName: formData.fo.lastName,
        username: formData.fo.username,
        email: formData.fo.email,
        password: formData.fo.password,
        phone: formData.fo.phone,
        location: formData.fo.location,
        organization: formData.fo.organization,
        bankId: parseInt(formData.fo.bankId),
        vendorId: parseInt(formData.fo.vendorId)
      };
      const response = await fetch(`${API_BASE}/super/fos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        showMessage('success', 'Field Officer created successfully');
        setFormData(prev => ({ ...prev, fo: { firstName: '', lastName: '', username: '', email: '', password: '', phone: '', location: '', organization: '', bankId: '', vendorId: '' } }));
        setModal({ open: false, type: null });
        fetchDashboardStats();
      } else {
        showMessage('error', 'Failed to create field officer');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const sendNotification = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams({
        title: formData.notification.title,
        message: formData.notification.message
      });
      const response = await fetch(`${API_BASE}/notifications/broadcast?${params}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        showMessage('success', 'Notification sent successfully');
        setFormData(prev => ({ ...prev, notification: { title: '', message: '' } }));
      } else {
        showMessage('error', 'Failed to send notification');
      }
    } catch (error) {
      showMessage('error', 'Error: ' + error.message);
    }
  };

  const openModal = (type) => {
    setModal({ open: true, type });
  };

  const closeModal = () => {
    setModal({ open: false, type: null });
  };

  if (loading) {
    return <div className="container" style={{ marginTop: '100px' }}><div className="loading">Loading dashboard...</div></div>;
  }

  const statCards = [
    { label: 'Total Vendors', value: stats?.totalVendors || 0, icon: Building2, color: 'blue' },
    { label: 'Total Banks', value: stats?.totalBanks || 0, icon: Landmark, color: 'green' },
    { label: 'Bank Admins', value: stats?.totalBankAdmin || 0, icon: Users, color: 'purple' },
    { label: 'Vendor Admins', value: stats?.totalVendorAdmin || 0, icon: Users, color: 'orange' },
    { label: 'Field Executives', value: stats?.totalFieldExecutives || 0, icon: Users, color: 'red' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        {message.text && (
          <div className={message.type === 'success' ? 'success-msg' : 'error-msg'}>
            {message.text}
          </div>
        )}

        <div className="header">
          <h1>Here's what's happening</h1>
          <p>Operational overview of vendors, banks, and system users</p>
        </div>

        <div className="stats-grid">
          {statCards.map((stat, i) => (
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
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
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
                {(stats?.activeVendors || []).map((v, i) => (
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
                {(stats?.activeBanks || []).map((b, i) => (
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
              { title: 'Create Vendor', desc: 'Register and setup new vendor', onClick: () => openModal('vendor') },
              { title: 'Create Bank', desc: 'Add new bank to system', onClick: () => openModal('bank') },
              { title: 'Add Vendor Admin', desc: 'Create vendor administrator', onClick: () => openModal('vendorAdmin') },
              { title: 'Add Bank Admin', desc: 'Create bank administrator', onClick: () => openModal('bankAdmin') },
              { title: 'Create FOS', desc: 'Register field officer supervisor', onClick: () => openModal('fo') },
            ].map((item, i) => (
              <div key={i} className="setup-card" onClick={item.onClick}>
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

            <form onSubmit={sendNotification}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Notification title" value={formData.notification.title} onChange={(e) => handleInputChange('notification', 'title', e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Broadcast message to all users" value={formData.notification.message} onChange={(e) => handleInputChange('notification', 'message', e.target.value)} required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Notification</button>
            </form>
          </div>
        )}
      </div>

      <div className={`modal-overlay ${modal.open ? 'open' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              {modal.type === 'bank' && 'Create Bank'}
              {modal.type === 'vendor' && 'Create Vendor'}
              {modal.type === 'bankAdmin' && 'Create Bank Admin'}
              {modal.type === 'vendorAdmin' && 'Create Vendor Admin'}
              {modal.type === 'fo' && 'Create Field Officer'}
            </h3>
            <button className="close-btn" onClick={closeModal}><X size={24} /></button>
          </div>

          <div className="modal-body">
            {modal.type === 'bank' && (
              <form onSubmit={createBank}>
                <div className="form-group">
                  <label>Bank Name</label>
                  <input type="text" placeholder="Enter bank name" value={formData.bank.bankName} onChange={(e) => handleInputChange('bank', 'bankName', e.target.value)} required />
                </div>
                <button type="submit" className="submit-btn">Create Bank</button>
              </form>
            )}

            {modal.type === 'vendor' && (
              <form onSubmit={createVendor}>
                <div className="form-group">
                  <label>Bank ID</label>
                  <input type="number" placeholder="Enter bank ID" value={formData.vendor.bankId} onChange={(e) => handleInputChange('vendor', 'bankId', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Vendor Name</label>
                  <input type="text" placeholder="Enter vendor name" value={formData.vendor.name} onChange={(e) => handleInputChange('vendor', 'name', e.target.value)} required />
                </div>
                <button type="submit" className="submit-btn">Create Vendor</button>
              </form>
            )}

            {modal.type === 'bankAdmin' && (
              <form onSubmit={createBankAdmin}>
                <div className="form-group">
                  <label>Bank ID</label>
                  <input type="number" placeholder="Enter bank ID" value={formData.bankAdmin.bankId} onChange={(e) => handleInputChange('bankAdmin', 'bankId', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" value={formData.bankAdmin.firstName} onChange={(e) => handleInputChange('bankAdmin', 'firstName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" value={formData.bankAdmin.lastName} onChange={(e) => handleInputChange('bankAdmin', 'lastName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" value={formData.bankAdmin.username} onChange={(e) => handleInputChange('bankAdmin', 'username', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter email" value={formData.bankAdmin.email} onChange={(e) => handleInputChange('bankAdmin', 'email', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password" value={formData.bankAdmin.password} onChange={(e) => handleInputChange('bankAdmin', 'password', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="Enter phone" value={formData.bankAdmin.phone} onChange={(e) => handleInputChange('bankAdmin', 'phone', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" value={formData.bankAdmin.location} onChange={(e) => handleInputChange('bankAdmin', 'location', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Organization</label>
                  <input type="text" placeholder="Enter organization" value={formData.bankAdmin.organization} onChange={(e) => handleInputChange('bankAdmin', 'organization', e.target.value)} required />
                </div>
                <button type="submit" className="submit-btn">Create Bank Admin</button>
              </form>
            )}

            {modal.type === 'vendorAdmin' && (
              <form onSubmit={createVendorAdmin}>
                <div className="form-group">
                  <label>Vendor ID</label>
                  <input type="number" placeholder="Enter vendor ID" value={formData.vendorAdmin.vendorId} onChange={(e) => handleInputChange('vendorAdmin', 'vendorId', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" value={formData.vendorAdmin.firstName} onChange={(e) => handleInputChange('vendorAdmin', 'firstName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" value={formData.vendorAdmin.lastName} onChange={(e) => handleInputChange('vendorAdmin', 'lastName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" value={formData.vendorAdmin.username} onChange={(e) => handleInputChange('vendorAdmin', 'username', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter email" value={formData.vendorAdmin.email} onChange={(e) => handleInputChange('vendorAdmin', 'email', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password" value={formData.vendorAdmin.password} onChange={(e) => handleInputChange('vendorAdmin', 'password', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="Enter phone" value={formData.vendorAdmin.phone} onChange={(e) => handleInputChange('vendorAdmin', 'phone', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" value={formData.vendorAdmin.location} onChange={(e) => handleInputChange('vendorAdmin', 'location', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Organization</label>
                  <input type="text" placeholder="Enter organization" value={formData.vendorAdmin.organization} onChange={(e) => handleInputChange('vendorAdmin', 'organization', e.target.value)} required />
                </div>
                <button type="submit" className="submit-btn">Create Vendor Admin</button>
              </form>
            )}

            {modal.type === 'fo' && (
              <form onSubmit={createFO}>
                <div className="form-group">
                  <label>Bank ID</label>
                  <input type="number" placeholder="Enter bank ID" value={formData.fo.bankId} onChange={(e) => handleInputChange('fo', 'bankId', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Vendor ID</label>
                  <input type="number" placeholder="Enter vendor ID" value={formData.fo.vendorId} onChange={(e) => handleInputChange('fo', 'vendorId', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" value={formData.fo.firstName} onChange={(e) => handleInputChange('fo', 'firstName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" value={formData.fo.lastName} onChange={(e) => handleInputChange('fo', 'lastName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" value={formData.fo.username} onChange={(e) => handleInputChange('fo', 'username', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter email" value={formData.fo.email} onChange={(e) => handleInputChange('fo', 'email', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password" value={formData.fo.password} onChange={(e) => handleInputChange('fo', 'password', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="Enter phone number" value={formData.fo.phone} onChange={(e) => handleInputChange('fo', 'phone', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" value={formData.fo.location} onChange={(e) => handleInputChange('fo', 'location', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Organization</label>
                  <input type="text" placeholder="Enter organization" value={formData.fo.organization} onChange={(e) => handleInputChange('fo', 'organization', e.target.value)} required />
                </div>
                <button type="submit" className="submit-btn">Create Field Officer</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}