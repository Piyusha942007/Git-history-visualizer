import "../styles/cards.css";
import "../styles/buttons.css";

export default function RepoInputCard() {
  return (
    <div className="repo-card">
      <h3 className="repo-title">Enter GitHub Repo URL</h3>

      <input
        type="text"
        placeholder="https://github.com/user/project"
        className="repo-input"
      />

      <button className="primary-btn">Analyze History</button>

      <div className="key-outputs">
        <h4>Key Outputs</h4>
        <ul>
          <li>Timeline Graph</li>
          <li>Heatmap</li>
          <li>Contributor Stats</li>
        </ul>
      </div>
    </div>
  );
}