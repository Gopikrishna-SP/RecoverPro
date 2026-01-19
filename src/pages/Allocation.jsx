import { useState, useMemo, useEffect } from 'react';
import { Search, Download, Eye, Edit, Trash2, Upload } from 'lucide-react';

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
    max-width: 100%;
    margin: 0 auto;
    padding: 32px;
  }

  .header {
    margin-bottom: 32px;
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

  .controls {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 250px;
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 8px;
    color: #ffffff;
    font-size: 13px;
    transition: all 0.3s ease;
  }

  .search-input::placeholder {
    color: #64748b;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .btn-group {
    display: flex;
    gap: 12px;
  }

  .export-btn, .upload-btn {
    padding: 10px 16px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    color: #cbd5e1;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .export-btn:hover, .upload-btn:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
    color: #e2e8f0;
  }

  .upload-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .file-input {
    display: none;
  }

  .stats-bar {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .stat-info {
    font-size: 13px;
    color: #cbd5e1;
  }

  .stat-info strong {
    color: #e2e8f0;
  }

  .status-message {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-message.success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10b981;
  }

  .status-message.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }

  .status-message.loading {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
  }

  .close-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 18px;
  }

  .table-wrapper {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    overflow: hidden;
  }

  .table-container {
    overflow-x: auto;
    max-height: 75vh;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    min-width: max-content;
  }

  thead {
    position: sticky;
    top: 0;
    background: rgba(15, 23, 42, 0.9);
    z-index: 10;
  }

  th {
    text-align: left;
    padding: 12px 10px;
    font-size: 10px;
    font-weight: 700;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
    background: rgba(15, 23, 42, 0.95);
    min-width: 80px;
  }

  td {
    padding: 10px;
    font-size: 11px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.1);
    min-width: 80px;
  }

  tr:hover {
    background: rgba(59, 130, 246, 0.05);
  }

  .currency {
    color: #10b981;
    font-weight: 500;
  }

  .date {
    color: #60a5fa;
  }

  .action-btns {
    display: flex;
    gap: 4px;
    white-space: nowrap;
  }

  .action-btn {
    background: none;
    border: none;
    color: #60a5fa;
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 3px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .action-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #93c5fd;
  }

  .action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
  }

  .empty-state {
    padding: 48px 24px;
    text-align: center;
  }

  .empty-state h3 {
    font-size: 16px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
  }

  .empty-state p {
    font-size: 13px;
    color: #94a3b8;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid rgba(71, 85, 105, 0.2);
  }

  .page-btn {
    padding: 6px 12px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    color: #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border-color: transparent;
  }

  @media (max-width: 768px) {
    .table-container {
      max-height: 60vh;
    }
    th, td {
      padding: 8px 6px;
      font-size: 10px;
    }
  }
