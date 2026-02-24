import React, { useState, useRef } from 'react';
import './JournalistForm.css';
import { useLanguage } from '../context/LanguageContext';

const JournalistForm = () => {
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
        alert('Journalist Application Submitted Successfully!');
        window.close(); // Close tab on success optionally
    };

    return (
        <div className="journalist-page-container">
            <div className="journalist-form-wrapper">
                <h2>{t('journalist_pass_title')}</h2>
                <form onSubmit={handleSubmit}>
                    {/* PERSONAL DETAILS */}
                    <div className="form-section">
                        <h3>{t('applicant_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t('full_name')}</label>
                                <input type="text" required placeholder={t('enter_name')} />
                            </div>
                            <div className="form-group">
                                <label>{t('father_guardian_name')}</label>
                                <input type="text" required placeholder={t('father_guardian_name')} />
                            </div>
                            <div className="form-group">
                                <label>{t('date_of_birth')}</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>{t('gender')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_gender')}</option>
                                    <option value="Male">{t('male')}</option>
                                    <option value="Female">{t('female')}</option>
                                    <option value="Other">{t('other')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t('aadhar_number')}</label>
                                <input type="text" maxLength="12" required placeholder={t('enter_aadhar')} />
                            </div>
                            <div className="form-group">
                                <label>{t('mobile_no')}</label>
                                <input type="tel" required placeholder={t('enter_mobile')} />
                            </div>
                            <div className="form-group">
                                <label>{t('email')}</label>
                                <input type="email" required placeholder={t('email')} />
                            </div>
                        </div>
                    </div>

                    {/* JOURNALIST SPECIFIC DETAILS */}
                    <div className="form-section">
                        <h3>{t('journalist_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>{t('organization_name')}</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>{t('designation')}</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>{t('accreditation_no')}</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="form-section">
                        <h3>{t('address_details')}</h3>
                        <div className="form-group full-width">
                            <label>{t('door_no_street')}</label>
                            <textarea required rows="3" placeholder={t('door_no_street')}></textarea>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t('mandal_district')}</label>
                                <input type="text" required placeholder={t('mandal_district')} />
                            </div>
                            <div className="form-group">
                                <label>{t('village_town')}</label>
                                <input type="text" required placeholder={t('village_town')} />
                            </div>
                            <div className="form-group">
                                <label>{t('pincode')}</label>
                                <input type="number" required placeholder={t('pincode')} />
                            </div>
                        </div>
                    </div>

                    {/* DOCUMENT UPLOAD */}
                    <div className="form-section">
                        <h3>{t('documents_upload')}</h3>
                        <div className="form-grid">
                            <div className="form-group file-upload" style={{ gridColumn: '1 / -1' }}>
                                <label>{t('upload_accreditation')}</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>{t('upload_address_proof')}</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>{t('upload_aadhar_proof')}</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group photo-upload-container" style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <label style={{ marginBottom: '15px' }}>{t('applicant_photo')}</label>
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

                    {/* PASS DETAILS */}
                    <div className="form-section">
                        <h3>{t('pass_requirement')}</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t('pass_type')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_pass')}</option>
                                    <option value="Ordinary">{t('ordinary')}</option>
                                    <option value="Metro">{t('metro')}</option>
                                    <option value="City">{t('city')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t('from_place')}</label>
                                <input type="text" required placeholder={t('starting_point')} />
                            </div>
                            <div className="form-group">
                                <label>{t('to_place')}</label>
                                <input type="text" required placeholder={t('to_place')} />
                            </div>
                            <div className="form-group">
                                <label>{t('validity')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_validity')}</option>
                                    <option value="Monthly">{t('monthly')}</option>
                                    <option value="Quarterly">{t('quarterly')}</option>
                                    <option value="Half-Yearly">{t('half_yearly')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* DECLARATION */}
                    <div className="form-section declaration">
                        <h3>{t('declaration')}</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>{t('declaration_text')}</span>
                        </label>
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

export default JournalistForm;
