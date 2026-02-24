import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,   // ✅ changed from ObjectId to String
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