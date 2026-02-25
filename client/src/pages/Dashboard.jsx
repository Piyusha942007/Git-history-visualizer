import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GitCommit,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  Globe,
} from "lucide-react";

import InsightItem from "../components/UI/InsightItem";
import CommitTimeline from "../components/charts/CommitTimeline";
import TopContributors from "../components/charts/TopContributors";
import ActivityHeatmap from "../components/charts/ActivityHeatmap";
import "../styles/dashboard.css";

export default function Dashboard({ repoData }) {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");

  console.log("Dashboard repoData:", repoData);

  const stats = useMemo(() => {
    if (!repoData?.commits || repoData.commits.length === 0) {
      return null;
    }

    const commits = repoData.commits;

    const contributorMap = {};
    const dayMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const commitsByDate = {};

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    commits.forEach((c) => {
      const authorName = c?.commit?.author?.name || "Unknown";
      const rawDate = c?.commit?.author?.date;

      // Contributor count
      contributorMap[authorName] =
        (contributorMap[authorName] || 0) + 1;

      // 🔥 SAFE DATE HANDLING
      if (!rawDate) return;

      const commitDate = new Date(rawDate);
      if (isNaN(commitDate.getTime())) return;

      // Day count
      dayMap[commitDate.getDay()] += 1;

      // Timeline grouping
      const formattedDate = commitDate
        .toISOString()
        .split("T")[0];

      commitsByDate[formattedDate] =
        (commitsByDate[formattedDate] || 0) + 1;
    });

    const sortedContributors = Object.entries(contributorMap)
      .map(([name, count]) => ({ name, commits: count }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    const mostActiveDayIndex = Object.keys(dayMap).reduce(
      (a, b) => (dayMap[a] > dayMap[b] ? a : b),
      0
    );

    const timeline = Object.entries(commitsByDate).map(
      ([date, count]) => ({
        date,
        count,
      })
    );

    // 🔥 SAFE RECENT ACTIVITY
    const latestRawDate = commits[0]?.commit?.author?.date;
    let recentStr = "--";

    if (latestRawDate) {
      const latestDate = new Date(latestRawDate);

      if (!isNaN(latestDate.getTime())) {
        const now = new Date();
        const diffInHours = Math.floor(
          (now - latestDate) / (1000 * 60 * 60)
        );

        recentStr =
          diffInHours < 1
            ? "Just now"
            : diffInHours < 24
            ? `${diffInHours}h ago`
            : `${Math.floor(diffInHours / 24)}d ago`;
      }
    }

    return {
      total: commits.length.toLocaleString(),
      activeCount: Object.keys(contributorMap).length,
      topFive: sortedContributors,
      mostActiveDay: dayNames[mostActiveDayIndex],
      recent: recentStr,
      timeline,
    };
  }, [repoData]);

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={() => navigate("/")}
              className="back-btn"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <div className="header-text">
              <h1 className="header-title">
                Git History{" "}
                <span className="indigo-text">
                  Visualizer
                </span>
              </h1>

              <p className="repo-status">
                <Globe size={12} />{" "}
                {repoData?.name
                  ? `github.com/${repoData.name}`
                  : "No repository selected"}
              </p>
            </div>
          </div>

          <div className="repo-selector">
            <span>
              {repoData?.name || "Select Repository"}
            </span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="repo-input-card">
            <div className="card-header">
              <Search size={18} className="text-indigo" />
              <h3>Analyze Repository</h3>
            </div>

            <p className="input-label">
              Repository URL
            </p>

            <input
              type="text"
              placeholder="github.com/user/repo"
              className="git-input"
              value={repoUrl}
              onChange={(e) =>
                setRepoUrl(e.target.value)
              }
            />

            <button className="analyze-btn">
              Analyze Repo
            </button>

            <p className="card-footer-text">
              Data is fetched in real-time from GitHub's official API.
            </p>
          </div>
        </aside>

        <main className="content-area">
          <section className="analytics-header">
            <h2>Analytics Overview</h2>
            <p>
              Real-time repository performance metrics
            </p>
          </section>

          <div className="insights-row">
            <InsightItem
              title="Total Commits"
              value={stats?.total || "0"}
              icon={<GitCommit />}
              trend="All time"
            />

            <InsightItem
              title="Active Contributors"
              value={stats?.activeCount || "0"}
              icon={<Users />}
            />

            <InsightItem
              title="Most Active Day"
              value={stats?.mostActiveDay || "--"}
              icon={<Calendar />}
            />

            <InsightItem
              title="Recent Activity"
              value={stats?.recent || "--"}
              icon={<Clock />}
            />
          </div>

          <div className="charts-section">
            <div className="chart-card full-width">
              <h3>Commit Timeline</h3>

              {stats?.timeline ? (
                <CommitTimeline data={stats.timeline} />
              ) : (
                <div className="empty-state">
                  Waiting for repository data...
                </div>
              )}
            </div>

            <div className="charts-split">
              <div className="chart-card">
                <h3>Top Contributors</h3>

                {stats?.topFive ? (
                  <TopContributors data={stats.topFive} />
                ) : (
                  <div className="empty-state">
                    Waiting for contributor data...
                  </div>
                )}
              </div>

              <div className="chart-card">
                <h3>Activity Heatmap</h3>

                {repoData?.commits ? (
                  <ActivityHeatmap
                    data={repoData.commits}
                  />
                ) : (
                  <div className="empty-state">
                    Waiting for commits...
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}