import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

export const parseGitHistory = async (repoUrl) => {
  const repoName = repoUrl.split("/").pop().replace(".git", "");
  const tempDir = path.join("temp", repoName);

  try {
    if (!fs.existsSync("temp")) fs.mkdirSync("temp");

    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    await execAsync(`git clone --depth=500 ${repoUrl} ${tempDir}`);

    const { stdout } = await execAsync(
      `git -C ${tempDir} log --pretty=format:"%H|%an|%ad|%s" --date=iso-strict`
    );

    const lines = stdout.split("\n").filter(Boolean);

    const commits = [];
    const contributors = {};
    const timeline = {};
    const heatmap = {};
    const dayCount = { 0:0,1:0,2:0,3:0,4:0,5:0,6:0 };

    for (const line of lines) {
      const [hash, authorRaw, rawDate, message] = line.split("|");

      const date = new Date(rawDate);
      if (isNaN(date.getTime())) continue;

      const author = authorRaw?.trim() || "Unknown";

      commits.push({ hash, author, date, message });

      /* ---------- NORMALIZE NAME ---------- */

      const normalized = author
        .toLowerCase()
        .replace(/\s+/g," ")
        .trim();

      if (!contributors[normalized]) {
        contributors[normalized] = {
          name: author,
          commits: 0
        };
      }

      contributors[normalized].commits++;

      /* ---------- TIMELINE ---------- */

      const dayKey = date.toISOString().slice(0,10);
      timeline[dayKey] = (timeline[dayKey] || 0) + 1;

      /* ---------- HEATMAP ---------- */

      const day = date.getDay();
      const hour = date.getHours();
      heatmap[`${day}-${hour}`] =
        (heatmap[`${day}-${hour}`] || 0) + 1;

      dayCount[day]++;
    }

    const sortedTimeline = Object.fromEntries(
      Object.entries(timeline).sort(
        (a,b)=> new Date(a[0]) - new Date(b[0])
      )
    );

    const topContributors = Object.values(contributors)
      .sort((a,b)=> b.commits - a.commits)
      .slice(0,5);

    const mostActiveDayIndex = Object.keys(dayCount).reduce((a,b)=>
      dayCount[a] > dayCount[b] ? a : b
    );

    const dayNames = [
      "Sunday","Monday","Tuesday",
      "Wednesday","Thursday","Friday","Saturday"
    ];

    const latestCommit = commits[0]?.date;
    let recent = "--";

    if (latestCommit) {
      const diffMs = Date.now() - latestCommit.getTime();
      const hours = Math.floor(diffMs / 3600000);

      if (hours < 1) recent = "Just now";
      else if (hours < 24) recent = `${hours}h ago`;
      else recent = `${Math.floor(hours/24)}d ago`;
    }

    fs.rmSync(tempDir, { recursive: true, force: true });

    return {
      name: repoName,
      commits,
      totalCommits: commits.length,
      activeContributors: Object.keys(contributors).length,
      mostActiveDay: dayNames[mostActiveDayIndex],
      recentActivity: recent,
      timeline: sortedTimeline,
      heatmap,
      topContributors
    };

  } catch (error) {
    console.error("Git Parser Error:", error);

    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    throw new Error("Failed to parse git history");
  }
};