import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const cycleDir = new URL("../data/cycles/September%202026/", import.meta.url);
const load = async (name) => JSON.parse(await readFile(new URL(name, cycleDir), "utf8"));
const [leaderboard, penalties, originals, rewrites, detectors] = await Promise.all([
  load("leaderboard.json"),
  load("penalties.json"),
  load("evidence-originals.json"),
  load("evidence-rewrites.json"),
  load("evidence-detectors.json"),
]);
const rows = leaderboard.humanizers;
const weights = leaderboard.formula;
const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

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

assert.equal(penalties.penalties.length, rows.length);
for (const penalty of penalties.penalties) {
  const row = rows.find((entry) => entry.name === penalty.tool);
  assert(row, `penalty has unknown tool ${penalty.tool}`);
  assert.equal(penalty.raw_composite, row.scores.overall_recomputed);
  assert.equal(penalty.penalty_total, row.scores.penalty_total);
  const componentTotal = Object.values(penalty.components).reduce((sum, value) => sum + value, 0);
  assert(Math.abs(componentTotal - penalty.penalty_total) < 1e-9, `${penalty.tool} penalty components differ`);
  assert.equal(round2(penalty.raw_composite - penalty.penalty_total), penalty.reported_overall);
  assert.equal(penalty.reported_overall, row.scores.overall_reported);
}

assert.equal(originals.samples.length, 6);
assert.equal(new Set(originals.samples.map((sample) => sample.sample_id)).size, 6);
assert.equal(rewrites.rewrites.length, 41);
assert.equal(detectors.results.length, 42);

for (const sample of originals.samples) {
  const sampleRewrites = rewrites.rewrites.filter((row) => row.sample_id === sample.sample_id);
  const sampleDetectors = detectors.results.filter((row) => row.sample_id === sample.sample_id);
  const expectedRewrites = sample.sample_id === "S01" ? 6 : 7;
  assert.equal(sampleRewrites.length, expectedRewrites, `${sample.sample_id} rewrite count differs`);
  assert.equal(sampleDetectors.length, 7, `${sample.sample_id} must have seven detector rows`);
}

assert(!rewrites.rewrites.some((row) => row.sample_id === "S01" && row.tool === "GPTHuman"));

for (const result of detectors.results) {
  const values = Object.values(result.ai_probability_percent);
  assert.equal(values.length, 5);
  assert(values.every((value) => Number.isFinite(value) && value >= 0 && value <= 100));
  const passCount = values.filter((value) => value < 20).length;
  assert.equal(result.passes, `${passCount}/5`, `${result.sample_id} ${result.tool} pass count differs`);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  assert(Math.abs(mean - result.mean_ai_percent) < 1e-9, `${result.sample_id} ${result.tool} mean differs`);
}

for (const category of ["overall", "bypass", "meaning", "readability", "consistency"]) {
  const scoreField = category === "overall" ? "overall_reported" : category;
  const leader = rows.reduce((best, row) => row.scores[scoreField] > best.scores[scoreField] ? row : best);
  assert.equal(leader.slug, leaderboard.leaders[category], `incorrect ${category} leader`);
}

console.log(`verified ${rows.length} leaderboard entries for ${leaderboard.cycle}`);
console.log(`verified ${penalties.penalties.length} penalty breakdowns`);
console.log(`verified ${originals.samples.length} originals, ${rewrites.rewrites.length} rewrites, and ${detectors.results.length * 5} detector values`);
