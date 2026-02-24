import "../styles/buttons.css";

export default function ControlsBar() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button className="control-btn">⏮</button>
      <button className="control-btn primary">▶</button>
      <button className="control-btn">⏸</button>
      <button className="control-btn">⏭</button>
    </div>
  );
}