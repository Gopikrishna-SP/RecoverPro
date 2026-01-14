import { useState, useMemo } from 'react';
import { Search, Download, Eye, Edit, Trash2 } from 'lucide-react';

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
    min-width: 100px;
  }

  td {
    padding: 10px;
    font-size: 11px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(71, 85, 105, 0.1);
    min-width: 100px;
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

  .badge.partial {
    background: rgba(251, 146, 60, 0.2);
    color: #fdba74;
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
`;

const ALL_COLUMNS = [
  'segment', 'product', 'state', 'branch', 'location', 'loanNumber', 'customerName',
  'posInCr', 'emi', 'bkt', 'visitId', 'visitDate', 'disp', 'projection', 'amount',
  'ptpDate', 'reasonForDefault', 'contactability', 'residenceStatus', 'officeStatus',
  'classificationCode', 'fieldUpdateFeedback', 'geoAddress', 'createdBy'
];

const dummyData = [
  {
    segment: 'Premium',
    product: 'Home Loan',
    state: 'Karnataka',
    branch: 'Bangalore',
    location: 'Indiranagar',
    loanNumber: 'GS030MSM4276543',
    customerName: 'GOLDEN ENTERPRISES',
    posInCr: 5,
    emi: 45000,
    bkt: '2-3',
    visitId: 1,
    visitDate: '2026-01-13',
    disp: 'PAID',
    projection: 'WORKABLE',
    amount: 350000,
    ptpDate: '2026-02-13',
    reasonForDefault: 'BUSINESS_CLOSED',
    contactability: 'CONTACTED_AT_RESIDENCE',
    residenceStatus: 'AVAILABLE',
    officeStatus: 'ADDRESS_NOT_TRACED',
    classificationCode: 'WORKABLE_1_INHOUSE_FIELD',
    fieldUpdateFeedback: 'Customer confirmed',
    geoAddress: 'Indiranagar, Bangalore',
    createdBy: 'Neha Gupta'
  },
  {
    segment: 'Standard',
    product: 'Personal Loan',
    state: 'Karnataka',
    branch: 'Bangalore',
    location: 'Whitefield',
    loanNumber: 'GS035FEB5389012',
    customerName: 'STELLAR TRADING',
    posInCr: 3,
    emi: 28000,
    bkt: '1-2',
    visitId: 2,
    visitDate: '2026-01-12',
    disp: 'PARTIAL',
    projection: 'DOUBTFUL',
    amount: 900000,
    ptpDate: '2026-01-20',
    reasonForDefault: 'BUSINESS_CLOSED',
    contactability: 'CONTACTED_AT_OFFICE',
    residenceStatus: 'NOT_AVAILABLE',
    officeStatus: 'AVAILABLE',
    classificationCode: 'DOUBTFUL_2_COLLECTOR',
    fieldUpdateFeedback: 'Office closed temporarily',
    geoAddress: 'Whitefield, Bangalore',
    createdBy: 'Neha Gupta'
  }
];

export default function VisitLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!searchTerm) return dummyData;
    const search = searchTerm.toLowerCase();
    return dummyData.filter(item =>
      item.loanNumber.toLowerCase().includes(search) ||
      item.customerName.toLowerCase().includes(search)
    );
  }, [searchTerm]);

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
    link.download = 'visit_log.csv';
    link.click();
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
              placeholder="Search by loan number or customer name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="export-btn" onClick={handleExport}>
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
            {paginatedData.length > 0 ? (
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
                    <tr key={idx}>
                      {ALL_COLUMNS.map(col => (
                        <td key={`${idx}-${col}`} title={row[col] || '-'}>
                          {col === 'amount' || col === 'emi' || col === 'posInCr'
                            ? <span className="currency">â‚¹{typeof row[col] === 'number' ? row[col].toLocaleString() : row[col] || '-'}</span>
                            : col === 'visitDate' || col === 'ptpDate'
                            ? <span className="date">{row[col] || '-'}</span>
                            : col === 'disp'
                            ? <span className={`badge ${row[col]?.toLowerCase()}`}>{row[col] || '-'}</span>
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