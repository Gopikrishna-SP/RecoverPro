import { useState, useEffect, useMemo } from 'react';
import { Search, Download, Eye, Loader } from 'lucide-react';

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

  .export-btn {
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

  .export-btn:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
    color: #e2e8f0;
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

  .table-wrapper {
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 100%);
    border: 1px solid rgba(71, 85, 105, 0.2);
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
    background: linear-gradient(135deg, #0a131f 0%, #0f1b2e 100%);
    z-index: 10;
  }

  th {
    text-align: left;
    padding: 14px 12px;
    font-size: 10px;
    font-weight: 700;
    color: #8b94a5;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    background: linear-gradient(135deg, #0a131f 0%, #0f1b2e 100%);
    min-width: 100px;
  }

  td {
    padding: 12px;
    font-size: 12px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.15);
    min-width: 100px;
  }

  tr:hover {
    background: rgba(59, 130, 246, 0.08);
  }

  .currency {
    color: #10b981;
    font-weight: 500;
  }

  .date {
    color: #60a5fa;
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
    color: #6ee7b7;
  }

  .badge.rtp {
    background: rgba(251, 146, 60, 0.2);
    color: #fdba74;
  }

  .badge.nc-skip {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
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

  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
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

  .error-msg {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(71, 85, 105, 0.3);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(71, 85, 105, 0.5);
  }
`;

const COLUMNS = [
  'loanNumber', 'customerName', 'segment', 'product', 'location',
  'visitDate', 'disp', 'contactability', 'residenceStatus', 'classificationCode',
  'projection', 'amount', 'ptpDate', 'fieldUpdateFeedback'
];

export default function MyVisit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitLogs, setVisitLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchVisitLogs();
  }, []);

  const fetchVisitLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/visit-logs/my-visits', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVisitLogs(Array.isArray(data) ? data : []);
      } else if (response.status === 404) {
        setVisitLogs([]);
      } else {
        throw new Error(`Server error ${response.status}`);
      }
    } catch (err) {
      setError(`Failed to fetch visit logs: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return visitLogs;
    const search = searchTerm.toLowerCase();
    return visitLogs.filter(item =>
      (item.loanNumber?.toLowerCase().includes(search)) ||
      (item.customerName?.toLowerCase().includes(search)) ||
      (item.location?.toLowerCase().includes(search))
    );
  }, [searchTerm, visitLogs]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handleExport = () => {
    const csv = [
      COLUMNS.join(','),
      ...paginatedData.map(row =>
        COLUMNS.map(col => {
          const val = row[col];
          return typeof val === 'string' ? `"${val || ''}"` : (val || '');
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `my_visit_log_${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeClass = (disp) => {
    if (disp === 'PAID') return 'badge paid';
    if (disp === 'RTP') return 'badge rtp';
    if (disp === 'NC_SKIP') return 'badge nc-skip';
    return 'badge';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>My Visit Logs</h1>
          <p>Track your field visits and collection activities</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="controls">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by loan number, customer name, or location..."
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
            Total Visits: <strong>{filteredData.length}</strong>
          </div>
          <div className="stat-info">
            Page: <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            {loading ? (
              <div className="loading-state">
                <Loader size={32} />
                <span style={{ marginLeft: '12px' }}>Loading your visit logs...</span>
              </div>
            ) : paginatedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {COLUMNS.map(col => (
                      <th key={col}>{col.replace(/([A-Z])/g, ' $1').trim()}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={row.id || idx}>
                      {COLUMNS.map(col => (
                        <td key={`${idx}-${col}`} title={row[col] || '-'}>
                          {col === 'amount'
                            ? <span className="currency">₹{typeof row[col] === 'number' ? row[col].toLocaleString() : row[col] || '-'}</span>
                            : col === 'visitDate' || col === 'ptpDate'
                            ? <span className="date">{row[col] || '-'}</span>
                            : col === 'disp'
                            ? <span className={getBadgeClass(row[col])}>{row[col] || '-'}</span>
                            : row[col] || '-'}
                        </td>
                      ))}
                      <td>
                        <div className="action-btns">
                          <button className="action-btn" title="View Details">
                            <Eye size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <h3>No visit logs found</h3>
                <p>Start recording your field visits to see them here</p>
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