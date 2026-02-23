import React, { useState, useRef } from 'react';
import './NonGovEmpApplicationForm.css';
import { useLanguage } from '../context/LanguageContext';

const NonGovEmpApplicationForm = () => {
    const { t } = useLanguage();
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
        alert('Non-Government Employee Application Submitted Successfully!');
        window.close(); // Close tab on success optionally
    };

    return (
        <div className="non-gov-emp-page-container">
            <div className="non-gov-emp-form-wrapper">
                <h2>{t('non_gov_emp_pass_title')}</h2>
                <h4>(RTC – PRIVATE EMPLOYEE BUS PASS)</h4>

                <form onSubmit={handleSubmit}>
                    {/* 1. APPLICANT DETAILS */}
                    <div className="form-section">
                        <h3>1. {t('applicant_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>1. {t('full_name')}</label>
                                <input type="text" required placeholder={t('enter_name')} />
                            </div>
                            <div className="form-group">
                                <label>2a. Designation</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>2b. Employee ID Number</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>3a. Organization / Company Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>3b. {t('father_guardian_name')}</label>
                                <input type="text" required placeholder={t('father_guardian_name')} />
                            </div>
                            <div className="form-group">
                                <label>4a. {t('date_of_birth')}</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>4b. {t('mobile_no')}</label>
                                <input type="tel" required placeholder={t('enter_mobile')} />
                            </div>
                            <div className="form-group">
                                <label>5. Email ID</label>
                                <input type="email" required placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label>6. {t('gender')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_gender')}</option>
                                    <option value="Male">{t('male')}</option>
                                    <option value="Female">{t('female')}</option>
                                    <option value="Other">{t('other')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 2. EMPLOYMENT INFORMATION */}
                    <div className="form-section">
                        <h3>2. Employment Information</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>7. Employment Type</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Employment Type</option>
                                    <option value="Private Employee">Private Employee</option>
                                    <option value="Contract Employee">Contract Employee</option>
                                    <option value="Industrial Worker">Industrial Worker</option>
                                    <option value="Self-Employed">Self-Employed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>8. Organization Category</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Category</option>
                                    <option value="Private Company">Private Company</option>
                                    <option value="Industry / Factory">Industry / Factory</option>
                                    <option value="Educational Institution">Educational Institution</option>
                                    <option value="Corporate Office">Corporate Office</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>9. Date of Joining</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>10. Monthly Income Range</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Income Range</option>
                                    <option value="Below ₹15,000">Below ₹15,000</option>
                                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                                    <option value="₹30,000 – ₹50,000">₹30,000 – ₹50,000</option>
                                    <option value="Above ₹50,000">Above ₹50,000</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. BUS PASS DETAILS */}
                    <div className="form-section">
                        <h3>3. {t('route_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>11. Type of Pass Required</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Pass Type</option>
                                    <option value="Ordinary">Ordinary</option>
                                    <option value="Metro Express">Metro Express</option>
                                    <option value="City Special">City Special</option>
                                    <option value="Inter-City Pass">Inter-City Pass</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>12. Pass Duration</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Duration</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>13. {t('from_place')}</label>
                                <input type="text" required placeholder={t('starting_point')} />
                            </div>
                            <div className="form-group">
                                <label>{t('to_place')}</label>
                                <input type="text" required placeholder={t('to_place')} />
                            </div>
                            <div className="form-group full-width">
                                <label>14. Boarding Point</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* 4. ADDRESS DETAILS */}
                    <div className="form-section">
                        <h3>4. {t('address_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>15. Residential Address</label>
                                <textarea required rows="3" placeholder={t('door_no_street')}></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>16. Office / Work Location Address</label>
                                <textarea required rows="3" placeholder="Work Location Address"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 5. UPLOAD & VERIFICATION */}
                    <div className="form-section">
                        <h3>5. Upload & Verification Section (Portal Integration)</h3>
                        <div className="form-grid">
                            <div className="form-group file-upload">
                                <label>✅ Company ID Card Upload</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>✅ Employment Certificate / Offer Letter</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload" style={{ gridColumn: '1 / -1' }}>
                                <label>✅ Address Proof Upload (Aadhaar / Voter ID / Driving Licence / Passport)</label>
                                <input type="file" required />
                            </div>

                            <div className="form-group photo-upload-container" style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <label style={{ marginBottom: '15px' }}>✅ {t('applicant_photo')}</label>
                                <div className="photo-box-wrapper">
                                    <span className="dim-label dim-width">Photo Width: 3.5cms</span>
                                    <div className="photo-box">
                                        {photo ? <img src={photo} alt="Preview" /> : <img src="photo-spec.png" alt="No photo" style={{ opacity: 0.2 }} />}
                                    </div>
                                    <span className="dim-label dim-height">Photo Height: 4.5cms</span>
                                </div>
                                <button type="button" className="photo-action-btn" onClick={() => fileInputRef.current.click()}>
                                    {t('upload_capture_photo')} *
                                </button>
                                <button type="button" style={{ marginTop: '5px', fontSize: '0.8rem', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', textDecoration: 'underline' }} onClick={startCamera}>
                                    {t('use_camera')}
                                </button>
                                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
                                <p className="photo-help-text">
                                    {t('photo_spec_text')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. DECLARATION */}
                    <div className="form-section declaration">
                        <h3>6. Declaration by Applicant</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>I hereby declare that the particulars furnished above are true and correct. I request issuance of Non-Government Employee Bus Pass subject to APSRTC rules and regulations.</span>
                        </label>



                        <div className="signature-box">
                            <p>Signature of Applicant</p>
                        </div>
                    </div>



                    <div className="form-submit-container">
                        <button type="submit" className="submit-btn">{t('submit')}</button>
                    </div>
                </form>
            </div>

            {showCamera && (
                <div className="camera-modal">
                    <div className="camera-content">
                        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '8px' }} />
                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
                        <div className="camera-actions">
                            <button type="button" onClick={capturePhoto} className="capture-btn">{t('capture')}</button>
                            <button type="button" onClick={stopCamera} className="cancel-btn">{t('cancel')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NonGovEmpApplicationForm;
