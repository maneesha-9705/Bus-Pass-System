import React from 'react';
import './CitizenForm.css';

const CitizenForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Application Submitted Successfully!');
        window.close(); // Close tab on success optionally
    };

    return (
        <div className="citizen-page-container">
            <div className="citizen-form-wrapper">
                <h2>APSRTC Citizen Bus Pass Application</h2>
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
                            <div className="form-group">
                                <label>Address Proof Type</label>
                                <select required defaultValue="">
                                    <option value="" disabled>Select Proof</option>
                                    <option value="Voter ID Card">Voter ID Card</option>
                                    <option value="Driving Licence">Driving Licence</option>
                                    <option value="Passport">Passport</option>
                                </select>
                            </div>
                            <div className="form-group file-upload">
                                <label>Upload Address Proof</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>Upload Aadhaar Proof</label>
                                <input type="file" required />
                            </div>
                            <div className="form-group file-upload">
                                <label>Upload Photograph</label>
                                <input type="file" required />
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
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* DECLARATION */}
                    <div className="form-section declaration">
                        <h3>Declaration</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>I hereby declare that the information provided is true and agree to APSRTC rules.</span>
                        </label>
                    </div>

                    <div className="form-submit-container">
                        <button type="submit" className="submit-btn">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CitizenForm;
