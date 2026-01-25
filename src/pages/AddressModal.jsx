import { Loader, MapPin, Camera, Navigation, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AddressesPage({ loanNumber, onBack, onStartVisit }) {
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressError, setAddressError] = useState(null);

  const API_BASE = 'http://localhost:8080/api/fe';

  useEffect(() => {
    fetchAddresses();
  }, [loanNumber]);

  const fetchAddresses = async () => {
    setAddressLoading(true);
    setAddressError(null);
    setAddresses([]);

    try {
      const response = await fetch(`${API_BASE}/cases/${loanNumber}/addresses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
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

  const handleNavigate = (address) => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const styles = `
    .addresses-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .addresses-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .addresses-header h1 {
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

    .addresses-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .address-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }

    .address-card:hover {
      border-color: #2563eb;
      background: #f8fafc;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    }

    .address-info {
      display: flex;
      gap: 16px;
      flex: 1;
      align-items: flex-start;
    }

    .address-icon {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: #eff6ff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      flex-shrink: 0;
    }

    .address-details {
      flex: 1;
    }

    .address-label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }

    .address-text {
      font-size: 15px;
      color: #334155;
      line-height: 1.6;
      font-weight: 500;
    }

    .address-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }

    .action-btn {
      padding: 10px 18px;
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
      white-space: nowrap;
    }

    .action-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }

    .action-primary:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
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

    @media (max-width: 768px) {
      .addresses-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .addresses-header h1 {
        font-size: 24px;
      }

      .address-card {
        flex-direction: column;
        align-items: flex-start;
      }

      .address-actions {
        width: 100%;
        margin-top: 16px;
      }

      .action-btn {
        flex: 1;
      }

      .loan-info-value {
        font-size: 24px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="addresses-container">
        <div className="addresses-header">
          <h1>Visit Addresses</h1>
          <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={18} /> Back
          </button>
        </div>

        <div className="loan-info-card">
          <div className="loan-info-label">Loan Number</div>
          <div className="loan-info-value">{loanNumber}</div>
        </div>

        {addressError && (
          <div className="error-message">{addressError}</div>
        )}

        {addressLoading ? (
          <div className="loading-container">
            <Loader size={40} />
            <span style={{ marginTop: '16px', fontSize: '16px' }}>Loading addresses...</span>
          </div>
        ) : addresses.length > 0 ? (
          <div className="addresses-list">
            {addresses.map((address, idx) => (
              <div key={idx} className="address-card">
                <div className="address-info">
                  <div className="address-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="address-details">
                    <div className="address-label">Address</div>
                    <div className="address-text">{address}</div>
                  </div>
                </div>
                <div className="address-actions">
                  <button
                    className="action-btn action-primary"
                    onClick={() => onStartVisit(loanNumber, address)}
                  >
                    <Camera size={14} /> Start
                  </button>
                  <button
                    className="action-btn action-primary"
                    onClick={() => handleNavigate(address)}
                  >
                    <Navigation size={14} /> Go
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No addresses available for this loan.</p>
          </div>
        )}
      </div>
    </>
  );
}