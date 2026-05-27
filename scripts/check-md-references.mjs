#!/usr/bin/env node
/**
 * Markdown reference checker.
 *
 * Walks the repository and verifies that every relative link or image
 * reference inside Markdown files points to an actual file (and that
 * any in-file `#anchor` resolves to a real heading).
 *
 * Run with `node scripts/check-md-references.mjs`. Exit code equals the
 * number of broken references.
 */
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(process.argv[2] || process.cwd());
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", "coverage", ".cache"]);

function walkMd(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(p, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function slugify(text) {
  // Approximates GitHub's heading-anchor slug algorithm:
  //  1. Strip markdown emphasis markers (`*`, `_`, `` ` ``) and HTML tags
  //  2. Lowercase
  //  3. Remove characters that aren't word chars, whitespace, or dashes
  //     (emoji and punctuation disappear, but leave the space behind)
  //  4. Replace each whitespace character with a single dash
  //  Notably we DO NOT trim leading/trailing dashes — GitHub keeps the
  //  leading dash that results from a heading like `## 🎯 Title`.
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s/g, "-");
}

function collectAnchors(content) {
  const slugs = new Set();
  const counts = new Map();
  for (const line of content.split("\n")) {
    const m = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (m) {
      let slug = slugify(m[2]);
      const n = counts.get(slug) || 0;
      counts.set(slug, n + 1);
      if (n > 0) slug = `${slug}-${n}`;
      slugs.add(slug);
    }
  }
  return slugs;
}

const files = walkMd(REPO_ROOT);
const anchorCache = new Map();
function getAnchors(file) {
  if (!anchorCache.has(file)) {
    try {
      anchorCache.set(file, collectAnchors(fs.readFileSync(file, "utf8")));
    } catch {
      anchorCache.set(file, new Set());
    }
  }
  return anchorCache.get(file);
}

// Strip fenced code blocks so we don't lint code samples.
function stripFences(src) {
  return src.replace(/```[\s\S]*?```/g, "").replace(/~~~[\s\S]*?~~~/g, "");
}

const LINK_RE = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const broken = [];
let total = 0;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const stripped = stripFences(src);
  const dir = path.dirname(file);
  let m;
  while ((m = LINK_RE.exec(stripped)) !== null) {
    total++;
    const target = m[2];
    if (!target || target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:") || target.startsWith("tel:") || target.startsWith("#")) {
      // External or in-file anchor — handle in-file separately below.
      if (target.startsWith("#")) {
        const slugs = getAnchors(file);
        const anchor = target.slice(1);
        if (anchor && !slugs.has(anchor)) {
          broken.push({ file: path.relative(REPO_ROOT, file), link: target, reason: "missing in-file anchor" });
        }
      }
      continue;
    }
    if (target.startsWith("<") || target.startsWith("data:") || target.startsWith("//")) continue;

    let [pathPart, anchor] = target.split("#");
    pathPart = decodeURI(pathPart);
    const resolved = path.resolve(dir, pathPart);
    if (!fs.existsSync(resolved)) {
      broken.push({ file: path.relative(REPO_ROOT, file), link: target, reason: "file not found" });
      continue;
    }
    if (anchor && resolved.endsWith(".md")) {
      const slugs = getAnchors(resolved);
      if (!slugs.has(anchor)) {
        broken.push({ file: path.relative(REPO_ROOT, file), link: target, reason: `missing anchor #${anchor}` });
      }
    }
  }
}

const reportDir = path.join(REPO_ROOT, "build");
fs.mkdirSync(reportDir, { recursive: true });
const reportPath = path.join(reportDir, "md-reference-report.json");
fs.writeFileSync(reportPath, JSON.stringify({ totalLinks: total, brokenCount: broken.length, broken }, null, 2));

console.warn(`Checked ${total} links/refs across ${files.length} files.`);
console.warn(`Broken: ${broken.length}`);
for (const b of broken.slice(0, 200)) console.warn(`  ${b.file}: ${b.link} (${b.reason})`);
if (broken.length > 200) console.warn(`  ... and ${broken.length - 200} more (see ${reportPath})`);

process.exit(broken.length);
