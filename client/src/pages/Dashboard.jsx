import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Globe,
  GitCommit,
  Users,
  CalendarDays,
  Clock,
  X
} from "lucide-react";

import CommitTimeline from "../components/charts/CommitTimeline";
import TopContributors from "../components/charts/TopContributors";
import ActivityHeatmap from "../components/charts/ActivityHeatmap";

export default function Dashboard() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for the contributor popup
  const [selectedContributor, setSelectedContributor] = useState(null);

  const analyzeRepo = async () => {
    if (!repoUrl) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/repo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setRepoData(result.data);
    } catch (err) {
      setError("Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <style>{`
        :root {
          --primary: #4f46e5;
          --bg-main: #f8fafc;
          --card-bg: #ffffff;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --border: #e2e8f0;
        }

        .dashboard-wrapper {
          background-color: var(--bg-main);
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Modern Pill Back Button */
        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: white;
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .back-btn:hover {
          background-color: #f1f5f9;
          transform: translateX(-4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        /* Standard Card & Hover Animations */
        .card-base {
          background: var(--card-bg);
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .card-base:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
          border-color: var(--primary);
        }

        /* Modal / Popup Styling */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; animation: fadeIn 0.2s ease;
        }

        .modal-content {
          width: 90%; max-width: 500px; max-height: 80vh;
          padding: 2rem; background: white; border-radius: 20px;
          overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          animation: popUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1.5rem; border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }

        .commit-item {
          padding: 1rem; border-bottom: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 4px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popUp { 
          from { transform: scale(0.8); opacity: 0; } 
          to { transform: scale(1); opacity: 1; } 
        }

        /* Responsive Layout Grid */
        .dashboard-grid { 
          display: grid; 
          grid-template-columns: 320px 1fr; 
          gap: 2.5rem; 
        }

        .insights-row { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 1.5rem; 
          margin-bottom: 2.5rem; 
          margin-right: 1.5rem; 
        }

        .insight-card { 
          padding: 1.5rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }

        .icon-box { 
          width: 48px; 
          height: 48px; 
          border-radius: 12px; 
          background: #EEF2FF; 
          color: var(--primary); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          transition: 0.3s; 
        }

        .insight-card:hover .icon-box { 
          background: var(--primary); 
          color: white; 
          transform: rotate(10deg) scale(1.1); 
        }

        @media (max-width: 1150px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .insights-row { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .insights-row { grid-template-columns: 1fr; margin-right: 0; }
          .charts-split { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* POPUP MODAL */}
      {selectedContributor && (
        <div className="modal-overlay" onClick={() => setSelectedContributor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ margin: 0 }}>{selectedContributor.author || selectedContributor.name}'s History</h2>
              <button 
                onClick={() => setSelectedContributor(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={24} />
              </button>
            </div>
            <div className="commit-list">
              {selectedContributor.history?.map((c, i) => (
                <div key={i} className="commit-item">
                  <span style={{ fontWeight: 600 }}>{c.message}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(c.date).toDateString()}</span>
                </div>
              )) || (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  Total Contributions: <strong>{selectedContributor.commits}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="main-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
        <button onClick={() => navigate("/")} className="back-btn">
          <ArrowLeft size={18} /> Back
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Git History Visualizer</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} /> {repoData?.name || "No repository selected"}
          </p>
        </div>
      </header>

      <div className="dashboard-grid">
        <aside>
          <div className="card-base" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Search size={20} />
              <h3 style={{ margin: 0 }}>Analyze Repository</h3>
            </div>
            <input
              type="text"
              placeholder="https://github.com/user/repo"
              style={{ 
                width: '100%', 
                padding: '14px', 
                marginBottom: '20px', 
                border: '1.5px solid var(--border)', 
                borderRadius: '10px', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <button 
              className="analyze-btn" 
              onClick={analyzeRepo} 
              disabled={loading}
              style={{ 
                width: '100%', 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '14px', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: 600, 
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Analyzing..." : "Analyze Repo"}
            </button>
          </div>
        </aside>

        <main>
          <div className="insights-row">
            <StatCard title="Total Commits" value={repoData?.totalCommits || 0} icon={<GitCommit size={24} />} />
            <StatCard title="Active Contributors" value={repoData?.activeContributors || 0} icon={<Users size={24} />} />
            <StatCard title="Most Active Day" value={repoData?.mostActiveDay || "--"} icon={<CalendarDays size={24} />} />
            <StatCard title="Recent Activity" value={repoData?.recentActivity || "--"} icon={<Clock size={24} />} />
          </div>

          <div className="card-base" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Commit Timeline</h3>
            <div style={{ height: '400px' }}>
              {repoData?.timeline ? (
                <CommitTimeline data={Object.entries(repoData.timeline).map(([date, count]) => ({ date, count }))} />
              ) : (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  Awaiting analysis...
                </div>
              )}
            </div>
          </div>

          <div className="charts-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card-base" style={{ padding: '2rem' }}>
              <h3 style={{ marginTop: 0 }}>Top Contributors</h3>
              <TopContributors 
                data={repoData?.topContributors} 
                onContributorClick={(user) => setSelectedContributor(user)} 
              />
            </div>
            <div className="card-base" style={{ padding: '2rem' }}>
              <h3 style={{ marginTop: 0 }}>Activity Heatmap</h3>
              <ActivityHeatmap data={repoData?.heatmap} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="card-base insight-card">
      <div>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>{title}</p>
        <h2 style={{ margin: '4px 0 0 0', fontSize: '1.75rem', fontWeight: 700 }}>{value}</h2>
      </div>
      <div className="icon-box">{icon}</div>
    </div>
  );
}