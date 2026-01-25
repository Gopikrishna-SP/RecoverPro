import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Eye, Edit, Trash2, Upload } from 'lucide-react';

const styles = `
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
  color: #0f172a;
  margin-bottom: 8px;
}

.header p {
  font-size: 14px;
  color: #64748b;
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
  color: #64748b;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #334155;
  font-size: 13px;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #cbd5e1;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  background: #f8fafc;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-group {
  display: flex;
  gap: 12px;
}

.export-btn, .upload-btn {
  padding: 10px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #64748b;
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
  border-color: #2563eb;
  background: #f1f5f9;
  color: #0f172a;
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.file-input {
  display: none;
}

.stats-bar {
  background: #ffffff;
  border: 1px solid #e5e7eb;
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
  color: #64748b;
}

.stat-info strong {
  color: #0f172a;
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
  color: #059669;
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
}

.status-message.loading {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #2563eb;
}

.close-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
}

.table-wrapper {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
  max-height: 75vh;
  overflow-y: auto;
}

.table-container::-webkit-scrollbar {
  height: 14px;
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: transparent;
}

.table-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
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
  background: #f8fafc;
  z-index: 10;
}

th {
  text-align: left;
  padding: 12px 10px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  border-bottom: 1px solid #e5e7eb;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  background: #f8fafc;
  min-width: 80px;
}

td {
  padding: 10px;
  font-size: 11px;
  color: #334155;
  border-bottom: 1px solid #e5e7eb;
  min-width: 80px;
}

tr:hover {
  background: #f1f5f9;
}

.currency {
  color: #059669;
  font-weight: 500;
}

.date {
  color: #2563eb;
}

.action-btns {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}

.action-btn {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.empty-state {
  padding: 48px 24px;
  text-align: center;
}

.empty-state h3 {
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
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
  gap: 4px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.page-btn {
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #64748b;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #2563eb;
  background: #f1f5f9;
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

.pagination-info {
  font-size: 12px;
  color: #64748b;
  margin: 0 8px;
}

@media (max-width: 768px) {
  .table-container {
    height: 300px;
  }
}
`;

const ALL_COLUMNS = [
  'SEGMENT', 'PRODUCT', 'ZONE', 'STATE', 'BRANCH', 'LOCATION', 'LOANNUMBER', 'CUSTOMER NAME',
  'DISBURSED AMOUNT (IN CR)', 'DISBURSED DATE', 'POS (IN CR)', 'POS Amt', 'EMI', 'EMI START DATE',
  'Main_Applicant_Mobile_No', 'Main_applicant_Name', 'MANAGER', 'AGENCY'
];


const API_BASE_URL = 'http://localhost:8080/api';

export default function AllocationsList() {
  const navigate = useNavigate();
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(null);
  const [fileInputRef, setFileInputRef] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      if (!token) {
        setStatus({ type: 'error', message: 'Please login first' });
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
        localStorage.clear();
        setStatus({ type: 'error', message: 'Session expired. Please login.' });
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      const flattenedData = data.map(item => ({
        id: item.id,
        loanNumber: item.loanNumber,
        status: item.status,
        visitCount: item.visitCount,
        ...item.allocationData,
      }));

      setAllocations(flattenedData);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to load: ' + err.message });
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
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      if (!token) throw new Error('Please login first');

      const response = await fetch(`${API_BASE_URL}/allocations/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        localStorage.clear();
        throw new Error('Session expired');
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Upload failed');
      }

      const data = await response.json();
      setStatus({
        type: 'success',
        message: `${data.recordsInserted} records uploaded successfully`,
      });

      e.target.value = '';
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
      (item.LOANNUMBER?.toString().toLowerCase().includes(search)) ||
      (item['CUSTOMER NAME']?.toString().toLowerCase().includes(search)) ||
      (item.Main_Applicant_Mobile_No?.toString().includes(search))
    );
  }, [searchTerm, allocations]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handleExport = () => {
    const headers = ALL_COLUMNS.join(',');
    const rows = paginatedData.map(row =>
      ALL_COLUMNS.map(col => {
        const val = row[col];
        return typeof val === 'string' ? `"${val || ''}"` : (val || '');
      }).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `allocations-${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Allocations</h1>
          <p>View and manage loan allocations</p>
        </div>

        {status && (
          <div className={`status-message ${status.type}`}>
            <span>{status.message}</span>
            <button className="close-btn" onClick={() => setStatus(null)}>×</button>
          </div>
        )}

        <div className="controls">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search loan, customer, mobile..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="btn-group">
            <input
              ref={setFileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="file-input"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <button
              className="upload-btn"
              onClick={() => navigate('/loans/upload')}
            >
              <Upload size={14} /> Upload
            </button>
            <button className="export-btn" onClick={handleExport} disabled={paginatedData.length === 0}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-info">Total: <strong>{filteredData.length}</strong></div>
          <div className="stat-info">Page: <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong></div>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            {loading ? (
              <div className="empty-state"><h3>Loading...</h3></div>
            ) : paginatedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {ALL_COLUMNS.map(col => <th key={col}>{col}</th>)}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={row.id || idx}>
                      {ALL_COLUMNS.map(col => (
                        <td key={`${idx}-${col}`} title={row[col] || '-'}>
                          {row[col] || '-'}
                        </td>
                      ))}
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="View"><Eye size={12} /></button>
                          <button className="action-btn" title="Edit"><Edit size={12} /></button>
                          <button className="action-btn delete" title="Delete"><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state"><h3>No data</h3></div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>

              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span className="pagination-info">{currentPage} / {totalPages}</span>

              <button
                className="page-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              <button
                className="page-btn"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}