import dummyRoutes from "./routes/dummyRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import repoRoutes from "./routes/reporoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js"; // ✅ MOVE HERE

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/repo", repoRoutes);
app.use("/api/metrics", metricsRoutes); // ✅ now safe
app.use("/api/dummy", dummyRoutes); // 👈 ADD HERE

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// health route
app.get("/", (req, res) => {
  res.send("Server running + DB connected 🚀");
});

// test DB route
app.get("/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);