import { Camera, X, CheckCircle, Loader, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.visit-container {
  max-width: 1200px;
  margin: 0 auto;
}

.visit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 52px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.visit-header h1 {
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

.visit-form {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  margin : 0px auto;
  max-width: 900px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 0;
}

.enum-btn {
  padding: 12px 14px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  font-size: 12px;
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

.enum-btn:hover:not(.active) {
  background: #dbeafe;
}

.input-field {
  width: 100%;
  padding: 12px 14px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #334155;
  font-size: 14px;
  margin-bottom: 16px;
}

.input-field::placeholder {
  color: #cbd5e1;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 0;
}

.photo-btn {
  width: 100%;
  padding: 24px;
  background: #eff6ff;
  color: #2563eb;
  border: 2px dashed #bfdbfe;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 150px;
  position: relative;
}

.photo-btn:hover {
  background: #dbeafe;
  border-color: #2563eb;
}

.photo-preview {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
}

.photo-status {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
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

.form-footer {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  margin-top: 32px;
}

.submit-btn {
  flex: 1;
  padding: 14px 24px;
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
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.success-msg {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #059669;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

canvas {
  display: none;
}

@media (max-width: 768px) {
  .visit-form {
    padding: 20px;
  }

  .input-row {
    grid-template-columns: 1fr;
  }

  .button-group {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
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

export default function StartVisit({ loanData, onBack }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [customerPhoto, setCustomerPhoto] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    allocationId: null,
    segment: '',
    product: '',
    state: '',
    branch: '',
    location: '',
    loanNumber: '',
    customerName: '',
    posInCr: '',
    emi: '',
    bkt: '',
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

  useEffect(() => {
    if (loanData) {
      setFormData(prevData => ({
        ...prevData,
        allocationId: loanData.allocationId || null,
        loanNumber: loanData.loanNumber || '',
        segment: loanData.segment || '',
        product: loanData.product || '',
        state: loanData.state || '',
        branch: loanData.branch || '',
        location: loanData.location || '',
        customerName: loanData.customerName || '',
        posInCr: loanData.posInCr || '',
        emi: loanData.emi || '',
        bkt: loanData.bkt || '',
      }));
    }
  }, [loanData]);

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
      
      formDataObj.append('loanNumber', formData.loanNumber || '');
      formDataObj.append('disp', formData.disp || '');
      formDataObj.append('contactability', formData.contactability || '');
      formDataObj.append('residenceStatus', formData.residenceStatus || '');
      formDataObj.append('classificationCode', formData.classificationCode || '');
      formDataObj.append('visitDate', formData.visitDate || '');
      
      if (formData.allocationId) formDataObj.append('allocationId', formData.allocationId);
      if (formData.reasonForDefault) formDataObj.append('reasonForDefault', formData.reasonForDefault);
      if (formData.officeStatus) formDataObj.append('officeStatus', formData.officeStatus);
      if (formData.projection) formDataObj.append('projection', formData.projection);
      if (formData.customerProfile) formDataObj.append('customerProfile', formData.customerProfile);
      if (formData.amount) formDataObj.append('amount', formData.amount);
      if (formData.ptpDate) formDataObj.append('ptpDate', formData.ptpDate);
      if (formData.fieldUpdateFeedback) formDataObj.append('fieldUpdateFeedback', formData.fieldUpdateFeedback);

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
          onBack();
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
      <div className="visit-container">
        <div className="visit-header">
          <h1>Field Visit Form</h1>
          <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={18} /> Back
          </button>
        </div>

        <div className="visit-form">
          {error && <div className="error-msg">⚠ {error}</div>}
          {success && <div className="success-msg">✓ {success}</div>}

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
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

          <div className="form-section">
            <div className="input-row">
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px', display: 'block' }}>PTP Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.ptpDate}
                  onChange={(e) => setFormData({ ...formData, ptpDate: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px', display: 'block' }}>Amount</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px', display: 'block' }}>Field Feedback</label>
            <input
              type="text"
              className="input-field"
              placeholder="Observations"
              value={formData.fieldUpdateFeedback}
              onChange={(e) => setFormData({ ...formData, fieldUpdateFeedback: e.target.value })}
            />
          </div>

          <div className="form-section">
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
                  <Camera size={28} /> Take Photo
                </>
              )}
            </button>
          </div>

          <div className="form-footer">
            <button
              className="submit-btn"
              onClick={submitVisit}
              disabled={submitting || !customerPhoto}
            >
              {submitting ? (
                <>
                  <Loader size={16} /> Submitting...
                </>
              ) : (
                <>
                  <CheckCircle size={16} /> Submit Visit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}