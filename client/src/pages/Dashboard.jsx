import RepoInputCard from "../components/RepoInputCard";
import ControlsBar from "../components/ControlsBar";
import ChartContainer from "../components/charts/ChartContainer";
import "../styles/layout.css";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        
        {/* LEFT SIDEBAR */}
        <div className="left-panel">
          <RepoInputCard />
        </div>

        {/* MAIN CONTENT */}
        <div className="right-panel">
          <ControlsBar />

          <ChartContainer title="Commit Timeline" />
          <ChartContainer title="Heatmap" />
          <ChartContainer title="Contributors" />
        </div>

      </div>
    </div>
  );
}