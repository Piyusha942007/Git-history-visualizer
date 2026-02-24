import Event from "../models/Event.js";
import Metric from "../models/Metric.js";

/**
 * Log a new event
 */
export const logEvent = async (userId, type, metadata = {}) => {
  try {
    return await Event.create({
      userId,
      type,
      metadata,
    });
  } catch (error) {
    console.error("Error logging event:", error);
    throw new Error("Failed to log event");
  }
};

/**
 * Generate aggregated metrics
 */
export const generateMetrics = async () => {
  try {
    const totalEvents = await Event.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEvents = await Event.countDocuments({
      createdAt: { $gte: today },
    });

    const metrics = [
      { name: "Total Events", value: totalEvents },
      { name: "Today's Events", value: todayEvents },
    ];

    // Instead of deleting everything, update or insert
    for (const metric of metrics) {
      await Metric.findOneAndUpdate(
        { name: metric.name },
        { value: metric.value },
        { upsert: true, new: true }
      );
    }

    return metrics;
  } catch (error) {
    console.error("Error generating metrics:", error);
    throw new Error("Failed to generate metrics");
  }
};

/**
 * Fetch latest metrics
 */
export const getMetrics = async () => {
  try {
    return await Metric.find().sort({ updatedAt: -1 });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw new Error("Failed to fetch metrics");
  }
};