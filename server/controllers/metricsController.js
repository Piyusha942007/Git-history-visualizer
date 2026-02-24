import { generateMetrics, getMetrics } from "../services/analyticsService.js";

/**
 * Generate fresh metrics
 */
export const generateMetricsController = async (req, res) => {
  try {
    const metrics = await generateMetrics();

    res.status(200).json({
      success: true,
      message: "Metrics generated successfully",
      data: metrics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get stored metrics
 */
export const getMetricsController = async (req, res) => {
  try {
    const metrics = await getMetrics();

    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};