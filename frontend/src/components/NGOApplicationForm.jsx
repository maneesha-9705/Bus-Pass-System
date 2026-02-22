import React, { useState, useRef } from 'react';
import './NGOApplicationForm.css';

const NGOApplicationForm = () => {
    const [photo, setPhoto] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            alert("Could not access camera");
            setShowCamera(false);
        }
    };

    const capturePhoto = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        setPhoto(canvasRef.current.toDataURL('image/png'));
        stopCamera();
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('NGO Application Submitted Successfully!');
        window.close(); // Close tab on success optionally
    };

    return (
        <div className="ngo-page-container">
            <div className="ngo-form-wrapper">
                <h2>APSRTC NGO Bus Pass Application</h2>
                <form onSubmit={handleSubmit}>
                    {/* PERSONAL DETAILS */}
                    <div className="form-section">
                        <h3>Personal Details</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Father / Guardian Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Aadhaar Number</label>
                                <input type="text" maxLength="12" required />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input type="tel" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" required />
                            </div>
                        </div>
                    </div>

                    {/* NGO SPECIFIC DETAILS */}
                    <div className="form-section">
                        <h3>NGO Details</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>NGO Organization Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Registration Number</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Applicant Designation in NGO</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="form-section">
                        <h3>Residential Address</h3>
                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea required rows="3"></textarea>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>District</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>City / Village</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>PIN Code</label>
                                <input type="number" required />
                            </div>
                        </div>
                    </div>

                    {/* DOCUMENT UPLOAD */}
                    <div className="form-section">
                        <h3>Documents Upload</h3>
                        <div className="form-grid">
                            <div className="form-group file-upload" style={{ gridColumn: '1 / -1' }}>
                                <label>Upload NGO ID / Registration Copy</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>Upload Address Proof</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>Upload Aadhaar Proof</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group photo-upload-container" style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <label style={{ marginBottom: '15px' }}>Upload Photograph</label>
                                <div className="photo-box-wrapper">
                                    <span className="dim-label dim-width">Photo Width: 3.5cms</span>
                                    <div className="photo-box">
                                        {photo ? <img src={photo} alt="Preview" /> : <img src="photo-spec.png" alt="No photo" style={{ opacity: 0.2 }} />}
                                    </div>
                                    <span className="dim-label dim-height">Photo Height: 4.5cms</span>
                                </div>
                                <button type="button" className="photo-action-btn" onClick={() => fileInputRef.current.click()}>
                                    Upload Photo / Capture Photo *
                                </button>
                                <button type="button" style={{ marginTop: '5px', fontSize: '0.8rem', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', textDecoration: 'underline' }} onClick={startCamera}>
                                    (Use Camera Instead)
                                </button>
                                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
                                <p className="photo-help-text">
                                    Upload JPEG format file. Size should be less than 1MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PASS DETAILS */}
                    <div className="form-section">
                        <h3>Pass Requirement</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Pass Type</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Pass</option>
                                    <option value="Ordinary">Ordinary</option>
                                    <option value="Metro">Metro</option>
                                    <option value="City">City</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Source Stop</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Destination Stop</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Validity</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Validity</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Half-Yearly">Half-Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* DECLARATION */}
                    <div className="form-section declaration">
                        <h3>Declaration</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>I hereby declare that the information provided is true and agree to APSRTC rules for NGOs.</span>
                        </label>
                    </div>

                    <div className="form-submit-container">
                        <button type="submit" className="submit-btn">Submit Application</button>
                    </div>
                </form>
            </div>

            {showCamera && (
                <div className="camera-modal">
                    <div className="camera-content">
                        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '8px' }} />
                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
                        <div className="camera-actions">
                            <button type="button" onClick={capturePhoto} className="capture-btn">Capture</button>
                            <button type="button" onClick={stopCamera} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NGOApplicationForm;
