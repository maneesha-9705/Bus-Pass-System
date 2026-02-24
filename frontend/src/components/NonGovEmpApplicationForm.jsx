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
                                <label>2a. {t('designation')}</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>2b. {t('employee_id')}</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group">
                                <label>3a. {t('org_company_name')}</label>
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
                                <label>5. {t('email_id')}</label>
                                <input type="email" required placeholder={t('email')} />
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
                        <h3>2. {t('employment_info')}</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>7. {t('employment_type')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_pass')} {t('employment_type')}</option>
                                    <option value="Private Employee">{t('private_employee')}</option>
                                    <option value="Contract Employee">{t('contract_employee')}</option>
                                    <option value="Industrial Worker">{t('industrial_worker')}</option>
                                    <option value="Self-Employed">{t('self_employed')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>8. {t('org_category')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_gender')}</option>
                                    <option value="Private Company">{t('private_company')}</option>
                                    <option value="Industry / Factory">{t('industry_factory')}</option>
                                    <option value="Educational Institution">{t('edu_inst')}</option>
                                    <option value="Corporate Office">{t('corp_office')}</option>
                                    <option value="Other">{t('other')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>9. {t('joining_date')}</label>
                                <input type="date" required />
                            </div>
                            <div className="form-group">
                                <label>10. {t('monthly_income')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_validity')}</option>
                                    <option value="Below ₹15,000">{t('below_ssc')} ₹15,000</option>
                                    <option value="Above ₹50,000">{t('above_ssc')} ₹50,000</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. BUS PASS DETAILS */}
                    <div className="form-section">
                        <h3>3. {t('route_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>11. {t('pass_type_req')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_pass')}</option>
                                    <option value="Ordinary">{t('ordinary')}</option>
                                    <option value="Metro Express">{t('metro_express')}</option>
                                    <option value="City Special">{t('city_special')}</option>
                                    <option value="Inter-City Pass">{t('inter_city_pass')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>12. {t('pass_duration')}</label>
                                <select required defaultValue="">
                                    <option value="" disabled>{t('select_validity')}</option>
                                    <option value="Monthly">{t('monthly')}</option>
                                    <option value="Quarterly">{t('quarterly')}</option>
                                    <option value="Annual">{t('annual')}</option>
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
                                <label>14. {t('boarding_point')}</label>
                                <input type="text" required />
                            </div>
                        </div>
                    </div>

                    {/* 4. ADDRESS DETAILS */}
                    <div className="form-section">
                        <h3>4. {t('address_details')}</h3>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>15. {t('res_address')}</label>
                                <textarea required rows="3" placeholder={t('door_no_street')}></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>16. {t('office_work_address')}</label>
                                <textarea required rows="3" placeholder={t('office_work_address')}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 5. UPLOAD & VERIFICATION */}
                    <div className="form-section">
                        <h3>5. {t('upload_verification')}</h3>
                        <div className="form-grid">
                            <div className="form-group file-upload">
                                <label>{t('company_id_upload')}</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>{t('emp_cert_upload')}</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload" style={{ gridColumn: '1 / -1' }}>
                                <label>{t('address_proof_upload')}</label>
                                <input type="file" required />
                            </div>

                            <div className="form-group photo-upload-container" style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <label style={{ marginBottom: '15px' }}>{t('applicant_photo')}</label>
                                <div className="photo-box-wrapper">
                                    <span className="dim-label dim-width">{t('photo_width_label')}</span>
                                    <div className="photo-box">
                                        {photo ? <img src={photo} alt="Preview" /> : <img src="photo-spec.png" alt="No photo" style={{ opacity: 0.2 }} />}
                                    </div>
                                    <span className="dim-label dim-height">{t('photo_height_label')}</span>
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
                        <h3>6. {t('declaration_applicant')}</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>{t('non_gov_declaration_text')}</span>
                        </label>



                        <div className="signature-box">
                            <p>{t('signature_applicant')}</p>
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
