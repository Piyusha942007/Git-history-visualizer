import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import repoRoutes from "./routes/reporoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import dummyRoutes from "./routes/dummyRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/repo", repoRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/dummy", dummyRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);