import React, { useState, useRef } from 'react';
import './GovEmpApplicationForm.css';

const GovEmpApplicationForm = () => {
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
        alert('Government Employee Application Submitted Successfully!');
        window.close(); // Close tab on success optionally
    };

    return (
        <div className="gov-emp-page-container">
            <div className="gov-emp-form-wrapper">
                <h2>Government Employee Bus Pass Application Form</h2>
                <h4>(RTC – GOV/EMP BUS PASS)</h4>

                <form onSubmit={handleSubmit}>
                    {/* 1. EMPLOYEE DETAILS */}
                    <div className="form-section">
                        <h3>1. Employee Details</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>1. Name of the Applicant</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>2a. Designation</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>2b. Government Employee ID / PF Number</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>3a. Department / Ministry</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>3b. Office Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>4a. Father / Spouse Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>4b. Aadhaar Number</label>
                                <input type="text" maxLength="12" required />
                            </div>
                            <div className="form-group">
                                <label>5. Date of Birth</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>6. Mobile Number</label>
                                <input type="tel" required />
                            </div>
                            <div className="form-group">
                                <label>7. Email ID</label>
                                <input type="email" required />
                            </div>
                            <div className="form-group">
                                <label>8. Gender</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 2. EMPLOYMENT INFORMATION */}
                    <div className="form-section">
                        <h3>2. Employment Information</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>9. Employment Type</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Employment Type</option>
                                    <option value="Permanent Government Employee">Permanent Government Employee</option>
                                    <option value="State Government">State Government</option>
                                    <option value="Central Government">Central Government</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>10. Date of Appointment</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>11. Date of Retirement</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>12. Pay Scale / Grade Pay</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>13. Working District / City</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* 3. BUS PASS DETAILS */}
                    <div className="form-section">
                        <h3>3. Bus Pass Details</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>14. Type of Pass Required</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Pass Type</option>
                                    <option value="Ordinary">Ordinary</option>
                                    <option value="Metro Express">Metro Express</option>
                                    <option value="City Special">City Special</option>
                                    <option value="Inter-District Pass">Inter-District Pass</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>15. Pass Duration</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Duration</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>16. Travel Route / From</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>To</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group full-width">
                                <label>17. Boarding Point</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* 4. ADDRESS DETAILS */}
                    <div className="form-section">
                        <h3>4. Address Details</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>18. Residential Address</label>
                                <textarea required rows="3"></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>19. Office Address</label>
                                <textarea required rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 5. UPLOAD & VERIFICATION */}
                    <div className="form-section">
                        <h3>5. Upload & Verification (Portal Features)</h3>
                        <div className="form-grid">
                            <div className="form-group file-upload">
                                <label>✅ Government ID Card Upload</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>✅ Salary Certificate Upload</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload" style={{ gridColumn: '1 / -1' }}>
                                <label>✅ Address Proof Upload (Aadhaar / Voter ID / Driving Licence / Passport)</label>
                                <input type="file" required />
                            </div>

                            <div className="form-group photo-upload-container" style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <label style={{ marginBottom: '15px' }}>✅ Latest Photograph Upload</label>
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

                    {/* 6. DECLARATION */}
                    <div className="form-section declaration">
                        <h3>6. Declaration by Applicant</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>I hereby declare that the information furnished above is true and correct. I request issuance of Government Employee Bus Pass subject to APSRTC rules and eligibility norms.</span>
                        </label>

                        <div className="declaration-grid">
                            <div className="form-group">
                                <label>Place</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" required />
                            </div>
                        </div>
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

export default GovEmpApplicationForm;
