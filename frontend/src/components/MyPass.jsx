import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import BusPassCard from "./BusPassCard";
import "./MyPass.css";

const MyPass = () => {
    const navigate = useNavigate();
    const [passes, setPasses] = useState([]);

    // Load passes from localStorage on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("myPasses") || "[]");
        setPasses(stored);
    }, []);

    const handleDelete = (index) => {
        const updated = passes.filter((_, i) => i !== index);
        setPasses(updated);
        localStorage.setItem("myPasses", JSON.stringify(updated));
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete all passes?")) {
            localStorage.removeItem("myPasses");
            setPasses([]);
        }
    };

    return (
        <div className="mypass-page">
            <Header />
            <div className="mypass-container">
                <div className="mypass-header">
                    <h2>🎫 My Bus Passes</h2>
                    <p>All your generated bus passes are stored here permanently.</p>
                </div>

                {passes.length === 0 ? (
                    <div className="mypass-empty">
                        <div className="empty-icon">🚌</div>
                        <h3>No Passes Found</h3>
                        <p>You haven't generated any bus passes yet. Go to the Payment section to get your pass.</p>
                        <button className="go-payment-btn" onClick={() => navigate("/payment")}>
                            Get Your Bus Pass
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mypass-grid">
                            {passes.map((pass, index) => (
                                <div className="mypass-card-wrapper" key={index}>
                                    <p className="pass-meta">
                                        Generated on: {new Date(pass.issueDate).toLocaleString("en-IN")}
                                    </p>
                                    <BusPassCard data={pass} />
                                    <button className="delete-btn" onClick={() => handleDelete(index)}>
                                        🗑 Remove This Pass
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="mypass-clear-btn" onClick={handleClearAll}>
                            Clear All Passes
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyPass;
