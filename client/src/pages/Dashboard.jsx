import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Globe } from "lucide-react";

import InsightItem from "../components/UI/InsightItem";
import CommitTimeline from "../components/charts/CommitTimeline";
import TopContributors from "../components/charts/TopContributors";
import ActivityHeatmap from "../components/charts/ActivityHeatmap";

import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* -------- FETCH REPO -------- */
  const analyzeRepo = async () => {
    if (!repoUrl) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "http://localhost:5000/api/repo/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repoUrl }),
        }
      );

      const result = await res.json();
      console.log("API RESULT:", result);

      if (!result.success) throw new Error(result.message);

      setRepoData(result.data);   // ✅ use full backend data

    } catch (err) {
      console.error(err);
      setError("Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">

      <header className="main-header">
        <div className="header-left">
          <button onClick={() => navigate("/")} className="back-btn">
            <ArrowLeft size={18} /> Back
          </button>

          <div>
            <h1>Git History Visualizer</h1>
            <p>
              <Globe size={12} />{" "}
              {repoData?.name || "No repository selected"}
            </p>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">

        <aside className="sidebar">
          <div className="repo-input-card">
            <div className="card-header">
              <Search size={18} />
              <h3>Analyze Repository</h3>
            </div>

            <input
              type="text"
              placeholder="https://github.com/user/repo"
              className="git-input"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />

            <button
              className="analyze-btn"
              onClick={analyzeRepo}
            >
              {loading ? "Analyzing..." : "Analyze Repo"}
            </button>

            {error && <p className="error-text">{error}</p>}
          </div>
        </aside>

        <main className="content-area">

          <div className="insights-row">
            <InsightItem
              title="Total Commits"
              value={repoData?.totalCommits || 0}
            />
            <InsightItem
              title="Active Contributors"
              value={repoData?.activeContributors || 0}
            />
            <InsightItem
              title="Most Active Day"
              value={repoData?.mostActiveDay || "--"}
            />
            <InsightItem
              title="Recent Activity"
              value={repoData?.recentActivity || "--"}
            />
          </div>

          <div className="charts-section">

            <div className="chart-card full-width">
              <h3>Commit Timeline</h3>
              {repoData?.timeline ? (
                <CommitTimeline
                  data={Object.entries(repoData.timeline).map(
                    ([date, count]) => ({ date, count })
                  )}
                />
              ) : (
                <div className="empty-state">
                  Waiting for data...
                </div>
              )}
            </div>

            <div className="charts-split">
              <div className="chart-card">
                <h3>Top Contributors</h3>
                <TopContributors data={repoData?.topContributors} />
              </div>

              <div className="chart-card">
                <h3>Activity Heatmap</h3>
                <ActivityHeatmap data={repoData?.heatmap} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}