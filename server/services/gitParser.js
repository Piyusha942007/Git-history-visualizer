import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

export const parseGitHistory = async (repoUrl) => {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const tempDir = path.join("temp", repoName);

  try {
    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp");
    }

    if (!fs.existsSync(tempDir)) {
      await execAsync(`git clone ${repoUrl} ${tempDir}`);
    }

    const { stdout } = await execAsync(
      `git -C ${tempDir} log --pretty=format:"%H|%an|%ad|%s" --date=iso`
    );

    const commits = stdout.split("\n").map((line) => {
      const [hash, author, date, message] = line.split("|");

      return { hash, author, date, message };
    });

    // 🔥 CLEANUP after parsing
    fs.rmSync(tempDir, { recursive: true, force: true });

    return commits;
  } catch (error) {
    console.error("Git Parser Error:", error);

    // Cleanup even if error happens
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    throw new Error("Failed to parse git history");
  }
};