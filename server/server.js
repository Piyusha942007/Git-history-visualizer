import dummyRoutes from "./routes/dummyRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import repoRoutes from "./routes/reporoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/repo", repoRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/dummy", dummyRoutes);

// health route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);