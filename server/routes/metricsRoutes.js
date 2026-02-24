import express from "express";
import {
  generateMetricsController,
  getMetricsController,
} from "../controllers/metricsController.js";
import { logEvent } from "../services/analyticsService.js";

const router = express.Router();

// 🔹 Generate metrics
router.post("/generate", generateMetricsController);

// 🔹 Get metrics
router.get("/", getMetricsController);

// 🔹 Test event route (temporary)
router.get("/test-event", async (req, res) => {
  try {
    const event = await logEvent("user123", "TEST_EVENT", {
      message: "Testing event",
    });

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;