import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import repoRoutes from "./routes/reporoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import dummyRoutes from "./routes/dummyRoutes.js";

dotenv.config();

const app = express();

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://git-time-traveller.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

/* -------- LOG REQUESTS -------- */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* -------- ROUTES -------- */
app.use("/api/repo", repoRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/dummy", dummyRoutes);

/* -------- ROOT -------- */
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(PORT, () => console.log("Server running"))