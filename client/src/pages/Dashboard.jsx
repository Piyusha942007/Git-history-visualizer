import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GitCommit, Users, Calendar, Clock, ChevronDown, Download, Search, Globe } from 'lucide-react';
import InsightItem from '../components/UI/InsightItem';
import CommitTimeline from '../components/charts/CommitTimeline';
import TopContributors from '../components/charts/TopContributors';
import ActivityHeatmap from '../components/charts/ActivityHeatmap';
import "../styles/dashboard.css";

export default function Dashboard({ repoData }) {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');

  // --- CALCULATION LOGIC ---
  const stats = useMemo(() => {
    if (!repoData || !repoData.commits || repoData.commits.length === 0) return null;

    const commits = repoData.commits;
    const contributorMap = {};
    const dayMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    commits.forEach(c => {
      // Contributors
      const name = c.commit.author.name;
      contributorMap[name] = (contributorMap[name] || 0) + 1;

      // Most Active Day
      const date = new Date(c.commit.author.date);
      dayMap[date.getDay()] += 1;
    });

    const sortedContributors = Object.entries(contributorMap)
      .map(([name, count]) => ({ name, commits: count }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    const mostActiveDayIndex = Object.keys(dayMap).reduce((a, b) => dayMap[a] > dayMap[b] ? a : b);

    // Recent Activity Calculation
    const latestDate = new Date(commits[0]?.commit.author.date);
    const now = new Date();
    const diffInHours = Math.floor((now - latestDate) / (1000 * 60 * 60));
    const recentStr = diffInHours < 1 ? "Just now" : diffInHours < 24 ? `${diffInHours}h ago` : `${Math.floor(diffInHours/24)}d ago`;

    return {
      total: commits.length.toLocaleString(),
      activeCount: Object.keys(contributorMap).length,
      topFive: sortedContributors,
      mostActiveDay: dayNames[mostActiveDayIndex],
      recent: recentStr
    };
  }, [repoData]);

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/')} className="back-btn">
              <ArrowLeft size={18} /> Back
            </button>
            <div className="header-text">
              <h1 className="header-title">Git History <span className="indigo-text">Visualizer</span></h1>
              <p className="repo-status">
                <Globe size={12} /> {repoData?.name ? `github.com/${repoData.name}` : "No repository selected"}
              </p>
            </div>
          </div>
          <div className="repo-selector">
            <span>{repoData?.name || "Select Repository"}</span>
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
            <p className="input-label">Repository URL</p>
            <input 
              type="text" 
              placeholder="github.com/user/repo" 
              className="git-input" 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button className="analyze-btn">Analyze Repo</button>
            <p className="card-footer-text">Data is fetched in real-time from GitHub's official API.</p>
          </div>
        </aside>

        <main className="content-area">
          <div className="control-bar">
            <div className="filter-group">
              <div className="custom-select">
                <select className="filter-select">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 9 Days</option>
                  <option>Last Year</option>
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
              <div className="custom-select">
                <select className="filter-select">
                  <option>All Activity</option>
                  <option>Commits Only</option>
                  <option>Contributors Only</option>
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
            </div>
            <button className="export-btn">
              <Download size={16} /> Export Report
            </button>
          </div>

          <section className="analytics-header">
            <h2>Analytics Overview</h2>
            <p>Real-time repository performance metrics</p>
          </section>

          <div className="insights-row">
            <InsightItem title="Total Commits" value={stats?.total || "0"} icon={<GitCommit/>} trend="Last 90 days" />
            <InsightItem title="Active Contributors" value={stats?.activeCount || "0"} icon={<Users/>} trend="All time" />
            <InsightItem title="Most Active Day" value={stats?.mostActiveDay || "--"} icon={<Calendar/>} />
            <InsightItem title="Recent Activity" value={stats?.recent || "--"} icon={<Clock/>} />
          </div>

          <div className="charts-section">
            <div className="chart-card full-width">
              <h3>Commit Timeline</h3>
              {repoData ? <CommitTimeline data={stats?.timeline} /> : <div className="empty-state">Waiting for repository data to generate timeline...</div>}
            </div>

            <div className="charts-split">
              <div className="chart-card">
                <h3>Top Contributors</h3>
                {repoData ? <TopContributors data={stats?.topFive} /> : <div className="empty-state">Waiting for contributor data...</div>}
              </div>
              <div className="chart-card">
                <h3>Activity Heatmap</h3>
                {repoData ? <ActivityHeatmap data={repoData?.commits} /> : <div className="empty-state">Waiting for commits...</div>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}