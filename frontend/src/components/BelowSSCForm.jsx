import React, { useState, useRef } from 'react';
import './aboveSSCForm.css';
import { useLanguage } from '../context/LanguageContext';

const BelowSSCForm = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '', fatherName: '', dob: '', aadhaar: '', gender: '',
        mobile: '', email: '', schoolName: '', class: '',
        door: '', village: '', mandal: '', pincode: '',
        from: '', via: '', to: '', depot: '', isEmployeeChild: false
    });

    const [photo, setPhoto] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

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
        console.log('Submission:', { ...formData, photo });
        alert('Application submitted successfully!');
    };

    return (
        <div className="form-page-container">
            <div className="form-card">
                <div className="form-title-bar">
                    <h2 className="form-title">{t('student_below_ssc_title')}</h2>
                </div>

                <form onSubmit={handleSubmit} className="registration-content">
                    <div className="top-section">
                        <div className="details-section">
                            <h3 className="section-header">{t('applicant_details')}</h3>
                            <div className="form-grid-2x2">
                                <div className="form-group">
                                    <label>{t('full_name')} <span className="required-star">*</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t('enter_name')} />
                                </div>
                                <div className="form-group">
                                    <label>{t('father_guardian_name')} <span className="required-star">*</span></label>
                                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder={t('father_guardian_name')} />
                                </div>
                                <div className="form-group">
                                    <label>{t('gender')} <span className="required-star">*</span></label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">{t('select_gender')}</option>
                                        <option value="Male">{t('male')}</option>
                                        <option value="Female">{t('female')}</option>
                                        <option value="Other">{t('other')}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{t('date_of_birth')} <span className="required-star">*</span></label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox" name="isEmployeeChild" checked={formData.isEmployeeChild} onChange={handleChange} />
                                <label>{t('is_employee_child')}</label>
                            </div>
                        </div>

                        <div className="photo-upload-container">
                            <h3 className="section-header">{t('applicant_photo')}</h3>
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
                            <button type="button" style={{ marginTop: '5px', fontSize: '0.8rem', background: 'none', border: 'none', color: '#0076c0', cursor: 'pointer', textDecoration: 'underline' }} onClick={startCamera}>
                                {t('use_camera')}
                            </button>
                            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
                            <p className="photo-help-text">
                                {t('photo_spec_text')}
                            </p>
                        </div>
                    </div>

                    <div className="proofs-section">
                        <h3 className="section-header">{t('proofs')}</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>{t('aadhar_number')}</label>
                                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder={t('enter_aadhar')} />
                            </div>
                            <div className="form-group">
                                <label>{t('mobile_no')} <span className="required-star">*</span></label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <span style={{ padding: '10px', border: '1px solid #ddd', background: '#eee', borderRadius: '4px' }}>+91</span>
                                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder={t('enter_mobile')} style={{ flex: 1 }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ssc-section">
                        <h3 className="section-header">{t('institution_details')}</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>{t('institution_name')}</label>
                                <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} placeholder={t('institution_name')} />
                            </div>
                            <div className="form-group">
                                <label>{t('course_year')}</label>
                                <input type="text" name="class" value={formData.class} onChange={handleChange} placeholder={t('class_placeholder')} />
                            </div>
                        </div>
                    </div>

                    <div className="address-section">
                        <h3 className="section-header">{t('address_details')}</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>{t('door_no_street')}</label>
                                <input type="text" name="door" value={formData.door} onChange={handleChange} placeholder={t('door_no_street')} />
                            </div>
                            <div className="form-group">
                                <label>{t('village_town')}</label>
                                <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder={t('village_town')} />
                            </div>
                            <div className="form-group">
                                <label>{t('mandal_district')}</label>
                                <input type="text" name="mandal" value={formData.mandal} onChange={handleChange} placeholder={t('mandal_district')} />
                            </div>
                            <div className="form-group">
                                <label>{t('pincode')}</label>
                                <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} placeholder={t('pincode')} />
                            </div>
                        </div>
                    </div>

                    <div className="route-section">
                        <h3 className="section-header">{t('route_details')}</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>{t('from_place')}</label>
                                <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder={t('starting_point')} />
                            </div>
                            <div className="form-group">
                                <label>{t('via')}</label>
                                <input type="text" name="via" value={formData.via} onChange={handleChange} placeholder={t('via')} />
                            </div>
                            <div className="form-group">
                                <label>{t('to_place')}</label>
                                <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder={t('to_place')} />
                            </div>
                            <div className="form-group">
                                <label>{t('depot')}</label>
                                <input type="text" name="depot" value={formData.depot} onChange={handleChange} placeholder={t('bus_depot')} />
                            </div>
                        </div>
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="submit-btn">{t('submit')}</button>
                    </div>
                </form>
            </div>

            {showCamera && (
                <div className="camera-modal">
                    <div className="camera-content">
                        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '4px' }} />
                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
                        <div className="camera-actions">
                            <button onClick={capturePhoto} className="capture-btn">{t('capture')}</button>
                            <button onClick={stopCamera} className="cancel-btn">{t('cancel')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BelowSSCForm;
