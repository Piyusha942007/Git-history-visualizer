import express from "express";
import { getDummyAnalytics } from "../controllers/dummyController.js";

const router = express.Router();

router.get("/analytics", getDummyAnalytics);

export default router;