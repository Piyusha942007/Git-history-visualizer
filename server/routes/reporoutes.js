import express from "express";
import { analyzeRepo, testGit } from "../controllers/repoController.js";

const router = express.Router();

// Analyze repository
router.post("/analyze", analyzeRepo);

// Test git installation
router.get("/test-git", testGit);

export default router;