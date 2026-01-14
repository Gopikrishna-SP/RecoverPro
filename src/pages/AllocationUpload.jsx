import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, DownloadCloud } from 'lucide-react';

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
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
  }

  .header {
    margin-bottom: 40px;
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

  .upload-section {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 32px;
  }

  .upload-zone {
    border: 2px dashed rgba(59, 130, 246, 0.5);
    border-radius: 12px;
    padding: 48px 24px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background: rgba(59, 130, 246, 0.02);
  }

  .upload-zone:hover {
    border-color: rgba(59, 130, 246, 0.8);
    background: rgba(59, 130, 246, 0.05);
  }

  .upload-zone.active {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }

  .upload-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .upload-text h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .upload-text p {
    font-size: 14px;
    color: #cbd5e1;
    margin-bottom: 4px;
  }

  .upload-hint {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 12px;
  }

  .upload-input {
    display: none;
  }

  .upload-btn {
    display: inline-block;
    margin-top: 16px;
    padding: 10px 24px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .upload-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  .file-list {
    margin-top: 24px;
  }

  .file-list h4 {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 12px;
  }

  .file-item {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.2);
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    transition: all 0.3s ease;
  }

  .file-item:hover {
    border-color: rgba(71, 85, 105, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .file-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: rgba(59, 130, 246, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    flex-shrink: 0;
  }

  .file-details {
    flex: 1;
  }

  .file-name {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .file-size {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 2px;
  }

  .file-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }

  .stat-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .stat-info p:first-child {
    font-size: 12px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-info p:last-child {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
  }

  .stat-icon.blue {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  }

  .stat-icon.green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .stat-icon.orange {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }

  .action-section {
    display: flex;
    gap: 12px;
  }

  .action-btn {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .action-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  .action-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  .action-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .action-secondary {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .action-secondary:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .template-section {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
  }

  .template-section h3 {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 12px;
  }

  .template-text {
    font-size: 13px;
    color: #cbd5e1;
    margin-bottom: 12px;
  }

  .template-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .template-btn:hover {
    background: rgba(16, 185, 129, 0.2);
    border-color: rgba(16, 185, 129, 0.5);
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(1, 1fr);
    }
    .action-section {
      flex-direction: column;
    }
  }
`;

export default function AllocationUpload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = () => {
    console.log('Uploading files:', files);
    // Call API endpoint: POST /api/allocations/upload
  };

  const handleDownloadTemplate = () => {
    console.log('Downloading template');
    // Create and download CSV template
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <h1>Upload Allocations</h1>
          <p>Upload loan allocation data via CSV or Excel file</p>
        </div>

        <div className="template-section">
          <h3>Need a template?</h3>
          <p className="template-text">Download the template to understand the required format for allocation uploads.</p>
          <button className="template-btn" onClick={handleDownloadTemplate}>
            <DownloadCloud size={14} />
            Download Template
          </button>
        </div>

        <div className="upload-section">
          <div
            className={`upload-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <div className="upload-icon">
              <Upload size={32} />
            </div>
            <div className="upload-text">
              <h3>Drag and drop your files</h3>
              <p>or click to select files from your computer</p>
              <div className="upload-hint">
                Supported formats: CSV, XLSX, XLS (Max 10MB per file)
              </div>
            </div>
            <button className="upload-btn">Choose Files</button>
            <input
              id="fileInput"
              type="file"
              multiple
              accept=".csv,.xlsx,.xls"
              onChange={handleChange}
              className="upload-input"
            />
          </div>

          {files.length > 0 && (
            <div className="file-list">
              <h4>Selected Files ({files.length})</h4>
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <div className="file-icon">
                      <FileText size={16} />
                    </div>
                    <div className="file-details">
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p>Total Files</p>
                <p>{files.length}</p>
              </div>
              <div className="stat-icon blue">
                <FileText size={24} />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p>Total Size</p>
                <p>{formatFileSize(files.reduce((acc, f) => acc + f.size, 0))}</p>
              </div>
              <div className="stat-icon orange">
                <Upload size={24} />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p>Status</p>
                <p>{files.length > 0 ? 'Ready' : 'Pending'}</p>
              </div>
              <div className={`stat-icon ${files.length > 0 ? 'green' : 'orange'}`}>
                {files.length > 0 ? (
                  <CheckCircle size={24} />
                ) : (
                  <AlertCircle size={24} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button 
            className="action-btn action-primary"
            onClick={handleUpload}
            disabled={files.length === 0}
          >
            <Upload size={16} />
            Upload {files.length > 0 ? `(${files.length} file${files.length > 1 ? 's' : ''})` : 'Files'}
          </button>
          <button 
            className="action-btn action-secondary"
            onClick={() => setFiles([])}
            disabled={files.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}