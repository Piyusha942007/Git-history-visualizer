export const logEvent = async (userId, type, metadata = {}) => {
  try {
    console.log("📊 Event Logged:", {
      userId,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error logging event:", error);
    return null;
  }
};

export const generateMetrics = async () => {
  return [
    { name: "Total Events", value: 0 },
    { name: "Today's Events", value: 0 },
  ];
};

export const getMetrics = async () => {
  return [
    { name: "Total Events", value: 0 },
    { name: "Today's Events", value: 0 },
  ];
};