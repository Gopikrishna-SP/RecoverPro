import { useState, useEffect, useMemo } from 'react';
import { Search, Download, Eye, Edit, Trash2 } from 'lucide-react';

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
  background: #f8fafc;
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
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.export-btn {
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

.export-btn:hover {
  border-color: #2563eb;
  background: #eff6ff;
  color: #0f172a;
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  height: 8px;
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: transparent;
}

.table-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
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
  min-width: 100px;
}

td {
  padding: 10px;
  font-size: 11px;
  color: #334155;
  border-bottom: 1px solid #e5e7eb;
  min-width: 100px;
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

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  display: inline-block;
}

.badge.paid {
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
}

.badge.partial {
  background: rgba(251, 146, 60, 0.2);
  color: #d97706;
}

.user-badge {
  background: #ede9fe;
  color: #7c3aed;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  display: inline-block;
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
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.page-btn {
  padding: 6px 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #2563eb;
  background: #eff6ff;
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

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (max-width: 768px) {
  .table-container {
    height: 300px;
  }

  .controls {
    flex-direction: column;
  }

  .search-box {
    min-width: auto;
  }
}
`;

const ALL_COLUMNS = [
  'id', 'segment', 'product', 'state', 'branch', 'location', 'loanNumber', 'customerName',
  'posInCr', 'emi', 'bkt', 'visitDate', 'disp', 'projection',
  'amount', 'ptpDate', 'reasonForDefault', 'contactability', 'residenceStatus',
  'officeStatus', 'classificationCode', 'fieldUpdateFeedback', 'userId', 'createdBy', 'createdDate'
];

export default function VisitLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitLogs, setVisitLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVisitLogs();
  }, []);

  const fetchVisitLogs = async () => {
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/visit-logs/allocation/get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setVisitLogs(data);
      } else {
        console.error('Failed to fetch visit logs');
      }
    } catch (err) {
      console.error('Failed to fetch visit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return visitLogs;
    const search = searchTerm.toLowerCase();
    return visitLogs.filter(item =>
      item.loanNumber?.toLowerCase().includes(search) ||
      item.customerName?.toLowerCase().includes(search) ||
      item.createdBy?.toLowerCase().includes(search) ||
      item.userId?.toString().toLowerCase().includes(search)
    );
  }, [searchTerm, visitLogs]);

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

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `visit_log_${Date.now()}.csv`);
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
          <h1>Visit Log</h1>
          <p>Track all customer visits with comprehensive details</p>
        </div>

        <div className="controls">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by loan number, customer name, or user..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="export-btn" onClick={handleExport} disabled={paginatedData.length === 0}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat-info">
            Total: <strong>{filteredData.length}</strong> visits
          </div>
          <div className="stat-info">
            Page: <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            {loading ? (
              <div className="empty-state">
                <h3>Loading...</h3>
                <p>Fetching visit logs...</p>
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
                          {col === 'amount' || col === 'emi' || col === 'posInCr'
                            ? <span className="currency">₹{typeof row[col] === 'number' ? row[col].toLocaleString() : row[col] || '-'}</span>
                            : col === 'visitDate' || col === 'ptpDate' || col === 'createdDate'
                            ? <span className="date">{row[col] || '-'}</span>
                            : col === 'disp'
                            ? <span className={`badge ${row[col]?.toLowerCase()}`}>{row[col] || '-'}</span>
                            : col === 'createdBy' || col === 'userId'
                            ? <span className="user-badge">{row[col] || '-'}</span>
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
                <h3>No visits found</h3>
                <p>Try adjusting your search criteria</p>
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