"use client";

export default function StatsCard({ icon, label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "24px",
      }}
      className="flex flex-col"
    >
      {/* Icon box container */}
      <div
        style={{
          backgroundColor: "#2a2a2a",
          borderRadius: "8px",
          padding: "10px",
          width: "fit-content",
        }}
        className="flex items-center justify-center text-white"
      >
        {icon}
      </div>

      {/* Metric Label */}
      <span
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "13px",
          marginTop: "24px",
        }}
      >
        {label}
      </span>

      {/* Metric Value */}
      <span
        style={{
          color: "#ffffff",
          fontSize: "28px",
          fontWeight: 700,
          marginTop: "4px",
        }}
      >
        {value}
      </span>
    </div>
  );
}
