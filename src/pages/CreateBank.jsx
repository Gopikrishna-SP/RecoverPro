import { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

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
.modal-body { 
  padding: 28px; 
  flex: 1; 
  overflow-y: auto; 
  overflow-x: hidden; 
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.modal-body::-webkit-scrollbar { 
  width: 4px; 
}

.modal-body::-webkit-scrollbar-track { 
  background: transparent; 
}

.modal-body::-webkit-scrollbar-thumb { 
  background-color: #cbd5e1; 
  border-radius: 2px; 
  border: 1px solid transparent;
}

.modal-body::-webkit-scrollbar-thumb:hover { 
  background-color: #94a3b8; 
}
.form-title { font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1.2px; }
.form-group { display: flex; flex-direction: column; margin-bottom: 20px; }
.form-group label { font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.8px; }
.form-group input { width: 100%; padding: 12px 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; color: #334155; font-size: 14px; font-weight: 500; font-family: inherit; transition: all 0.3s ease; }
.form-group input::placeholder { color: #cbd5e1; font-weight: 400; }
.form-group input:hover { border-color: #cbd5e1; background: #ffffff; }
.form-group input:focus { outline: none; border-color: #3b82f6; background: #ffffff; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08); }
.form-group input:disabled { opacity: 0.6; cursor: not-allowed; background: #f1f5f9; }
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

export default function CreateBank({ onClose }) {
  const [bankName, setBankName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!bankName.trim()) {
      setError('Bank name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/super/banks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankName: bankName.trim() }),
      });

      if (response.ok) {
        setSuccess('Bank created successfully!');
        setBankName('');
        setTimeout(() => onClose?.(), 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to create bank');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBankName('');
    setError('');
    setSuccess('');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1>Create Bank</h1>
              <p>Add a new bank to the system</p>
            </div>
            <button className="close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-title">Bank Information</div>

            {error && <div className="alert error"><AlertCircle size={18} /><span>{error}</span></div>}
            {success && <div className="alert success"><CheckCircle size={18} /><span>{success}</span></div>}

            <div className="form-group">
              <label>Bank Name <span className="required">*</span></label>
              <input 
                type="text" 
                value={bankName} 
                onChange={(e) => setBankName(e.target.value)} 
                placeholder="Enter bank name" 
                disabled={loading}
              />
            </div>

            <div className="btn-group">
              <button className="btn btn-secondary" onClick={handleClear} disabled={loading}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Bank'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}