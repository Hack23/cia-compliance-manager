#!/usr/bin/env node
/**
 * Quote-icons pass for mermaid diagrams.
 *
 * For every ```mermaid``` block in every Markdown file, finds flowchart /
 * graph node labels that
 *
 *   (a) contain at least one emoji (or other special character that the
 *       mermaid parser dislikes inside an unquoted label, such as `(`,
 *       `)`, `<`, `>`, `&`, `#`, `%`), AND
 *   (b) are not already wrapped in `"..."`,
 *
 * and rewrites them so the inner label is wrapped in double quotes — for
 * example `A[🧪 Vitest 4.1.4]` becomes `A["🧪 Vitest 4.1.4"]`.
 *
 * Only the safest, unambiguous shape forms are touched:
 *
 *   [label]            square        =>  ["label"]
 *   (label)            round         =>  ("label")
 *   {label}            rhombus       =>  {"label"}
 *   ([label])          stadium       =>  (["label"])
 *   [[label]]          subroutine    =>  [["label"]]
 *   [(label)]          cylinder      =>  [("label")]
 *   ((label))          circle        =>  (("label"))
 *
 * The script never edits labels that already start with `"`, that contain
 * a `"` character, that look like links/edges (`-->`, `---`, `==>`, etc.),
 * or that appear on `style`, `class`, `classDef`, `subgraph`, `linkStyle`,
 * or `direction` lines.
 *
 * Run with `--dry-run` to preview changes:
 *
 *   node scripts/quote-mermaid-icons.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : process.cwd());
const DRY_RUN = process.argv.includes("--dry-run");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", "coverage", ".cache"]);

// Detect emoji and other characters that need quoting in mermaid labels.
// We deliberately include `(`, `)`, `<`, `>`, `&`, `#`, `%` because mermaid
// flowchart parsers reject these inside unquoted node labels.
const NEEDS_QUOTING_RE = /(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{1F100}-\u{1F1FF}()<>&#%]|\u{FE0F})/u;

function walkMd(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(p, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function isFlowchartLike(firstLine) {
  // C4 diagrams use Person(...)/Container(...) syntax with their own
  // quoting rules — we must NOT apply the bracket-quoting heuristic to
  // them. Restrict the sweep to flowchart/graph (and a few diagrams with
  // similar shape syntax) only.
  return /^\s*(flowchart|graph)\b/i.test(firstLine);
}

const SKIP_LINE_RE = /^\s*(style|class|classDef|subgraph|end|direction|linkStyle|click|note\s|accTitle|accDescr|%%)/i;

function quoteLabelsInLine(line) {
  // Quickly skip irrelevant lines.
  if (SKIP_LINE_RE.test(line)) return line;
  if (line.trim() === "") return line;

  let result = "";
  let i = 0;
  while (i < line.length) {
    const ch = line[i];
    // Match opening bracket sequences ordered by length (longest first).
    const candidates = [
      { open: "([", close: "])" }, // stadium
      { open: "[[", close: "]]" }, // subroutine
      { open: "[(", close: ")]" }, // cylinder
      { open: "((", close: "))" }, // circle
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "{", close: "}" },
    ];

    let matched = null;
    for (const c of candidates) {
      if (line.startsWith(c.open, i)) {
        // Find matching close on same line (no nested same-shape inside).
        const closeIdx = line.indexOf(c.close, i + c.open.length);
        if (closeIdx !== -1) {
          const inner = line.slice(i + c.open.length, closeIdx);
          // Skip if inner is empty, already starts with " (already quoted),
          // contains a newline, or contains a nested bracket open we don't
          // handle.
          if (
            inner.length > 0 &&
            !inner.startsWith('"') &&
            !inner.endsWith('"') &&
            !inner.includes('"') &&
            NEEDS_QUOTING_RE.test(inner) &&
            // avoid double-handling: must look like a label (not link syntax)
            !/^[-=.<>|]/.test(inner) &&
            !inner.includes("-->") &&
            !inner.includes("==>") &&
            !inner.includes("-.->") &&
            !inner.includes("--") &&
            !inner.includes("==")
          ) {
            matched = { open: c.open, close: c.close, inner, end: closeIdx + c.close.length };
            break;
          }
        }
      }
    }

    if (matched) {
      result += matched.open + '"' + matched.inner + '"' + matched.close;
      i = matched.end;
    } else {
      result += ch;
      i++;
    }
  }
  return result;
}

function processMermaidBlock(blockLines) {
  if (!blockLines.length) return blockLines;
  if (!isFlowchartLike(blockLines[0])) return blockLines;
  return blockLines.map((l) => quoteLabelsInLine(l));
}

function processFile(file) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  const out = [];
  let inBlock = false;
  let fence = "";
  let buf = [];
  let changed = 0;
  for (const line of lines) {
    if (!inBlock) {
      const m = line.match(/^(\s*)(`{3,}|~{3,})mermaid\s*$/);
      if (m) {
        inBlock = true;
        fence = m[2];
        buf = [];
        out.push(line);
        continue;
      }
      out.push(line);
    } else {
      if (line.match(new RegExp(`^\\s*${fence}\\s*$`))) {
        const processed = processMermaidBlock(buf);
        for (let i = 0; i < processed.length; i++) {
          if (processed[i] !== buf[i]) changed++;
        }
        out.push(...processed);
        out.push(line);
        inBlock = false;
      } else {
        buf.push(line);
      }
    }
  }
  const newContent = out.join("\n");
  if (newContent !== content) {
    if (!DRY_RUN) fs.writeFileSync(file, newContent);
    return changed;
  }
  return 0;
}

const files = walkMd(REPO_ROOT);
let totalChanged = 0;
let filesChanged = 0;
for (const f of files) {
  const changed = processFile(f);
  if (changed > 0) {
    totalChanged += changed;
    filesChanged++;
    console.log(`${DRY_RUN ? "would change" : "updated"} ${path.relative(REPO_ROOT, f)}: ${changed} line(s)`);
  }
}
console.log(`\n${DRY_RUN ? "Would change" : "Changed"} ${totalChanged} line(s) in ${filesChanged} file(s).`);
