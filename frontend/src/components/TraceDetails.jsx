import React, { useState } from 'react';
import './TraceDetails.css';

const TraceDetails = () => {
    const [identifier, setIdentifier] = useState('');
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        // Simulate backend fetch
        setTimeout(() => {
            setLoading(false);
            // Mock validation
            if (identifier.length >= 10 && dob) {
                setResult({
                    name: "Venkata Sai",
                    passType: "Student General",
                    status: "Active",
                    source: "Vijayawada",
                    destination: "Guntur",
                    validUpto: "2026-12-31"
                });
            } else {
                setError("Invalid details. Please check your Mobile/Aadhaar and Date of Birth.");
            }
        }, 1500);
    };

    return (
        <div className="trace-page-container">
            <div className="trace-card">
                <h2>Trace Application / Pass Details</h2>
                <p className="trace-subtitle">Check your pass status using your registered Mobile Number or Aadhaar Number.</p>

                <form onSubmit={handleSubmit} className="trace-form">
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
                        <button type="submit" className="trace-submit-btn" disabled={loading}>
                            {loading ? 'Fetching Details...' : 'Get Details'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="result-card">
                        <h3>Pass Information</h3>
                        <div className="result-grid">
                            <div className="result-row">
                                <span className="result-label">Name:</span>
                                <span className="result-value">{result.name}</span>
                            </div>
                            <div className="result-row">
                                <span className="result-label">Pass Type:</span>
                                <span className="result-value">{result.passType}</span>
                            </div>
                            <div className="result-row">
                                <span className="result-label">Route:</span>
                                <span className="result-value">{result.source} to {result.destination}</span>
                            </div>
                            <div className="result-row">
                                <span className="result-label">Valid Upto:</span>
                                <span className="result-value font-bold">{result.validUpto}</span>
                            </div>
                            <div className="result-row">
                                <span className="result-label">Status:</span>
                                <span className="result-value status-active">{result.status}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TraceDetails;
