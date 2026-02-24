import "../../styles/cards.css";

export default function ChartContainer({ title }) {
  return (
    <div className="card" style={{ flex: 1 }}>
      <h3 style={{ marginBottom: "12px", color: "#1e5fd8" }}>{title}</h3>
      <div
        style={{
          height: "200px",
          background: "#f1f5f9",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}