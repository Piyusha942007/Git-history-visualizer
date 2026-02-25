const BASE_URL = "http://localhost:5000/api";

/**
 * Analyze GitHub Repository
 * @param {string} repoUrl
 * @returns {Promise<Array>} commits array
 */
export const analyzeRepository = async (repoUrl) => {
  try {
    const response = await fetch(`${BASE_URL}/repo/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to analyze repository");
    }

    return data.commits; // IMPORTANT: raw commits array
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};