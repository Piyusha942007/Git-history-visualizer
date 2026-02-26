// export default function InsightItem({ title, value, trend }) {
//   return (
//     <div className="insight-card">
//       <h4>{title}</h4>
//       <div className="value">{value}</div>
//       {trend && <span className="trend">{trend}</span>}
//     </div>
//   );
// }
import React from "react";

export default function InsightItem({ title, value, subtitle, icon }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        minHeight: "120px",
      }}
    >
      {/* Left Content */}
      <div>
        <p
          style={{
            fontSize: "14px",
            color: "#475569",
            marginBottom: "6px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#0f172a",
            margin: "0",
          }}
        >
          {value}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: "13px",
              color: "#64748b",
              marginTop: "6px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          background: "#eef2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4f46e5",
        }}
      >
        {icon}
      </div>
    </div>
  );
}