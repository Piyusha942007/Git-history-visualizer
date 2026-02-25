import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { GitBranch } from "lucide-react";
import "../styles/home.css";

export default function Home({ setRepoData }) {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl) return alert("Please enter repository URL");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/repo/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repoUrl }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setRepoData({
          name: repoUrl.replace("https://github.com/", ""),
          commits: data.commits,
        });

        navigate("/dashboard");
      } else {
        alert("Failed to analyze repository");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="container">
          <div className="logo-box">
            <div className="icon-bg-dark">
              <GitBranch className="hero-icon" />
            </div>
          </div>

          <h1 className="hero-title">
            Git History <span className="indigo-gradient">Visualizer</span>
          </h1>

          <p className="hero-subtitle">
            Visualize your repository's commit history and contributor insights.
          </p>

          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="https://github.com/user/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ marginTop: "15px" }}>
              <Button
                label={loading ? "Analyzing..." : "Analyze Repository"}
                onClick={handleAnalyze}
                className="cta-button"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}