import mongoose from "mongoose";

const metricSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Metric", metricSchema);