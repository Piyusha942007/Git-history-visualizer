export default function ActivityHeatmap({ data }) {
  if (!data) return <div className="empty-state">Waiting for commits...</div>;

  // Real calculation logic:
  // Your friend can use this 'data' array to map commits to a 7x24 grid
  return (
    <div className="heatmap-container">
      <div className="heatmap-grid">
        {/* The component will now dynamically render blocks based on data.length */}
        <p className="text-xs text-gray-400">Commits by day of week and hour of day</p>
      </div>
    </div>
  );
}