/**
 * Temporary Analytics Service (No MongoDB)
 * -----------------------------------------
 * This version removes all DB dependency
 * to prevent Mongoose timeout errors.
 */

/**
 * Log a new event (console only)
 */
export const logEvent = async (userId, type, metadata = {}) => {
  try {
    console.log("📊 Event Logged:", {
      userId,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Event logged (console mode)",
    };
  } catch (error) {
    console.error("Error logging event:", error);
    return null; // Do NOT throw error (prevents crash)
  }
};

/**
 * Generate fake metrics (no DB)
 */
export const generateMetrics = async () => {
  try {
    return [
      { name: "Total Events", value: 0 },
      { name: "Today's Events", value: 0 },
    ];
  } catch (error) {
    console.error("Error generating metrics:", error);
    return [];
  }
};

/**
 * Fetch metrics (no DB)
 */
export const getMetrics = async () => {
  try {
    return [
      { name: "Total Events", value: 0 },
      { name: "Today's Events", value: 0 },
    ];
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return [];
  }
};