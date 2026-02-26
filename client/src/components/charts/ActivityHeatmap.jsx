import React, { useMemo } from "react";
import "../../styles/heatmap.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ActivityHeatmap({ data }) {
  const heatmap = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return null;

    // initialize full grid
    const grid = {};
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        const key = `${d}-${h}`;
        grid[key] = data[key] || 0;
      }
    }

    const max = Math.max(...Object.values(grid));

    return { grid, max };
  }, [data]);

  if (!heatmap) {
    return (
      <div className="empty-state">
        No heatmap data
      </div>
    );
  }

  const { grid, max } = heatmap;

  const getColor = (value) => {
    if (value === 0) return "#e5e7eb";
    const intensity = value / max;
    return `rgba(99,102,241,${0.25 + intensity * 0.75})`;
  };

  return (
    <div className="heatmap-container">
      <div className="heatmap-grid">
        {days.map((day, d) => (
          <div key={day} className="heatmap-row">
            <span className="heatmap-label">{day}</span>

            {[...Array(24)].map((_, h) => {
              const val = grid[`${d}-${h}`];
              return (
                <div
                  key={h}
                  className="heatmap-cell"
                  title={`${day} ${h}:00 → ${val} commits`}
                  style={{ background: getColor(val) }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        {[0.1, 0.3, 0.5, 0.7, 1].map((v, i) => (
          <div
            key={i}
            className="heatmap-cell"
            style={{ background: `rgba(99,102,241,${v})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}