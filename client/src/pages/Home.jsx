import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/layout.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Git History Visualizer</h1>
        <p>
          Visualize commits, contributors, and activity of any GitHub repository.
        </p>

        <Button
          label="Go to Dashboard"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}