import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", ".next", ".git", "test-results", "scripts"]);
const forbidden = [
  /\brounded-(?!none\b)[\w-[\]/.:%]+/g,
  /\bshadow-[\w-[\]/.:%]+/g,
  /\bbg-gradient-[\w-[\]/.:%]+/g,
  /\bbackdrop-blur-[\w-[\]/.:%]+/g,
  /\b(?:Lexend|Inter|JetBrains\s+Mono)\b/g,
  /#(?:7655e8|6842df|582ecb|29c5a4|ffca55|ff806b|f25c41)/gi,
];

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(path);
    return /\.(?:css|md|tsx?|json|mjs)$/.test(entry.name) ? [path] : [];
  });
}

const targets = [
  join(root, "src"),
  join(root, "docs", "design-system.md"),
  join(root, "AGENTS.md"),
];
const files = targets.flatMap((target) =>
  statSync(target).isDirectory() ? filesIn(target) : [target],
);
const failures = [];
for (const file of files) {
  const contents = readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    for (const match of contents.matchAll(pattern)) {
      const line = contents.slice(0, match.index).split("\n").length;
      failures.push(`${relative(root, file)}:${line}: ${match[0]}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Forbidden legacy theme patterns found:\n" + failures.join("\n"));
  process.exit(1);
}

console.log("Theme check passed.");
