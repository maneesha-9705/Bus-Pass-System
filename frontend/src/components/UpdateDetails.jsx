import React, { useState } from 'react';
import './UpdateDetails.css';

const UpdateDetails = () => {
    const [identifier, setIdentifier] = useState('');
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Form inputs for update
    const [editData, setEditData] = useState({
        name: '',
        passType: '',
        source: '',
        destination: '',
        mobileNumber: '',
        email: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        setUpdateSuccess(false);

        // Simulate backend fetch
        setTimeout(() => {
            setLoading(false);
            // Mock validation
            if (identifier.length >= 10 && dob) {
                const fetchedData = {
                    name: "Venkata Sai",
                    passType: "Student General",
                    source: "Vijayawada",
                    destination: "Guntur",
                    mobileNumber: "9876543210",
                    email: "venkata.sai@example.com"
                };
                setResult(fetchedData);
                setEditData(fetchedData);
            } else {
                setError("No records found. Please check your Mobile/Aadhaar and Date of Birth.");
            }
        }, 1200);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setUpdateSuccess(false);

        // Simulate update to backend
        setTimeout(() => {
            setLoading(false);
            setUpdateSuccess(true);
            setResult(editData);
        }, 1500);
    };

    return (
        <div className="update-page-container">
            <div className="update-card">
                <h2>Update Pass Details</h2>
                <p className="update-subtitle">Search using your Registered Mobile/Aadhaar Number to update your information.</p>

                {!result ? (
                    <form onSubmit={handleSearch} className="update-form">
                        <div className="form-group">
                            <label>Mobile Number / Aadhaar Number</label>
                            <input
                                type="text"
                                placeholder="Enter Mobile or Aadhaar"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </div>

                        <div className="submit-container">
                            <button type="submit" className="update-submit-btn" disabled={loading}>
                                {loading ? 'Fetching Details...' : 'Fetch Details'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="edit-form-container">
                        <h3>Edit Your Information</h3>
                        {updateSuccess && (
                            <div className="success-message">
                                Details successfully updated!
                            </div>
                        )}
                        <form onSubmit={handleUpdate} className="update-form edit-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pass Type</label>
                                    <select
                                        name="passType"
                                        value={editData.passType}
                                        onChange={handleEditChange}
                                        required
                                    >
                                        <option value="Student General">Student General</option>
                                        <option value="Student Special">Student Special</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Citizen Ordinary">Citizen Ordinary</option>
                                        <option value="Citizen Metro">Citizen Metro</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Source Stop</label>
                                    <input
                                        type="text"
                                        name="source"
                                        value={editData.source}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Destination Stop</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={editData.destination}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={editData.mobileNumber}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="submit-container form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setResult(null)}>Back to Search</button>
                                <button type="submit" className="update-submit-btn" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Details'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateDetails;
