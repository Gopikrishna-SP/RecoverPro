import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

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
    color: #ffffff;
    margin-bottom: 8px;
  }

  .header p {
    font-size: 14px;
    color: #94a3b8;
  }

  .form-container {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 32px;
  }

  .form-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
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
    color: #cbd5e1;
    margin-bottom: 8px;
  }

  .form-group input {
    padding: 10px 12px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 6px;
    color: #ffffff;
    font-size: 13px;
    transition: all 0.3s ease;
  }

  .form-group input::placeholder {
    color: #64748b;
  }

  .form-group input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }

  .form-group input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-group {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 32px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
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
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    color: #cbd5e1;
  }

  .btn-secondary:hover:not(:disabled) {
    border-color: rgba(59, 130, 246, 0.5);
    color: #e2e8f0;
  }

  .btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .alert {
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
  }

  .alert.success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #6ee7b7;
  }

  .alert.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
  }

  .required {
    color: #fca5a5;
  }
`;

export default function CreateBank() {
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
      <div className="container">
        <div className="header">
          <h1>Create Bank</h1>
          <p>Add a new bank to the system</p>
        </div>

        <div className="form-container">
          <div className="form-title">Bank Information</div>

          {error && <div className="alert error"><AlertCircle size={16} />{error}</div>}
          {success && <div className="alert success"><CheckCircle size={16} />{success}</div>}

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
    </>
  );
}