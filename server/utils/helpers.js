import { exec } from "child_process";

/**
 * Runs a shell command and returns output as Promise
 */
export const runGitCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Command Error:", stderr);
        reject(stderr);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};