`;

const ALL_COLUMNS = [
  'SEGMENT', 'PRODUCT', 'ZONE', 'STATE', 'BRANCH', 'LOCATION', 'LOANNUMBER', 'CUSTOMER NAME',
  'DISBURSED AMOUNT (IN CR)', 'DISBURSED DATE', 'POS (IN CR)', 'POS Amt', 'EMI', 'EMI START DATE', 'EMI END DATE',
  'BKT TAG', 'OPENING BKT', 'ASHV DA/PTC', 'SECURITIZATION', 'SE/INSE', 'AGENCY CODE', 'AGENCY',
  'MANAGER EMP ID', 'MANAGER', 'ZM EMP ID', 'ZONAL MANAGER', 'Main_Applicant_Mobile_No', 'Main_applicant_Name',
  'Co_Applicant1_Name', 'Co_Applicant1_Mobile_No', 'Relation_with_Main_Applicant', 'address_priority_1',
  'address_priority_2', 'address_priority_3', 'address_priority_4', 'address_priority_5', 'address_priority_6',
  'address_priority_7', 'address_priority_8', 'business_pin_code', 'residence_pin_code', 'main_pincode',
  'pan_main_app', 'dob_main_app', 'pan_co_app', 'dob_co_app', 'address_1', 'address_2', 'address_3', 'address_4',
  'address_5', 'address_6', 'address_7', 'address_8', 'address_9', 'address_10', 'phone_1', 'phone_2', 'phone_3',
  'phone_4', 'phone_5', 'phone_6', 'phone_7', 'phone_8', 'phone_9', 'phone_10', 'MONTH - LAST NOTICE', 'LRN 1',
  'LRN MONTH 2', 'LRN 2', 'LRN MONTH 3', 'LRN 3', 'REVISED STAGE IN ARBITRATION (20.11.2025)', 'ADVOCATE ON RECORD (20.11.2025)',
  'ARBITRATION INVOKATION DATE  1   (20.11.2025)', 'ARBITRATION INVOKATION DATE  2  (20.11.2025)', 'TENTATIVE DATE TO ISSUE REFERENCE (20.11.2025)',
  'LETTER TO ARBITRATOR (20.11.2025)', 'TENTATIVE DATE FOR FREEZING AND OTHER ORDERS (20.11.2025)', 'RELIEF (20.11.2025)', 'NODH',
  'MONTH OF NOTICE', 'NOTICE DATE', 'Date of Filling Confrmation', 'SEC 25- FILED/NOT FILED', 'SEC 25 -  PROCESS STAGE',
  'SEC 25 -  LDOH', 'SEC 25 -  NDOH', 'LISTING DATE', 'DATE OF FILING', 'COURT/FORUM', 'Case Number', 'ADVOCATE NAME',
  'ADVOCATE\'S CONTACT NUMBER', 'AUTHORIZED OFFICER', 'STAGE 1 - FOR VERIFICATION', 'STAGE 1 - HEARING ON',
  'STAGE 2 - SUMMONS STAGE', 'STAGE 2 - SUMMONS COLLECTED/ NOT COLLECTED/ DISPATCHED/ NOT DISPATCHED', 'STAGE 3 - APPERANCE/ NON APPEARANCE',
  'STAGE 3 - HEARING ON', 'STAGE 4 - BAILABLE WARRANT ISSUED DATE', 'STAGE 4 - BAILABLE WARRANT COLLECTED/ NOT COLLECTED/ DISPATCHED/ NOT DISPATCHED',
  'LOCATION FILLING', 'CASE NUMBER', 'Case Withdrawal Date', 'REMARKS', 'CLAIM AMOUNT', 'BW RE ISSUED DATE', 'BW RE ISSUED COLLECTION DATE',
  'STAGE 5 - NON BAILABLE WARRANT ISSUED DATE', 'STAGE 5 - NON BAILABLE WARRANT COLLECTED/ NOT COLLECTED/ DISPATCHED/ NOT DISPATCHED',
  'STAGE 6 - NON BAILABLE WARRANT REISSUED DATE', 'STAGE 7 - NON BAILABLE WARRANT REISSUED DATE', 'STAGE 8 - NON BAILABLE WARRANT REISSUED DATE',
  'STAGE 5 - PROCLAMATION ISSUED DATE', 'STAGE 5 - PROCLAMATION ISSUED/ COLLECTED/ DISPATCHED', 'STAGE 5 - PROCLAMATION COLLECTED / NOT COLLECTED',
  'STAGE 5 - ATTACHMENT OF PROPERTY COLLECTED/ NOT COLLECTED',
  'Account Holder 1', 'BANK NAME 1', 'ACCOUNT NUMBER 1', 'IFSC CODE 1', 'Account Holder 2', 'BANK NAME 2',
  'ACCOUNT NUMBER 2', 'IFSC CODE 2', 'Account Holder 3', 'BANK NAME 3', 'ACCOUNT NUMBER 3', 'IFSC CODE 3'
];

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

export default function AllocationsList() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(null);
  const fileInputRef = useState(null)[1];
  const itemsPerPage = 10;

  // Fetch allocations on component mount
  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setStatus({ type: 'error', message: 'Authentication token not found. Please login again.' });
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/allocations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setStatus({ type: 'error', message: 'Session expired. Please login again.' });
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch allocations');
      const data = await response.json();
      
      // Flatten the allocationData structure
      const flattenedData = data.map(item => ({
        id: item.id,
        loanNumber: item.loanNumber,
        fieldExecutiveId: item.fieldExecutiveId,
        status: item.status,
        assignedAt: item.assignedAt,
        lastVisitedAt: item.lastVisitedAt,
        visitCount: item.visitCount,
        ...item.allocationData, // Spread all allocation data properties at root level
      }));
      
      setAllocations(flattenedData);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to load allocations: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await fetch(`${API_BASE_URL}/allocations/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setStatus({
        type: 'success',
        message: `${data.recordsInserted} records inserted successfully`,
      });
      await fetchAllocations();
    } catch (err) {
      setStatus({ type: 'error', message: 'Upload failed: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return allocations;
    const search = searchTerm.toLowerCase();
    return allocations.filter(item =>
      (item.LOANNUMBER?.toLowerCase().includes(search)) ||
      (item['CUSTOMER NAME']?.toLowerCase().includes(search)) ||
      (item.Main_Applicant_Mobile_No?.toString().includes(search)) ||
      (item.Main_applicant_Name?.toLowerCase().includes(search))
    );
  }, [searchTerm, allocations]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handleExport = () => {
    const csv = [
      ALL_COLUMNS.join(','),
      ...paginatedData.map(row =>
        ALL_COLUMNS.map(col => {
          const val = row[col];
          return typeof val === 'string' ? `"${val || ''}"` : (val || '');
        }).join(',')
      ),
    ].join('\n');

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'allocations.csv';
    link.click();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Allocations</h1>
          <p>View all loan allocations with 150+ fields</p>
        </div>

        {status && (
          <div className={`status-message ${status.type}`}>
            <span>{status.message}</span>
            <button
              className="close-btn"
              onClick={() => setStatus(null)}
            >
              ×
            </button>
          </div>
        )}

        <div className="controls">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by loan, customer, mobile, applicant..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="btn-group">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="file-input"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <button
              className="upload-btn"
              onClick={() => fileInputRef?.click?.()}
              disabled={loading}
            >
              <Upload size={14} /> Upload Excel
            </button>
            <button className="export-btn" onClick={handleExport}>
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-info">
            Total: <strong>{filteredData.length}</strong> allocations
          </div>
          <div className="stat-info">
            Page: <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            {loading ? (
              <div className="empty-state">
                <h3>Loading allocations...</h3>
              </div>
            ) : paginatedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {ALL_COLUMNS.map(col => (
                      <th key={col}>{col}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={row.id || idx}>
                      {ALL_COLUMNS.map(col => (
                        <td key={`${idx}-${col}`} title={row[col] || '-'}>
                          {col.includes('Amount') || col.includes('Emi')
                            ? <span className="currency">₹{row[col]?.toLocaleString() || '-'}</span>
                            : col.includes('Date')
                            ? <span className="date">{row[col] || '-'}</span>
                            : row[col] || '-'}
                        </td>
                      ))}
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="View">
                            <Eye size={12} />
                          </button>
                          <button className="action-btn" title="Edit">
                            <Edit size={12} />
                          </button>
                          <button className="action-btn delete" title="Delete">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <h3>No allocations found</h3>
                <p>Try adjusting your search criteria or upload a file</p>
              </div>
            )}
          </div>

          {paginatedData.length > 0 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}