import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);