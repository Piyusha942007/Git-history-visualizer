import React from "react";
import "../../styles/contributors.css";

export default function TopContributors({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="contributors-empty">
        Waiting for contributor data...
      </div>
    );
  }

  const max = Math.max(...data.map(u => u.commits));

  return (
    <div className="contributors-container">
      {data.map((user, i) => {
        const width = (user.commits / max) * 100;

        return (
          <div key={i} className="contributor-card">

            {/* top row */}
            <div className="contributor-header">

              <div className="contributor-user">
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="name">{user.name}</span>
              </div>

              <span className="count">
                {user.commits} commits
              </span>

            </div>

            {/* bar */}
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{ width: `${width}%` }}
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}