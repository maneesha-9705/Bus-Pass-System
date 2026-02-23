import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusPassCard from "./BusPassCard";
import "./Payment.css";
import Header from "./header";

/* ── Plans ─────────────────────────────────── */
const PLANS = [
    { months: 1, label: "Month", amount: 1050, save: null },
    { months: 2, label: "Months", amount: 1900, save: "Save ₹200" },
    { months: 6, label: "Months", amount: 5200, save: "Save ₹1100" },
];

/* ── Mock DB (add a default photo placeholder) ─ */
const MOCK_DB = {
    APP123: {
        studentName: "Maneesh Kumar",
        schoolCollegeName: "VNR VJIET",
        from: "Kukatpally",
        to: "Bachupally",
        photo: null,
    },
    APP456: {
        studentName: "Rahul Sharma",
        schoolCollegeName: "GVPCE",
        from: "Madhurawada",
        to: "RTC Complex",
        photo: null,
    },
};

/* ── Step indicator ─────────────────────────── */
const STEPS = ["ID", "Plan", "Pay", "Pass"];

const StepIndicator = ({ current }) => (
    <div className="step-indicator">
        {STEPS.map((label, i) => (
            <React.Fragment key={i}>
                <div className={`step-dot ${i < current ? "done" : i === current ? "active" : ""}`}>
                    {i < current ? "✓" : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                    <div className={`step-line ${i < current ? "done" : ""}`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

/* ── Main Component ─────────────────────────── */
const Payment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);           // 0=ID, 1=Plan, 2=Pay, 3=Pass
    const [appId, setAppId] = useState("");
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [generatedPass, setGeneratedPass] = useState(null);

    /* Step 0 → fetch details */
    const handleFetch = () => {
        if (!appId.trim()) { alert("Please enter Application ID"); return; }
        setLoading(true);
        setTimeout(() => {
            const data = MOCK_DB[appId.trim().toUpperCase()];
            if (data) {
                setStudentData(data);
                setStep(1);
            } else {
                alert("Application ID not found!\nUse APP123 or APP456 for demo.");
            }
            setLoading(false);
        }, 900);
    };

    /* Step 1 → plan chosen → Step 2 */
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setStep(2);
    };

    /* Step 2 → payment → generate pass → Step 3 */
    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            const passNumber = "APPTD-" + Math.floor(100000 + Math.random() * 900000);
            const ticketNumber = "TK" + Math.floor(10000000 + Math.random() * 90000000);
            const issueDate = new Date().toISOString();

            const newPass = {
                ...studentData,
                amount: selectedPlan.amount,
                planMonths: selectedPlan.months,
                passNumber,
                ticketNumber,
                issueDate,
            };

            // Persist to localStorage
            const existing = JSON.parse(localStorage.getItem("myPasses") || "[]");
            localStorage.setItem("myPasses", JSON.stringify([...existing, newPass]));

            setGeneratedPass(newPass);
            setStep(3);
            setLoading(false);
        }, 1500);
    };

    /* Reset */
    const handleReset = () => {
        setStep(0);
        setAppId("");
        setStudentData(null);
        setSelectedPlan(null);
        setGeneratedPass(null);
    };

    return (
        <div className="payment-page">
            <Header />
            <div className="payment-wrapper">
                <StepIndicator current={step} />

                {/* ── STEP 0: Enter ID ── */}
                {step === 0 && (
                    <div className="payment-card">
                        <h2 className="payment-title">Pass Payment</h2>
                        <p className="payment-subtitle">Enter your Application ID to fetch your details</p>

                        <div className="payment-input-group">
                            <label>Application ID</label>
                            <input
                                type="text"
                                placeholder="e.g. APP123"
                                value={appId}
                                onChange={(e) => setAppId(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                            />
                        </div>
                        {loading
                            ? <div className="loading-spinner" />
                            : <button className="payment-btn" onClick={handleFetch}>Fetch Details →</button>
                        }
                    </div>
                )}

                {/* ── STEP 1: Choose Plan ── */}
                {step === 1 && studentData && (
                    <div className="payment-card">
                        <h2 className="payment-title">Choose Your Plan</h2>
                        <p className="payment-subtitle">Select a validity period for your bus pass</p>

                        {/* Student preview */}
                        <div className="student-preview-box">
                            <h4>Application Details</h4>
                            <div className="info-row"><strong>Name</strong> <span>{studentData.studentName}</span></div>
                            <div className="info-row"><strong>College</strong> <span>{studentData.schoolCollegeName}</span></div>
                            <div className="info-row"><strong>Route</strong> <span>{studentData.from} → {studentData.to}</span></div>
                        </div>

                        <div className="plan-cards">
                            {PLANS.map((plan) => (
                                <div
                                    key={plan.months}
                                    className={`plan-card ${selectedPlan?.months === plan.months ? "selected" : ""}`}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    {selectedPlan?.months === plan.months && <div className="selected-badge">✓</div>}
                                    <div className="plan-months">{plan.months}</div>
                                    <div className="plan-label">{plan.label}</div>
                                    <div className="plan-amount">₹{plan.amount}</div>
                                    {plan.save && <div className="plan-save">{plan.save}</div>}
                                </div>
                            ))}
                        </div>

                        <button
                            className="payment-btn"
                            disabled={!selectedPlan}
                            style={{ opacity: selectedPlan ? 1 : 0.5 }}
                            onClick={() => selectedPlan && handlePlanSelect(selectedPlan)}
                        >
                            Continue to Payment →
                        </button>
                        <button className="payment-btn secondary" onClick={() => setStep(0)}>← Back</button>
                    </div>
                )}

                {/* ── STEP 2: Payment Confirmation ── */}
                {step === 2 && selectedPlan && (
                    <div className="payment-card">
                        <h2 className="payment-title">Complete Payment</h2>
                        <p className="payment-subtitle">Review and confirm your payment</p>

                        <div className="student-preview-box">
                            <h4>Order Summary</h4>
                            <div className="info-row"><strong>Name</strong><span>{studentData.studentName}</span></div>
                            <div className="info-row"><strong>Route</strong><span>{studentData.from} → {studentData.to}</span></div>
                            <div className="info-row"><strong>College</strong><span>{studentData.schoolCollegeName}</span></div>
                            <div className="info-row"><strong>Plan</strong><span>{selectedPlan.months} Month{selectedPlan.months > 1 ? "s" : ""}</span></div>
                        </div>

                        <div className="payment-summary">
                            <div className="summary-label">Total Amount</div>
                            <div className="summary-amount">₹{selectedPlan.amount}</div>
                            <div className="summary-plan">
                                Valid for {selectedPlan.months} month{selectedPlan.months > 1 ? "s" : ""} from today
                            </div>
                        </div>

                        {loading
                            ? <div className="loading-spinner" />
                            : <>
                                <button className="payment-btn" onClick={handlePayment}>
                                    💳 Pay ₹{selectedPlan.amount} Now
                                </button>
                                <button className="payment-btn secondary" onClick={() => setStep(1)}>← Change Plan</button>
                            </>
                        }
                    </div>
                )}

                {/* ── STEP 3: Generated Pass ── */}
                {step === 3 && generatedPass && (
                    <div className="pass-preview-container">
                        <div className="success-banner">
                            <h3>🎉 Payment Successful!</h3>
                            <p>Your bus pass has been generated and saved permanently to <strong>My Pass</strong>.</p>
                        </div>

                        <BusPassCard data={generatedPass} />

                        <button className="payment-btn" style={{ marginTop: "16px" }} onClick={() => navigate("/my-pass")}>
                            🎫 View My Passes
                        </button>
                        <button className="payment-btn secondary" style={{ marginTop: "10px" }} onClick={handleReset}>
                            Pay for Another Pass
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
