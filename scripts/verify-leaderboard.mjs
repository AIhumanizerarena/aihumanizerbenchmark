import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const path = new URL("../data/cycles/September%202026/leaderboard.json", import.meta.url);
const leaderboard = JSON.parse(await readFile(path, "utf8"));
const rows = leaderboard.humanizers;
const weights = leaderboard.formula;

assert.equal(leaderboard.cycle, "September 2026");
assert.equal(rows.length, 7);
assert.equal(Object.values(weights).reduce((sum, value) => sum + value, 0), 1);

const ranks = new Set();
const slugs = new Set();
for (const [index, row] of rows.entries()) {
  assert.equal(row.rank, index + 1, `unexpected rank for ${row.slug}`);
  assert(!ranks.has(row.rank), `duplicate rank ${row.rank}`);
  assert(!slugs.has(row.slug), `duplicate slug ${row.slug}`);
  ranks.add(row.rank);
  slugs.add(row.slug);

  assert.match(row.website, /^https:\/\//);
  for (const field of ["overall_reported", "bypass", "meaning", "readability", "consistency"]) {
    assert(Number.isFinite(row.scores[field]), `${row.slug}.${field} must be numeric`);
    assert(row.scores[field] >= 0 && row.scores[field] <= 100, `${row.slug}.${field} is outside 0–100`);
  }

  const recomputed =
    weights.bypass * row.scores.bypass +
    weights.meaning * row.scores.meaning +
    weights.readability * row.scores.readability +
    weights.consistency * row.scores.consistency;
  assert(Math.abs(recomputed - row.scores.overall_recomputed) < 1e-9, `${row.slug} recomputed score differs`);
  assert(Math.abs(row.scores.overall_reported - recomputed - row.scores.reported_delta) < 1e-9, `${row.slug} delta differs`);

  if (index > 0) {
    assert(rows[index - 1].scores.overall_reported >= row.scores.overall_reported, "leaderboard is not descending");
  }
}

for (const category of ["overall", "bypass", "meaning", "readability", "consistency"]) {
  const scoreField = category === "overall" ? "overall_reported" : category;
  const leader = rows.reduce((best, row) => row.scores[scoreField] > best.scores[scoreField] ? row : best);
  assert.equal(leader.slug, leaderboard.leaders[category], `incorrect ${category} leader`);
}

console.log(`verified ${rows.length} entries for ${leaderboard.cycle}`);
console.log("note: reported overall scores differ from direct formula recomputation; deltas are preserved explicitly");

