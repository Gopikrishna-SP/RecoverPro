import { useState } from 'react';
import { Search, Plus, Trash2, Users, FileText, CheckCircle, Clock } from 'lucide-react';

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


  .header {
    margin-bottom: 40px;
  }

  .header h1 {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .header p {
    font-size: 14px;
    color: #94a3b8;
  }

 

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 32px;
  }

  .panel {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
  }

  .panel-title {
    font-size: 16px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .search-box {
    position: relative;
    margin-bottom: 16px;
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

  .search-input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .list-container {
    max-height: 450px;
    overflow-y: auto;
  }

  .list-item {
    padding: 14px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .list-item:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
  }

  .list-item.selected {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .item-title {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .item-id {
    font-size: 11px;
    color: #64748b;
  }

  .item-amount {
    font-size: 12px;
    font-weight: 600;
    color: #10b981;
  }

  .btn-assign {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.3s;
  }

  .btn-assign:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  .btn-assign:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .assignment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(15, 23, 42, 0.5);
    border-radius: 8px;
    margin-bottom: 8px;
    border: 1px solid rgba(71, 85, 105, 0.2);
  }

  .assignment-info {
    flex: 1;
  }

  .assignment-name {
    font-size: 12px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 2px;
  }

  .assignment-id {
    font-size: 11px;
    color: #64748b;
  }

  .btn-remove {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }

  .btn-remove:hover {
    color: #fca5a5;
  }

  .assignment-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .user-card {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 12px;
    padding: 20px;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
  }

  .user-name {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 2px;
  }

  .user-role {
    font-size: 11px;
    color: #64748b;
  }

  .badge {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
  }

  .cases-list {
    max-height: 280px;
    overflow-y: auto;
  }

  .empty-state {
    text-align: center;
    padding: 48px 16px;
    color: #94a3b8;
  }

  .empty-icon {
    font-size: 32px;
    margin-bottom: 12px;
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .btn {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  .btn-secondary {
    background: rgba(71, 85, 105, 0.2);
    color: #cbd5e1;
    border: 1px solid rgba(71, 85, 105, 0.3);
  }

  .btn-secondary:hover {
    background: rgba(71, 85, 105, 0.3);
  }

  .all-assigned {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 12px;
    padding: 48px 24px;
    text-align: center;
  }

  .all-assigned-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .all-assigned-text {
    font-size: 14px;
    font-weight: 600;
    color: #10b981;
    margin-bottom: 8px;
  }

  .all-assigned-desc {
    font-size: 12px;
    color: #94a3b8;
  }

  @media (max-width: 1200px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    .assignment-grid {
      grid-template-columns: 1fr;
    }
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
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

const mockCases = [
  { id: 'GS015EEB1426578', name: 'MEDICENE POINT', amount: '5,00,000', status: 'Active' },
  { id: 'GS020EEB2413307', name: 'SKANDA GARMENTS', amount: '7,50,000', status: 'Active' },
  { id: 'GS025SME3156890', name: 'TECH SOLUTIONS', amount: '12,00,000', status: 'Active' },
  { id: 'GS030MSM4276543', name: 'GOLDEN ENTERPRISES', amount: '3,50,000', status: 'Pending' },
  { id: 'GS035EEB5389012', name: 'STELLAR TRADING', amount: '9,00,000', status: 'Active' },
];

const mockUsers = [
  { id: 1, name: 'Sridhar', role: 'Senior Case Manager' },
  { id: 2, name: 'Raju', role: 'Case Manager' },
  { id: 3, name: 'Nagaraj', role: 'Case Manager' },
  { id: 4, name: 'Terence', role: 'Case Manager' },
];

export default function CaseAssignment() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [caseSearch, setCaseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const assignedCaseIds = new Set(Object.values(assignments).flat().map(c => c.id));
  const filteredCases = mockCases
    .filter(c => !assignedCaseIds.has(c.id))
    .filter(c =>
      c.name.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(caseSearch.toLowerCase())
    );

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const assignCase = () => {
    if (!selectedCase || !selectedUser) return;

    const caseExists = assignments[selectedUser.id]?.some(c => c.id === selectedCase.id);
    if (caseExists) {
      alert('This case is already assigned to this user');
      return;
    }

    setAssignments(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), selectedCase]
    }));
  };

  const removeAssignment = (userId, caseId) => {
    setAssignments(prev => ({
      ...prev,
      [userId]: prev[userId].filter(c => c.id !== caseId)
    }));
  };

  const totalAssigned = Object.values(assignments).flat().length;
  const usersWithCases = Object.keys(assignments).length;

  const handleSubmit = () => {
    if (totalAssigned === 0) {
      alert('Please assign at least one case');
      return;
    }
    setShowApiModal(true);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    
    const payload = Object.entries(assignments).flatMap(([userId, cases]) =>
      cases.map(caseItem => ({
        userId: parseInt(userId),
        allocationId: caseItem.id
      }))
    );

    try {
      const response = await fetch('/api/assignments/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Assignments submitted successfully!');
        setAssignments({});
        setSelectedCase(null);
        setShowApiModal(false);
      } else {
        alert('Error submitting assignments');
      }
    } catch (error) {
      alert('Error submitting assignments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAssignments({});
    setSelectedCase(null);
  };

  return (
    <>
      <style>{styles}</style>
      
      

      <div className="container">
        <div className="header">
          <h1>Case Assignment</h1>
          <p>Manage and assign recovery cases to your team members</p>
        </div>


        <div className="content-grid">
          <div className="panel">
            <div className="panel-title">
              <FileText size={18} />
              Available Cases ({filteredCases.length})
            </div>
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search cases..."
                value={caseSearch}
                onChange={(e) => setCaseSearch(e.target.value)}
              />
            </div>
            {filteredCases.length > 0 ? (
              <div className="list-container">
                {filteredCases.map(caseItem => (
                  <div
                    key={caseItem.id}
                    className={`list-item ${selectedCase?.id === caseItem.id ? 'selected' : ''}`}
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <div className="item-header">
                      <div>
                        <div className="item-title">{caseItem.name}</div>
                        <div className="item-id">{caseItem.id}</div>
                      </div>
                      <div className="item-amount">₹{caseItem.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="all-assigned">
                <div className="all-assigned-icon">✅</div>
                <div className="all-assigned-text">All Cases Assigned</div>
                <div className="all-assigned-desc">All available cases have been assigned</div>
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-title">
              <Users size={18} />
              Team Members ({filteredUsers.length})
            </div>
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search members..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
            <div className="list-container">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className={`list-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="item-header">
                    <div>
                      <div className="item-title">{user.name}</div>
                      <div className="item-id">{user.role}</div>
                    </div>
                    <div className="badge">{assignments[user.id]?.length || 0}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-assign"
              onClick={assignCase}
              disabled={!selectedCase || !selectedUser}
            >
              <Plus size={16} />
              Assign Case
            </button>
          </div>
        </div>

        {usersWithCases > 0 && (
          <div className="panel" style={{ marginBottom: '32px' }}>
            <div className="panel-title">
              <CheckCircle size={18} />
              Case Assignments
            </div>
            <div className="assignment-grid">
              {mockUsers
                .filter(u => assignments[u.id]?.length > 0)
                .map(user => (
                  <div key={user.id} className="user-card">
                    <div className="user-header">
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-role">{user.role}</div>
                      </div>
                      <div className="badge">{assignments[user.id]?.length}</div>
                    </div>
                    <div className="cases-list">
                      {assignments[user.id]?.map(caseItem => (
                        <div key={caseItem.id} className="assignment-item">
                          <div className="assignment-info">
                            <div className="assignment-name">{caseItem.name}</div>
                            <div className="assignment-id">{caseItem.id}</div>
                          </div>
                          <button
                            className="btn-remove"
                            onClick={() => removeAssignment(user.id, caseItem.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="panel">
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleSubmit} disabled={totalAssigned === 0}>
              <CheckCircle size={16} />
              Assign
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      {showApiModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%'
          }}>
            <h2 style={{ color: '#e2e8f0', marginBottom: '20px', fontSize: '18px' }}>Assignment API</h2>
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Request Payload</div>
              <pre style={{ color: '#10b981', fontSize: '11px', overflow: 'auto' }}>
{JSON.stringify(
  Object.entries(assignments).flatMap(([userId, cases]) =>
    cases.map(c => ({ userId: parseInt(userId), allocationId: c.id }))
  ),
  null,
  2
)}
              </pre>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowApiModal(false)}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(71, 85, 105, 0.2)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(71, 85, 105, 0.3)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Submitting...' : 'Confirm & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}