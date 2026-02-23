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

/* ── Mock DB for new passes ─────────────────── */
const MOCK_DB = {
    APP123: {
        studentName: "Kumar",
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

/* ── Step Indicator ─────────────────────────── */
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
/* mode: "new" | "renewal"                       */
const Payment = ({ mode = "new" }) => {
    const navigate = useNavigate();
    const isRenewal = mode === "renewal";

    const [step, setStep] = useState(0);
    const [inputId, setInputId] = useState("");     // App ID or Pass No
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [generatedPass, setGeneratedPass] = useState(null);

    /* ── Step 0: Fetch Details ── */
    const handleFetch = () => {
        if (!inputId.trim()) {
            alert(`Please enter your ${isRenewal ? "Pass Number" : "Application ID"}`);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            let found = null;

            if (isRenewal) {
                // Look up existing passes in localStorage by pass number
                const saved = JSON.parse(localStorage.getItem("myPasses") || "[]");
                found = saved.find(
                    (p) => p.passNumber?.toUpperCase() === inputId.trim().toUpperCase()
                );
                if (!found) {
                    alert(
                        "Pass number not found in My Passes!\n" +
                        "Please check your pass number and try again."
                    );
                    setLoading(false);
                    return;
                }
            } else {
                // New pass — look up mock DB
                found = MOCK_DB[inputId.trim().toUpperCase()];
                if (!found) {
                    alert("Application ID not found!\nUse APP123 or APP456 for demo.");
                    setLoading(false);
                    return;
                }
            }

            setStudentData(found);
            setStep(1);
            setLoading(false);
        }, 900);
    };

    /* ── Step 1 → 2: Select plan ── */
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setStep(2);
    };

    /* ── Step 2 → 3: Process payment ── */
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
                isRenewal,
            };

            // Persist to localStorage
            const existing = JSON.parse(localStorage.getItem("myPasses") || "[]");
            localStorage.setItem("myPasses", JSON.stringify([...existing, newPass]));

            setGeneratedPass(newPass);
            setStep(3);
            setLoading(false);
        }, 1500);
    };

    /* ── Reset ── */
    const handleReset = () => {
        setStep(0);
        setInputId("");
        setStudentData(null);
        setSelectedPlan(null);
        setGeneratedPass(null);
    };

    /* ── Titles ── */
    const pageTitle = isRenewal ? "Renew Your Pass" : "Pass Payment";
    const pageSubtitle = isRenewal
        ? "Enter your existing Pass Number to renew"
        : "Enter your Application ID to get your pass";
    const inputLabel = isRenewal ? "Existing Pass Number" : "Application ID";
    const inputPlaceholder = isRenewal ? "e.g. APPTD-123456" : "e.g. APP123";
    const renewalNote = isRenewal
        ? "Your new pass validity will start from today."
        : null;

    return (
        <div className="payment-page">
            <Header />
            <div className="payment-wrapper">

                {/* Mode Badge */}
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <span className={`mode-badge ${isRenewal ? "renewal" : "new"}`}>
                        {isRenewal ? "🔄 Renewal Pass" : "🆕 New Pass"}
                    </span>
                </div>

                <StepIndicator current={step} />

                {/* ── STEP 0: Enter ID / Pass Number ── */}
                {step === 0 && (
                    <div className="payment-card">
                        <h2 className="payment-title">{pageTitle}</h2>
                        <p className="payment-subtitle">{pageSubtitle}</p>

                        {isRenewal && (
                            <div className="renewal-hint">
                                💡 Go to <strong>My Pass</strong> to find your Pass Number (starts with APPTD-)
                            </div>
                        )}

                        <div className="payment-input-group">
                            <label>{inputLabel}</label>
                            <input
                                type="text"
                                placeholder={inputPlaceholder}
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                            />
                        </div>

                        {loading
                            ? <div className="loading-spinner" />
                            : <button className="payment-btn" onClick={handleFetch}>
                                Fetch Details →
                            </button>
                        }
                    </div>
                )}

                {/* ── STEP 1: Choose Plan ── */}
                {step === 1 && studentData && (
                    <div className="payment-card">
                        <h2 className="payment-title">Choose Your Plan</h2>
                        <p className="payment-subtitle">Select a validity period for your {isRenewal ? "renewed" : ""} bus pass</p>

                        <div className="student-preview-box">
                            <h4>{isRenewal ? "Renewing Pass For" : "Application Details"}</h4>
                            <div className="info-row"><strong>Name</strong><span>{studentData.studentName}</span></div>
                            <div className="info-row"><strong>College</strong><span>{studentData.schoolCollegeName}</span></div>
                            <div className="info-row"><strong>Route</strong><span>{studentData.from} → {studentData.to}</span></div>
                            {isRenewal && studentData.passNumber && (
                                <div className="info-row"><strong>Old Pass</strong><span>{studentData.passNumber}</span></div>
                            )}
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
                        <p className="payment-subtitle">Review and confirm your {isRenewal ? "renewal " : ""}payment</p>

                        <div className="student-preview-box">
                            <h4>Order Summary</h4>
                            <div className="info-row"><strong>Name</strong><span>{studentData.studentName}</span></div>
                            <div className="info-row"><strong>Route</strong><span>{studentData.from} → {studentData.to}</span></div>
                            <div className="info-row"><strong>College</strong><span>{studentData.schoolCollegeName}</span></div>
                            <div className="info-row"><strong>Plan</strong><span>{selectedPlan.months} Month{selectedPlan.months > 1 ? "s" : ""}</span></div>
                            {isRenewal && (
                                <div className="info-row"><strong>Type</strong><span style={{ color: "#c46b00", fontWeight: 700 }}>🔄 Renewal</span></div>
                            )}
                        </div>

                        <div className="payment-summary">
                            <div className="summary-label">{isRenewal ? "Renewal Amount" : "Total Amount"}</div>
                            <div className="summary-amount">₹{selectedPlan.amount}</div>
                            <div className="summary-plan">
                                Valid for {selectedPlan.months} month{selectedPlan.months > 1 ? "s" : ""} from today
                            </div>
                            {renewalNote && <div className="summary-note">{renewalNote}</div>}
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
                            <h3>{isRenewal ? "🔄 Pass Renewed!" : "🎉 Payment Successful!"}</h3>
                            <p>
                                Your {isRenewal ? "renewed " : ""}bus pass has been generated and saved permanently to{" "}
                                <strong>My Pass</strong>.
                            </p>
                        </div>

                        <BusPassCard data={generatedPass} />

                        <button
                            className="payment-btn"
                            style={{ marginTop: "16px" }}
                            onClick={() => navigate("/my-pass")}
                        >
                            🎫 View My Passes
                        </button>
                        <button
                            className="payment-btn secondary"
                            style={{ marginTop: "10px" }}
                            onClick={handleReset}
                        >
                            {isRenewal ? "Renew Another Pass" : "Pay for Another Pass"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
