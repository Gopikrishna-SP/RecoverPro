import { Loader, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CaseDetailsPage({ loanNumber, onBack }) {
  const [caseDetails, setCaseDetails] = useState([]);
  const [caseDetailsLoading, setCaseDetailsLoading] = useState(true);
  const [caseDetailsError, setCaseDetailsError] = useState(null);

  const API_BASE = 'http://localhost:8080/api/fe';

  useEffect(() => {
    fetchCaseDetails();
  }, [loanNumber]);

  const fetchCaseDetails = async () => {
    setCaseDetailsLoading(true);
    setCaseDetailsError(null);
    setCaseDetails([]);

    try {
      const response = await fetch(`${API_BASE}/cases`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
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

  const styles = `
    .case-details-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .case-details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .case-details-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .back-btn {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border-radius: 6px;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 600;
    }

    .back-btn:hover {
      background: rgba(59, 130, 246, 0.1);
      color: #2563eb;
    }

    .loan-info-card {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
      color: white;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    }

    .loan-info-label {
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 600;
      opacity: 0.9;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .loan-info-value {
      font-size: 28px;
      font-weight: 700;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .detail-field {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 20px;
      transition: all 0.3s ease;
    }

    .detail-field:hover {
      background: #f8fafc;
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    }

    .detail-field label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 8px;
    }

    .detail-field span {
      font-size: 16px;
      font-weight: 600;
      color: #334155;
      word-break: break-word;
      line-height: 1.5;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 24px;
      color: #64748b;
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #dc2626;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 24px;
      color: #64748b;
    }

    @media (max-width: 1024px) {
      .details-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .case-details-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .case-details-header h1 {
        font-size: 24px;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }

      .loan-info-value {
        font-size: 24px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="case-details-container">
        <div className="case-details-header">
          <h1>Case Details</h1>
          <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={18} /> Back
          </button>
        </div>

        <div className="loan-info-card">
          <div className="loan-info-label">Loan Number</div>
          <div className="loan-info-value">{loanNumber}</div>
        </div>

        {caseDetailsError && (
          <div className="error-message">{caseDetailsError}</div>
        )}

        {caseDetailsLoading ? (
          <div className="loading-container">
            <Loader size={40} />
            <span style={{ marginTop: '16px', fontSize: '16px' }}>Loading case details...</span>
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
          <div className="empty-state">
            <p>No case details available.</p>
          </div>
        )}
      </div>
    </>
  );
}
