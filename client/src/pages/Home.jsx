import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { GitBranch, TrendingUp, Users, Activity } from 'lucide-react';
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
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
            Understand project evolution, team contributions, and activity trends in an intuitive way.
          </p>

          <div className="hero-cta">
            <Button 
              label="Go to Dashboard" 
              onClick={() => navigate('/dashboard')}
              className="cta-button"
            />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="features-section">
        <div className="container grid-3">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TrendingUp size={24} />
            </div>
            <h3>Commit Timeline</h3>
            <p>Track commit activity over time with interactive timeline charts</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Users size={24} />
            </div>
            <h3>Contributor Insights</h3>
            <p>Analyze team contributions and individual developer activity</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Activity size={24} />
            </div>
            <h3>Activity Heatmap</h3>
            <p>Discover peak activity times with detailed heatmap visualizations</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>Built for developers, students, and project teams · Powered by GitHub data</p>
      </footer>
    </div>
  );
}