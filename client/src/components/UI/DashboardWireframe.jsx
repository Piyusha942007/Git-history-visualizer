import InsightItem from "./InsightItem";
import "../../styles/layout.css";

export default function DashboardWireframe() {
  const insights = [
    { label: "Total Commits", value: 120 },
    { label: "Contributors", value: 5 },
    { label: "Active Days", value: 30 },
  ];

  return (
    <div className="dashboard-wireframe">
      <div className="insights-grid">
        {insights.map((item, i) => (
          <InsightItem key={i} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-box">Commit Timeline</div>
        <div className="chart-box">Heatmap</div>
        <div className="chart-box">Contributors</div>
      </div>
    </div>
  );
}