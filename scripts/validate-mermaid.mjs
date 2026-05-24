#!/usr/bin/env node
/**
 * Mermaid diagram validator.
 *
 * Walks the repository, extracts every ```mermaid``` fenced code block from
 * Markdown files, and validates each block by invoking `mmdc`
 * (@mermaid-js/mermaid-cli). A JSON report listing broken diagrams (with
 * file path, block index, line range, parser error, and the offending
 * snippet) is written to `build/mermaid-report.json`.
 *
 * Usage:
 *   node scripts/validate-mermaid.mjs               # scans repo root
 *   node scripts/validate-mermaid.mjs <dir>         # scans a different root
 *   MMDC=/path/to/mmdc node scripts/validate-mermaid.mjs
 *   PUP_CONFIG=/path/to/pup.json node scripts/validate-mermaid.mjs
 *
 * Exit code is the number of broken blocks (0 = all valid).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const REPO_ROOT = path.resolve(process.argv[2] || process.cwd());

function resolveMmdc() {
  if (process.env.MMDC) return process.env.MMDC;
  const local = path.join(REPO_ROOT, "node_modules", ".bin", "mmdc");
  if (fs.existsSync(local)) return local;
  const tmp = "/tmp/mermaid-test/node_modules/.bin/mmdc";
  if (fs.existsSync(tmp)) return tmp;
  return "mmdc";
}

function resolvePuppeteerConfig() {
  if (process.env.PUP_CONFIG) return process.env.PUP_CONFIG;
  const defaultPath = "/tmp/pup-config.json";
  if (!fs.existsSync(defaultPath)) {
    const chrome = ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
      .find((p) => fs.existsSync(p));
    const cfg = { args: ["--no-sandbox", "--disable-setuid-sandbox"] };
    if (chrome) cfg.executablePath = chrome;
    fs.writeFileSync(defaultPath, JSON.stringify(cfg));
  }
  return defaultPath;
}

const MMDC = resolveMmdc();
const PUP_CONFIG = resolvePuppeteerConfig();
const reportDir = path.join(REPO_ROOT, "build");
fs.mkdirSync(reportDir, { recursive: true });
const REPORT_PATH = path.join(reportDir, "mermaid-report.json");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", "coverage", ".cache"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function extractBlocks(content) {
  const lines = content.split("\n");
  const blocks = [];
  let inBlock = false;
  let startLine = 0;
  let buf = [];
  let fence = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inBlock) {
      const m = line.match(/^(\s*)(`{3,}|~{3,})mermaid\s*$/);
      if (m) {
        inBlock = true;
        startLine = i + 1;
        buf = [];
        fence = m[2];
      }
    } else {
      if (line.match(new RegExp(`^\\s*${fence}\\s*$`))) {
        blocks.push({ startLine: startLine + 1, endLine: i + 1, code: buf.join("\n") });
        inBlock = false;
      } else {
        buf.push(line);
      }
    }
  }
  return blocks;
}

function validate(code, scratchDir, id) {
  const mmdPath = path.join(scratchDir, `b_${id}.mmd`);
  const svgPath = path.join(scratchDir, `b_${id}.svg`);
  fs.writeFileSync(mmdPath, code);
  const res = spawnSync(MMDC, ["-i", mmdPath, "-o", svgPath, "--puppeteerConfigFile", PUP_CONFIG, "-q"], {
    encoding: "utf8",
    timeout: 60000,
  });
  const ok = res.status === 0 && fs.existsSync(svgPath);
  return { ok, output: `${res.stderr || ""}\n${res.stdout || ""}`.trim() };
}

const files = walk(REPO_ROOT);
console.log(`Scanning ${files.length} markdown files (root: ${REPO_ROOT})`);

const scratchDir = fs.mkdtempSync(path.join(os.tmpdir(), "mmd-val-"));
const results = [];
let totalBlocks = 0;
let brokenBlocks = 0;

for (const f of files) {
  const rel = path.relative(REPO_ROOT, f);
  const content = fs.readFileSync(f, "utf8");
  const blocks = extractBlocks(content);
  if (!blocks.length) continue;
  for (let i = 0; i < blocks.length; i++) {
    totalBlocks++;
    const b = blocks[i];
    const { ok, output } = validate(b.code, scratchDir, totalBlocks);
    if (!ok) {
      brokenBlocks++;
      results.push({
        file: rel,
        index: i,
        startLine: b.startLine,
        endLine: b.endLine,
        error: output.split("\n").slice(-40).join("\n"),
        code: b.code,
      });
      console.log(`  BROKEN: ${rel} block#${i} L${b.startLine}-${b.endLine}`);
    }
  }
  process.stdout.write(`${rel}: ${blocks.length} blocks\n`);
}

fs.writeFileSync(REPORT_PATH, JSON.stringify({ totalFiles: files.length, totalBlocks, brokenBlocks, results }, null, 2));
console.log(`\nTotal: ${totalBlocks} blocks, Broken: ${brokenBlocks}. Report: ${REPORT_PATH}`);
process.exit(brokenBlocks);
