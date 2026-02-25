import { useState } from "react";
import { analyzeRepository } from "../services/api";
import "../styles/cards.css";
import "../styles/buttons.css";

export default function RepoInputCard({ onDataFetched }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a repository URL");
      return;
    }

    try {
      setLoading(true);

      const commits = await analyzeRepository(repoUrl);

      // Send commits to Dashboard
      onDataFetched(commits);

    } catch (error) {
      console.error(error);
      alert("Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="repo-card">
      <h3 className="repo-title">Enter GitHub Repo URL</h3>

      <input
        type="text"
        placeholder="https://github.com/user/project"
        className="repo-input"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze History"}
      </button>
    </div>
  );
}