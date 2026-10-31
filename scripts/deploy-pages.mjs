import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const branch = "gh-pages";
const base = process.argv[2] || "/globalconsultingprofessionals.com/";
if (!base.startsWith("/") || !base.endsWith("/") || base.includes("..")) {
  throw new Error("Supply an absolute site base ending in /.");
}

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed`);
  }
  return result.stdout.trim();
}

const remote = run("git", ["remote", "get-url", "origin"]);
if (!/github\.com[:/]Advaita-expo\/globalconsultingprofessionals\.com(?:\.git)?$/i.test(remote)) {
  throw new Error("The origin remote must be the GCP GitHub repository.");
}

console.log(`Building the website for ${base}`);
run(process.execPath, ["scripts/prepare-pages.mjs"]);
run(process.execPath, ["node_modules/typescript/bin/tsc", "--noEmit"]);
console.log(run(process.execPath, ["node_modules/vite/bin/vite.js", "build", "--base", base]));

// Use a fresh, ignored checkout. The source branch is never reset or switched.
const localState = resolve(root, ".sites-local");
mkdirSync(localState, { recursive: true });
const publishing = mkdtempSync(join(localState, "pages-publish-"));
if (dirname(publishing) !== localState) throw new Error("Invalid publishing directory.");
run("git", ["init", "--initial-branch", branch], publishing);
run("git", ["remote", "add", "origin", remote], publishing);
if (run("git", ["ls-remote", "--heads", "origin", branch])) {
  run("git", ["fetch", "--depth=1", "origin", branch], publishing);
  run("git", ["switch", "--force-create", branch, "FETCH_HEAD"], publishing);
  // Only generated files in this validated, newly created checkout are removed.
  run("git", ["rm", "-r", "--ignore-unmatch", "."], publishing);
}
cpSync(resolve(root, "dist"), publishing, { recursive: true });
writeFileSync(join(publishing, ".nojekyll"), "");
run("git", ["add", "--all"], publishing);
if (run("git", ["status", "--porcelain"], publishing)) {
  const source = run("git", ["rev-parse", "--short", "HEAD"]);
  run("git", ["commit", "-m", `Publish GCP website from ${source}`], publishing);
  console.log(run("git", ["push", "origin", `${branch}:${branch}`], publishing));
  console.log(`Published static files to ${branch}.`);
} else {
  console.log("The published files already match this build.");
}
console.log("GitHub Pages should use Deploy from a branch: gh-pages / (root).");
