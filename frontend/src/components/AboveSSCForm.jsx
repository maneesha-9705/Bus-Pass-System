import React, { useState, useRef } from 'react';
import './aboveSSCForm.css';

const AboveSSCForm = () => {
    const [formData, setFormData] = useState({
        name: '', fatherName: '', dob: '', aadhaar: '', gender: '',
        mobile: '', email: '', sscBoard: 'AP Board', sscYear: '', sscHtno: '',
        college: '', course: '', door: '', village: '', mandal: '', pincode: '',
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
                    <h2 className="form-title">Student Above SSC Pass Registration</h2>
                </div>

                <form onSubmit={handleSubmit} className="registration-content">
                    <div className="top-section">
                        <div className="details-section">
                            <h3 className="section-header">APPLICANT DETAILS</h3>
                            <div className="form-grid-2x2">
                                <div className="form-group">
                                    <label>Full Name <span className="required-star">*</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                                </div>
                                <div className="form-group">
                                    <label>Father's / Guardian's Name <span className="required-star">*</span></label>
                                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="Enter Father's / Guardian's Name" />
                                </div>
                                <div className="form-group">
                                    <label>Gender <span className="required-star">*</span></label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select your gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Date of Birth <span className="required-star">*</span></label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox" name="isEmployeeChild" checked={formData.isEmployeeChild} onChange={handleChange} />
                                <label>Is Employee Child</label>
                            </div>
                        </div>

                        <div className="photo-upload-container">
                            <h3 className="section-header">APPLICANT PHOTO</h3>
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
                            <button type="button" style={{ marginTop: '5px', fontSize: '0.8rem', background: 'none', border: 'none', color: '#0076c0', cursor: 'pointer', textDecoration: 'underline' }} onClick={startCamera}>
                                (Use Camera Instead)
                            </button>
                            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
                            <p className="photo-help-text">
                                Upload JPEG format file. Size should be less than 1MB
                            </p>
                        </div>
                    </div>

                    <div className="proofs-section">
                        <h3 className="section-header">PROOFS</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>Aadhar Number</label>
                                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="Enter Aadhar Number" />
                            </div>
                            <div className="form-group">
                                <label>Mobile No <span className="required-star">*</span></label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <span style={{ padding: '10px', border: '1px solid #ddd', background: '#eee', borderRadius: '4px' }}>+91</span>
                                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Enter Mobile Number" style={{ flex: 1 }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ssc-section">
                        <h3 className="section-header">SSC DETAILS</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>SSC Board Type</label>
                                <select name="sscBoard" value={formData.sscBoard} onChange={handleChange}>
                                    <option>AP Board</option>
                                    <option>CBSE</option>
                                    <option>ICSE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>SSC Year of Pass</label>
                                <input type="number" name="sscYear" value={formData.sscYear} onChange={handleChange} placeholder="Year of Passing" />
                            </div>
                            <div className="form-group">
                                <label>SSC Hall Ticket No</label>
                                <input type="text" name="sscHtno" value={formData.sscHtno} onChange={handleChange} placeholder="Hall Ticket Number" />
                            </div>
                        </div>
                    </div>

                    <div className="college-section">
                        <h3 className="section-header">INSTITUTION DETAILS</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>Institution Name</label>
                                <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College Name" />
                            </div>
                            <div className="form-group">
                                <label>Course/Year</label>
                                <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. B.Tech 2nd Year" />
                            </div>
                        </div>
                    </div>

                    <div className="address-section">
                        <h3 className="section-header">ADDRESS DETAILS</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>Door No/Street</label>
                                <input type="text" name="door" value={formData.door} onChange={handleChange} placeholder="Door No" />
                            </div>
                            <div className="form-group">
                                <label>Village/Town</label>
                                <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Village/Town" />
                            </div>
                            <div className="form-group">
                                <label>Mandal/District</label>
                                <input type="text" name="mandal" value={formData.mandal} onChange={handleChange} placeholder="Mandal/District" />
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
                            </div>
                        </div>
                    </div>

                    <div className="route-section">
                        <h3 className="section-header">ROUTE DETAILS</h3>
                        <div className="form-grid-2x2">
                            <div className="form-group">
                                <label>From Place</label>
                                <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Starting Point" />
                            </div>
                            <div className="form-group">
                                <label>Via</label>
                                <input type="text" name="via" value={formData.via} onChange={handleChange} placeholder="Route Via" />
                            </div>
                            <div className="form-group">
                                <label>To Place</label>
                                <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Destination" />
                            </div>
                            <div className="form-group">
                                <label>Depot</label>
                                <input type="text" name="depot" value={formData.depot} onChange={handleChange} placeholder="Bus Depot" />
                            </div>
                        </div>
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="submit-btn">SUBMIT</button>
                    </div>
                </form>
            </div>

            {showCamera && (
                <div className="camera-modal">
                    <div className="camera-content">
                        <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: '4px' }} />
                        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
                        <div className="camera-actions">
                            <button onClick={capturePhoto} className="capture-btn">Capture</button>
                            <button onClick={stopCamera} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboveSSCForm;
