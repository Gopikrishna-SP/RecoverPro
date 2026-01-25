import React, { useState, useEffect } from 'react';
import { ChevronDown, Edit2, Save, X, Mail, Phone, MapPin, Building2, Shield, Loader } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/profile';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [profileData, setProfileData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    organization: '',
    fullName: '',
    roles: [],
    enabled: false
  });

  const [editData, setEditData] = useState(profileData);

  // Fetch user profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(API_BASE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      setProfileData({
        ...data,
        roles: Array.isArray(data.roles) ? data.roles : []
      });
      setEditData({
        ...data,
        roles: Array.isArray(data.roles) ? data.roles : []
      });
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({...profileData});
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const payload = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        phone: editData.phone,
        location: editData.location,
        organization: editData.organization
      };

      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const data = await response.json();
      setProfileData(data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({...profileData});
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const roleDisplay = profileData.roles?.length > 0 
    ? profileData.roles[0].replace('ROLE_', '').replace(/_/g, ' ')
    : 'User';

  const initials = `${profileData.firstName?.charAt(0) || 'U'}${profileData.lastName?.charAt(0) || 'S'}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: inherit;
        }

        .profile-wrapper {
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 6px 12px 6px 6px;
          border-radius: 8px;
          transition: all 0.2s;
          background: none;
          border: none;
          backdrop-filter: blur(10px);
        }


        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007A3D 0%, #00A550 45%, #5EF3A2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          flex-shrink: 0;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }

        .profile-name {
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }

        .profile-role {
          font-size: 12px;
          color: #64748b;
        }

        .profile-dropdown {
          position: fixed;          
          top: 16px;                
          right: 16px;      
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(15,23,42,.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.05);
          z-index: 1000;
          width: 340px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          backdrop-filter: blur(20px);
        }

        .profile-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-content {
          padding: 20px;
        }

        .profile-section {
          display: flex;
          gap: 16px;
          padding-bottom: 20px;
          position: relative;
        }

        .profile-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007A3D 0%, #00A550 45%, #5EF3A2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 32px;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .profile-details {
          padding-top: 12px;
          flex: 1;
        }

        .profile-name-large {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .profile-badge {
          display: inline-block;
          padding: 4px 10px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          margin-top: 6px;
          border: 1px solid #bbf7d0;
        }

        .close-btn {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #e0f2fe;
          color: #2563eb;
        }

        .info-group {
          margin-bottom: 16px;
          display: none;
        }

        .info-group.show {
          display: block;
        }

        .info-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .info-value {
          font-size: 13px;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-value svg {
          color: #2563eb;
          flex-shrink: 0;
        }

        .field-input {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          color: #0f172a;
          background: #f8fafc;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s;
          margin-bottom: 12px;
        }

        .field-input::placeholder {
          color: #94a3b8;
        }

        .field-input:focus {
          outline: none;
          border-color: #2563eb;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid rgba(42, 63, 82, 0.6);
          margin-top: 16px;
        }

        .btn-small {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-primary-small {
          background-color: #2563eb;
          color: #fff;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .btn-primary-small:hover {
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary-small {
          background-color: #eff6ff;
          color: #2563eb;
          border: 1px solid rgba(96, 165, 250, 0.3);
        }

        .btn-secondary-small:hover {
          background: rgba(96, 165, 250, 0.2);
        }

        .btn-danger-small {
          background-color: #fee2e2;
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .btn-danger-small:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .error-msg {
          color: #dc2626;
          font-size: 12px;
          margin-bottom: 12px;
          padding: 8px;
          background-color: #fee2e2;
          border-radius: 6px;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #64748b;
        }
      `}</style>

      <div className="profile-wrapper">
        <button className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
          <div className="profile-pic">{initials}</div>
          <div className="profile-info">
            <div className="profile-name">{profileData.firstName} {profileData.lastName}</div>
            <div className="profile-role">{roleDisplay}</div>
          </div>
          <ChevronDown size={18} color="#64748b" />
        </button>

        <div className={`profile-dropdown ${isOpen ? 'open' : ''}`}>
          <div className="dropdown-content">
            {loading && !isEditing ? (
              <div className="loading">
                <Loader size={20} className="animate-spin" />
              </div>
            ) : error ? (
              <div className="error-msg">{error}</div>
            ) : !isEditing ? (
              <>
                <div className="profile-section">
                  <div className="profile-avatar-large">{initials}</div>
                  <div className="profile-details">
                    <div className="profile-name-large">
                      {profileData.firstName} {profileData.lastName}
                    </div>
                    <div className="profile-badge">
                      {profileData.enabled ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <button className="close-btn" onClick={() => setIsOpen(false)} title="Close">
                    <X size={16} />
                  </button>
                </div>

                <div className="info-group show">
                  <div className="info-label">Role</div>
                  <div className="info-value">
                    <Shield size={14} />
                    {roleDisplay}
                  </div>
                </div>

                <div className="info-group show">
                  <div className="info-label">Email</div>
                  <div className="info-value">
                    <Mail size={14} />
                    {profileData.email}
                  </div>
                </div>

                <div className="info-group show">
                  <div className="info-label">Phone</div>
                  <div className="info-value">
                    <Phone size={14} />
                    {profileData.phone}
                  </div>
                </div>

                <div className="info-group show">
                  <div className="info-label">Location</div>
                  <div className="info-value">
                    <MapPin size={14} />
                    {profileData.location}
                  </div>
                </div>

                <div className="info-group show">
                  <div className="info-label">Organization</div>
                  <div className="info-value">
                    <Building2 size={14} />
                    {profileData.organization}
                  </div>
                </div>

              </>
            ) : (
              <>
                {error && <div className="error-msg">{error}</div>}
                
                <div className="info-group show">
                  <div className="info-label">First Name</div>
                  <input
                    type="text"
                    className="field-input"
                    value={editData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                  />
                </div>

                <div className="info-group show">
                  <div className="info-label">Last Name</div>
                  <input
                    type="text"
                    className="field-input"
                    value={editData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                  />
                </div>

                <div className="info-group show">
                  <div className="info-label">Email</div>
                  <input
                    type="email"
                    className="field-input"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="info-group show">
                  <div className="info-label">Phone</div>
                  <input
                    type="tel"
                    className="field-input"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>

                <div className="info-group show">
                  <div className="info-label">Location</div>
                  <input
                    type="text"
                    className="field-input"
                    value={editData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>

                <div className="info-group show">
                  <div className="info-label">Organization</div>
                  <input
                    type="text"
                    className="field-input"
                    value={editData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                  />
                </div>

                <div className="action-buttons">
                  <button className="btn-small btn-primary-small" onClick={handleSave} disabled={loading}>
                    <Save size={14} />
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn-small btn-danger-small" onClick={handleCancel} disabled={loading}>
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}