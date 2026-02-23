import React, { useMemo } from "react";
import "./BusPassCard.css";

function BusPassCard({ data }) {
  const passNumber = useMemo(
    () => data?.passNumber || ("APPTD-" + Math.floor(100000 + Math.random() * 900000)),
    [data]
  );
  const ticketNumber = useMemo(
    () => data?.ticketNumber || ("TK" + Math.floor(10000000 + Math.random() * 90000000)),
    [data]
  );

  const issueDate = data?.issueDate ? new Date(data.issueDate) : new Date();
  const months = data?.planMonths || 1;
  const expiryDate = new Date(issueDate);
  expiryDate.setMonth(issueDate.getMonth() + months);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const issueDateStr = formatDate(issueDate);

  if (!data) return <div className="pass-container">No Data Available</div>;

  return (
    <div className="pass-container">

      {/* ── Floating Date Watermark ── */}
      <div className="floating-date-watermark">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="floating-date-text">
            {issueDateStr} &nbsp;&nbsp; {passNumber}
          </span>
        ))}
      </div>

      {/* ── Header ── */}
      <div className="pass-header">
        <h3>APPTD (APSRTC)</h3>
        <span>Student Route Pass</span>
      </div>

      {/* ── Photo + Basic Info Row ── */}
      <div className="pass-top-row">
        <div className="pass-photo-box">
          {data.photo ? (
            <img src={data.photo} alt="Student" />
          ) : (
            <span className="pass-photo-placeholder">👤</span>
          )}
        </div>
        <div className="pass-top-info">
          <p><strong>Name:</strong> <span>{data.studentName || data.name}</span></p>
          <p><strong>Institution:</strong> <span>{data.schoolCollegeName || "N/A"}</span></p>
          <p><strong>Pass No:</strong> <span>{passNumber}</span></p>
          <p><strong>Ticket No:</strong> <span>{ticketNumber}</span></p>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="pass-body">
        <p><strong>Route:</strong> <span>{data.from} → {data.to}</span></p>
        <p><strong>Plan:</strong> <span>{months} Month{months > 1 ? "s" : ""}</span></p>
        <p><strong>Amount Paid:</strong> <span>₹{data.amount}</span></p>
        <p><strong>Issued On:</strong> <span>{formatDate(issueDate)}</span></p>
      </div>

      {/* ── Validity Banner ── */}
      <div className="pass-validity-banner">
        Valid: {formatDate(issueDate)} &nbsp;→&nbsp; {formatDate(expiryDate)}
      </div>

      <button onClick={() => window.print()} className="print-btn">
        🖨 Print Pass
      </button>
    </div>
  );
}

export default BusPassCard;
