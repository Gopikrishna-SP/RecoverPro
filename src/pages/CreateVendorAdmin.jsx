import { useState } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

const styles = `
/* ============================================
   SHARED STYLES FOR:
   CreateVendor.jsx
   CreateVendorAdmin.jsx  
   CreateFieldExecutive.jsx
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  color: #334155;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
}

.header {
  margin-bottom: 32px;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.header p {
  font-size: 14px;
  color: #64748b;
}

.form-container {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #334155;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
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
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.form-group select option {
  background: #ffffff;
  color: #334155;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #2563eb;
}

.btn-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  color: #64748b;
}

.btn-secondary:hover:not(:disabled) {
  background: #eff6ff;
  border-color: #2563eb;
  color: #0f172a;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.alert.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #059669;
}

.alert.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
}

.required {
  color: #dc2626;
  font-weight: 600;
}

@media (max-width: 600px) {
  .container {
    padding: 16px;
  }

  .form-container {
    padding: 24px;
  }

  .header h1 {
    font-size: 24px;
  }

  .form-title {
    font-size: 18px;
  }

  .btn-group {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
`;

export default function CreateVendorAdmin() {
  const [formData, setFormData] = useState({ 
    vendorId: '', 
    vendorName: '',
    username: '', 
    email: '', 
    password: '',
    phone: '',
    contactPerson: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!formData.vendorId || !formData.vendorName || !formData.username || !formData.email || !formData.password) {
      setError('All required fields must be filled');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.phone && formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/super/vendor-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: parseInt(formData.vendorId),
          vendorName: formData.vendorName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || null,
          contactPerson: formData.contactPerson || null
        }),
      });

      if (response.ok) {
        setSuccess('Vendor Admin created successfully!');
        setFormData({ 
          vendorId: '', 
          vendorName: '',
          username: '', 
          email: '', 
          password: '',
          phone: '',
          contactPerson: ''
        });
        setShowPassword(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to create vendor admin');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ 
      vendorId: '', 
      vendorName: '',
      username: '', 
      email: '', 
      password: '',
      phone: '',
      contactPerson: ''
    });
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Create Vendor Admin</h1>
          <p>Add a new administrator account for a vendor</p>
        </div>

        <div className="form-container">
          <div className="form-title">Vendor Admin Details</div>

          {error && <div className="alert error"><AlertCircle size={16} />{error}</div>}
          {success && <div className="alert success"><CheckCircle size={16} />{success}</div>}

          <div className="form-group">
            <label>Vendor ID <span className="required">*</span></label>
            <input 
              type="number" 
              name="vendorId" 
              value={formData.vendorId} 
              onChange={handleChange} 
              placeholder="Enter vendor ID" 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Vendor Name <span className="required">*</span></label>
            <input 
              type="text" 
              name="vendorName" 
              value={formData.vendorName} 
              onChange={handleChange} 
              placeholder="Enter vendor name" 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Username <span className="required">*</span></label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              placeholder="Enter username" 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter email address" 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password <span className="required">*</span></label>
            <div className="input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter password (min 6 characters)" 
                disabled={loading}
              />
              <button 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Enter phone number" 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contact Person</label>
            <input 
              type="text" 
              name="contactPerson" 
              value={formData.contactPerson} 
              onChange={handleChange} 
              placeholder="Enter contact person name" 
              disabled={loading}
            />
          </div>

          <div className="btn-group">
            <button className="btn btn-secondary" onClick={handleClear} disabled={loading}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating...' : 'Create Vendor Admin'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}