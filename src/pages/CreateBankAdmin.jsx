import { useState } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, X } from 'lucide-react';

const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
.modal-content { background: #ffffff; border-radius: 24px; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3); max-width: 500px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes slideIn { from { opacity: 0; transform: translateY(-40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.modal-header { background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%); border-bottom: 1px solid #e0e7ff; padding: 32px 36px; display: flex; justify-content: space-between; align-items: flex-start; border-radius: 24px 24px 0 0; flex-shrink: 0; }
.modal-header h1 { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 6px; letter-spacing: -0.5px; }
.modal-header p { font-size: 14px; color: #64748b; font-weight: 500; line-height: 1.4; }
.close-btn { background: #f1f5f9; border: none; cursor: pointer; color: #64748b; padding: 10px; display: flex; align-items: center; justify-content: center; transition: all 0.25s ease; flex-shrink: 0; margin-left: 16px; border-radius: 10px; width: 40px; height: 40px; }
.close-btn:hover { background: #e2e8f0; color: #0f172a; transform: rotate(90deg); }
.modal-body { padding: 36px; flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; -ms-overflow-style: none; }
.modal-body::-webkit-scrollbar { display: none; }
.form-title { font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1.2px; }
.form-group { display: flex; flex-direction: column; margin-bottom: 20px; }
.form-group label { font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.8px; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.form-group input { width: 100%; padding: 12px 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; color: #334155; font-size: 14px; font-weight: 500; font-family: inherit; transition: all 0.3s ease; }
.form-group input::placeholder { color: #cbd5e1; font-weight: 400; }
.form-group input:hover { border-color: #cbd5e1; background: #ffffff; }
.form-group input:focus { outline: none; border-color: #3b82f6; background: #ffffff; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08); }
.form-group input:disabled { opacity: 0.6; cursor: not-allowed; background: #f1f5f9; }
.password-toggle { position: absolute; right: 12px; background: none; border: none; color: #64748b; cursor: pointer; padding: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.25s ease; border-radius: 6px; }
.password-toggle:hover { color: #3b82f6; background: #f1f5f9; }
.btn-group { display: flex; gap: 12px; justify-content: flex-end; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
.btn { padding: 12px 28px; border: none; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 700; transition: all 0.3s ease; letter-spacing: 0.3px; }
.btn-primary { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; flex: 1; }
.btn-primary:hover:not(:disabled) { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); transform: translateY(-2px); box-shadow: 0 12px 24px rgba(37, 99, 235, 0.35); }
.btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.btn-secondary { background: #f1f5f9; border: 1.5px solid #e2e8f0; color: #475569; flex: 1; }
.btn-secondary:hover:not(:disabled) { background: #eff6ff; border-color: #3b82f6; color: #0f172a; transform: translateY(-2px); }
.btn-secondary:disabled { opacity: 0.55; cursor: not-allowed; }
.alert { padding: 14px 16px; border-radius: 10px; margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; font-size: 13px; font-weight: 500; line-height: 1.5; animation: slideDown 0.3s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.alert.success { background: rgba(16, 185, 129, 0.12); border: 1.5px solid rgba(16, 185, 129, 0.35); color: #059669; }
.alert.error { background: rgba(239, 68, 68, 0.12); border: 1.5px solid rgba(239, 68, 68, 0.35); color: #dc2626; }
.required { color: #ef4444; font-weight: 700; }
@media (max-width: 600px) { .modal-header { padding: 28px 28px 24px; } .modal-body { padding: 28px; } .modal-header h1 { font-size: 24px; } .btn-group { flex-direction: column-reverse; gap: 10px; } .btn { width: 100%; } }
`;

export default function CreateBankAdmin({ onClose }) {
  const [formData, setFormData] = useState({ bankId: '', username: '', email: '', password: '' });
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

    if (!formData.bankId || !formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
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

    setLoading(true);

    try {
      const response = await fetch('/api/super/bank-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankId: parseInt(formData.bankId), ...formData }),
      });

      if (response.ok) {
        setSuccess('Bank Admin created successfully!');
        setFormData({ bankId: '', username: '', email: '', password: '' });
        setShowPassword(false);
        setTimeout(() => onClose?.(), 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to create bank admin');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ bankId: '', username: '', email: '', password: '' });
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1>Create Bank Admin</h1>
              <p>Add a new administrator account for a bank</p>
            </div>
            <button className="close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title">Bank Admin Details</div>

            {error && <div className="alert error"><AlertCircle size={18} /><span>{error}</span></div>}
            {success && <div className="alert success"><CheckCircle size={18} /><span>{success}</span></div>}

            <div className="form-group">
              <label>Bank ID <span className="required">*</span></label>
              <input type="number" name="bankId" value={formData.bankId} onChange={handleChange} placeholder="Enter bank ID" disabled={loading} />
            </div>

            <div className="form-group">
              <label>Username <span className="required">*</span></label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" disabled={loading} />
            </div>

            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" disabled={loading} />
            </div>

            <div className="form-group">
              <label>Password <span className="required">*</span></label>
              <div className="input-wrapper">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter password (min 6 characters)" disabled={loading} />
                <button className="password-toggle" onClick={() => setShowPassword(!showPassword)} type="button" title={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-secondary" onClick={handleClear} disabled={loading}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Bank Admin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}