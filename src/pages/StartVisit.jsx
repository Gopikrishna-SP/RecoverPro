import { useState, useRef } from 'react';
import { Camera, X, CheckCircle, Loader, ChevronRight, ChevronLeft } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: linear-gradient(135deg, #0f172a 0%, #1a1f35 100%);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 16px;
    width: 90%;
    max-width: 700px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    background: rgba(15, 23, 42, 0.8);
    flex-shrink: 0;
  }

  .modal-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
  }

  .modal-body {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
  }

  .modal-body::-webkit-scrollbar {
    width: 6px;
  }

  .modal-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-body::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.4);
    border-radius: 10px;
  }

  .page-indicator {
    text-align: center;
    color: #94a3b8;
    font-size: 12px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    margin-bottom: 24px;
  }

  .enum-btn {
    padding: 10px 12px;
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .enum-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-color: #1d4ed8;
    color: white;
  }

  .enum-btn:hover {
    background: rgba(59, 130, 246, 0.2);
  }

  .input-field {
    width: 100%;
    padding: 10px 12px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 13px;
    margin-bottom: 16px;
  }

  .input-field::placeholder {
    color: #64748b;
  }

  .input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .input-row-full {
    margin-bottom: 24px;
  }

  .photo-btn {
    width: 100%;
    padding: 16px;
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 2px dashed rgba(59, 130, 246, 0.3);
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 120px;
    position: relative;
    margin-bottom: 24px;
  }

  .photo-btn:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .photo-preview {
    width: 100%;
    height: 120px;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .photo-status {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .camera-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .video-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .camera-controls {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .camera-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .capture-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }

  .capture-btn:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }

  .cancel-btn {
    background: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .cancel-btn:hover {
    background: rgba(239, 68, 68, 0.3);
  }

  .button-footer {
    display: flex;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(71, 85, 105, 0.2);
  }

  .nav-btn {
    flex: 1;
    padding: 12px 16px;
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .nav-btn:hover:not(:disabled) {
    background: rgba(59, 130, 246, 0.2);
  }

  .nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .submit-btn {
    flex: 1;
    padding: 12px 16px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-msg {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .success-msg {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #6ee7b7;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  canvas {
    display: none;
  }
`;

const ENUMS = {
  disp: ['PAID', 'RTP', 'NC_SKIP', 'PTP', 'FOLLOW_UP'],
  reasonForDefault: ['BUSINESS_CLOSED', 'CUSTOMER_ABSCONDING', 'BUSINESS_SLOW_DOWN', 'TEMPORARY_FINANCIAL_PROBLEM', 'CUSTOMER_ABSCONDING_NC_SKIP', 'INTENTIONAL_DEFAULTER'],
  contactability: ['CONTACTED_AT_RESIDENCE', 'CONTACTABLE_AT_BOTH_PLACES', 'NON_CONTACTABLE', 'CONTACTED_AT_OFFICE', 'CONTACTABLE_ON_PHONE_ONLY'],
  residenceStatus: ['AVAILABLE', 'LOCKED', 'SHIFTED_NEW_ADDRESS_NOT_AVAILABLE', 'AVAILABLE_AND_RESIDING', 'RESIDING', 'ADDRESS_NOT_TRACED', 'ONLY_FAMILY_MEMBERS_RESIDING'],
  officeStatus: ['ADDRESS_NOT_TRACED', 'BUSINESS_CLOSED', 'ACTIVE_BUSINESS_SAME_PLACE', 'BUSINESS_RUNNING_SAME_PLACE', 'ACTIVE'],
  classificationCode: ['WORKABLE_1_INHOUSE_FIELD', 'WORKABLE_3_HARD_ACCOUNTS_LEGAL_AGGRESSIVE', 'NON_WORKABLE_NC_SKIP'],
  projection: ['PAID', 'PAYMENT_EXPECTED', 'PARTIAL_PAYMENT', 'NO_PAYMENT'],
  customerProfile: ['COOPERATIVE', 'AGGRESSIVE', 'NEUTRAL'],
};

export default function StartVisit({ isOpen, onClose, loanData }) {
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [customerPhoto, setCustomerPhoto] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    allocationId: loanData?.allocationId || null,
    segment: loanData?.segment || '',
    product: loanData?.product || '',
    state: loanData?.state || '',
    branch: loanData?.branch || '',
    location: loanData?.location || '',
    loanNumber: loanData?.loanNumber || '',
    customerName: loanData?.customerName || '',
    posInCr: loanData?.posInCr || '',
    emi: loanData?.emi || '',
    bkt: loanData?.bkt || '',
    disp: null,
    contactability: null,
    residenceStatus: null,
    officeStatus: null,
    classificationCode: null,
    reasonForDefault: null,
    projection: null,
    customerProfile: null,
    amount: '',
    ptpDate: '',
    fieldUpdateFeedback: '',
    visitDate: new Date().toISOString().split('T')[0],
  });

  const startCamera = () => {
    setShowCamera(true);
    setError(null);
    const constraints = {
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setVideoStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        setError('Camera access denied: ' + err.message);
        setShowCamera(false);
      });
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const photo = canvasRef.current.toDataURL('image/jpeg', 0.8);
      setCustomerPhoto(photo);
      stopCamera();
    }
  };

  const submitVisit = async () => {
    if (!customerPhoto) {
      setError('Photo required');
      return;
    }

    if (!formData.disp || !formData.contactability || !formData.residenceStatus || !formData.classificationCode) {
      setError('Please fill all required enum fields');
      return;
    }

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const formDataObj = new FormData();
      
      // Required fields
      formDataObj.append('loanNumber', formData.loanNumber || '');
      formDataObj.append('disp', formData.disp || '');
      formDataObj.append('contactability', formData.contactability || '');
      formDataObj.append('residenceStatus', formData.residenceStatus || '');
      formDataObj.append('classificationCode', formData.classificationCode || '');
      formDataObj.append('visitDate', formData.visitDate || '');
      
      // Allocation ID (optional - to fetch loan data)
      if (formData.allocationId) formDataObj.append('allocationId', formData.allocationId);
      
      // Optional assessment
      if (formData.reasonForDefault) formDataObj.append('reasonForDefault', formData.reasonForDefault);
      if (formData.officeStatus) formDataObj.append('officeStatus', formData.officeStatus);
      if (formData.projection) formDataObj.append('projection', formData.projection);
      if (formData.customerProfile) formDataObj.append('customerProfile', formData.customerProfile);
      
      // Optional details
      if (formData.amount) formDataObj.append('amount', formData.amount);
      if (formData.ptpDate) formDataObj.append('ptpDate', formData.ptpDate);
      if (formData.fieldUpdateFeedback) formDataObj.append('fieldUpdateFeedback', formData.fieldUpdateFeedback);

      // Photo
      if (customerPhoto) {
        const blob = await fetch(customerPhoto).then(r => r.blob());
        formDataObj.append('image', blob, 'visit-photo.jpg');
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        setSubmitting(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/visit-logs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Visit-Source': 'MVP'
        },
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Visit submitted successfully! (ID: ${data.id})`);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (showCamera) {
    return (
      <>
        <style>{styles}</style>
        <div className="camera-view">
          <div className="video-container">
            <video ref={videoRef} autoPlay playsInline />
          </div>
          <canvas ref={canvasRef} />
          <div className="camera-controls">
            <button className="camera-btn capture-btn" onClick={capturePhoto}>
              <Camera size={18} /> Capture
            </button>
            <button className="camera-btn cancel-btn" onClick={stopCamera}>
              <X size={18} /> Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Field Visit</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="modal-body">
            {error && <div className="error-msg">⚠ {error}</div>}
            {success && <div className="success-msg">✓ {success}</div>}

            <div className="page-indicator">Page {page} of 2</div>

            {page === 1 ? (
              <>
                {/* PAGE 1 - Primary Assessment */}
                <div className="input-row-full">
                  <label className="section-title">Disposition *</label>
                  <div className="button-group">
                    {ENUMS.disp.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.disp === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, disp: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Contactability *</label>
                  <div className="button-group">
                    {ENUMS.contactability.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.contactability === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, contactability: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Residence Status *</label>
                  <div className="button-group">
                    {ENUMS.residenceStatus.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.residenceStatus === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, residenceStatus: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Office Status</label>
                  <div className="button-group">
                    {ENUMS.officeStatus.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.officeStatus === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, officeStatus: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Classification Code *</label>
                  <div className="button-group">
                    {ENUMS.classificationCode.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.classificationCode === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, classificationCode: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* PAGE 2 - Details & Photo */}
                <div className="input-row-full">
                  <label className="section-title">Projection</label>
                  <div className="button-group">
                    {ENUMS.projection.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.projection === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, projection: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Reason For Default</label>
                  <div className="button-group">
                    {ENUMS.reasonForDefault.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.reasonForDefault === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, reasonForDefault: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Customer Profile</label>
                  <div className="button-group">
                    {ENUMS.customerProfile.map(val => (
                      <button
                        key={val}
                        className={`enum-btn ${formData.customerProfile === val ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, customerProfile: val })}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-row">
                  <div>
                    <label className="section-title">PTP Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.ptpDate}
                      onChange={(e) => setFormData({ ...formData, ptpDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="section-title">Amount</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-row-full">
                  <label className="section-title">Field Feedback</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Observations"
                    value={formData.fieldUpdateFeedback}
                    onChange={(e) => setFormData({ ...formData, fieldUpdateFeedback: e.target.value })}
                  />
                </div>

                <div className="input-row-full">
                  <label className="section-title">
                    <Camera size={16} /> Visit Photo *
                  </label>
                  <button className="photo-btn" onClick={startCamera}>
                    {customerPhoto ? (
                      <>
                        <img src={customerPhoto} alt="Visit Photo" className="photo-preview" />
                        <div className="photo-status">
                          <CheckCircle size={12} /> Done
                        </div>
                      </>
                    ) : (
                      <>
                        <Camera size={24} /> Take Photo
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="button-footer">
            <button
              className="nav-btn"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronLeft size={18} /> Back
            </button>

            {page === 1 ? (
              <button
                className="nav-btn"
                onClick={() => setPage(2)}
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                className="submit-btn"
                onClick={submitVisit}
                disabled={submitting || !customerPhoto}
              >
                {submitting ? (
                  <>
                    <Loader size={14} /> Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} /> Submit Visit
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}