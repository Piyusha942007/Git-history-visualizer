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

    // 2️⃣ Log event (optional)
    await logEvent("system", "REPO_ANALYZED", { repoUrl });

    // 3️⃣ Return RAW commits array (IMPORTANT)
    return res.status(200).json({
      success: true,
      commits,
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