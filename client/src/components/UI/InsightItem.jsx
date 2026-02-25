export default function InsightItem({ title, value, trend }) {
  return (
    <div className="insight-card">
      <h4>{title}</h4>
      <div className="value">{value}</div>
      {trend && <span className="trend">{trend}</span>}
    </div>
  );
}