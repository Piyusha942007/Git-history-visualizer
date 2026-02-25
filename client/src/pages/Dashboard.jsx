import RepoInputCard from "../components/RepoInputCard";
import ControlsBar from "../components/ControlsBar";
import ChartContainer from "../components/charts/ChartContainer";
import InsightItem from "../components/UI/InsightItem";

import "../styles/layout.css";
import "../styles/cards.css";

export default function Dashboard() {
  const insights = [
    { label: "Total Commits", value: 120 },
    { label: "Contributors", value: 5 },
    { label: "Active Days", value: 30 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-grid">

        {/* LEFT SIDEBAR */}
        <div className="left-panel">
          <RepoInputCard />
        </div>

        {/* MAIN CONTENT */}
        <div className="right-panel">

          {/* CONTROLS */}
          <div className="dashboard-controls">
            <ControlsBar />
          </div>

          {/* INSIGHTS */}
          <div className="insights-grid">
            {insights.map((item, index) => (
              <InsightItem
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          {/* CHARTS */}
          <div className="charts-grid">
            <ChartContainer title="Commit Timeline" />
            <ChartContainer title="Heatmap" />
            <ChartContainer title="Contributors" />
          </div>

        </div>
      </div>
    </div>
  );
}