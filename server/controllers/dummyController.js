export const getDummyAnalytics = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        data: {
          totalCommits: 120,
          timeline: [
            { date: "2026-02-20", count: 5 },
            { date: "2026-02-21", count: 8 },
            { date: "2026-02-22", count: 12 },
          ],
          contributors: [
            { author: "Snehal", commits: 40 },
            { author: "Khushi", commits: 80 },
          ],
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Dummy API failed",
      });
    }
  };