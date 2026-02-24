import Event from "../models/Event.js";
import Metric from "../models/Metric.js";

export const logEvent = async (userId, type, metadata = {}) => {
  return await Event.create({
    userId,
    type,
    metadata,
  });
};

export const generateMetrics = async () => {
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

  await Metric.deleteMany({});
  await Metric.insertMany(metrics);

  return metrics;
};

export const getMetrics = async () => {
  return await Metric.find().sort({ createdAt: -1 });
};