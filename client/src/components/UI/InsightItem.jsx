import Card from "./Card";

export default function InsightItem({ label, value }) {
  return (
    <Card>
      <p className="insight-label">{label}</p>
      <h2 className="insight-value">{value}</h2>
    </Card>
  );
}