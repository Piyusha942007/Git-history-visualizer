import { parseGitHistory } from "../services/gitParser.js";
import { logEvent } from "../services/analyticsService.js";

/**
 * POST /api/repo/analyze
 * Body: { repoUrl: string }
 */
export const analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    // 1️⃣ Parse git history
    const commits = await parseGitHistory(repoUrl);

    // 2️⃣ Generate analytics
    const totalCommits = commits.length;

    // Group by date (timeline)
    const commitsByDate = {};
    const contributors = {};

    commits.forEach((commit) => {
      const date = new Date(commit.date).toISOString().split("T")[0];

      // Timeline
      commitsByDate[date] = (commitsByDate[date] || 0) + 1;

      // Contributor stats
      const author = commit.author || "Unknown";
      contributors[author] = (contributors[author] || 0) + 1;
    });

    // Convert objects to arrays (frontend friendly)
    const timeline = Object.entries(commitsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    const contributorStats = Object.entries(contributors).map(
      ([author, count]) => ({
        author,
        commits: count,
      })
    );

    // 3️⃣ Log event (optional)
    await logEvent("system", "REPO_ANALYZED", { repoUrl });

    return res.status(200).json({
      success: true,
      message: "Repository analyzed successfully",
      data: {
        totalCommits,
        timeline,
        contributors: contributorStats,
      },
    });
  } catch (error) {
    console.error("Analyze Repo Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze repository",
      error: error.message,
    });
  }
};

/**
 * GET /api/repo/test-git
 */
export const testGit = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Git route working ✅",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Git test failed",
    });
  }
};