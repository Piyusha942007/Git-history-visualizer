import { parseGitHistory } from "../services/gitParser.js";
import { logEvent } from "../services/analyticsService.js";

export const analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
      });
    }

    const analyticsData = await parseGitHistory(repoUrl);

    await logEvent("system", "REPO_ANALYZED", { repoUrl });

    return res.status(200).json({
      success: true,
      data: analyticsData,
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