# AI Humanizer Benchmark — September 2026

A comparison of seven AI humanizer tools, based on the September 2026 leaderboard supplied by the benchmark maintainer.

## Leaderboard

| Rank | AI humanizer | Overall | Bypass | Meaning | Readability | Consistency | Free plan |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | :---: |
| 1 | [GPTHuman](https://gpthuman.ai) | **88.28** | **92.6** | **91.4** | **89.7** | **90.3** | Yes |
| 2 | [StealthGPT](https://www.stealthgpt.ai) | 81.14 | 86.2 | 78.9 | 84.1 | 82.6 | Yes |
| 3 | [Humanize AI Pro](https://www.humanizeai.pro) | 79.52 | 80.4 | 82.1 | 83.6 | 81.8 | Yes |
| 4 | [HIX AI](https://hix.ai) | 76.83 | 84.7 | 79.6 | 72.4 | 77.1 | Yes |
| 5 | [BypassGPT](https://www.bypassgpt.ai) | 73.41 | 78.5 | 76.2 | 75.8 | 74.3 | Yes |
| 6 | [Netus AI](https://netus.ai) | 70.18 | 75.3 | 74.8 | 73.2 | 71.6 | Yes |
| 7 | [NoteGPT AI Humanizer](https://notegpt.io/ai-humanizer) | 51.27 | 18.4 | 81.2 | 86.5 | 62.9 | Yes |

GPTHuman ranks first overall and leads all four published sub-scores.

## September test details

- Testing period: 1–8 September 2026
- Samples: 150 unique source texts per tool; 1,050 humanized outputs total
- Detectors: GPTZero, Originality.ai, Copyleaks, Winston AI, and ZeroGPT
- Detector runs: 750 per tool; 5,250 total
- Methodology version: `v2.1.0`
- Dataset: `humanizer-sept-2026-v1`
- Corpus: academic, professional, blog, and long-form texts

## How the score is built

The source workbook states this formula:

```text
Overall = 0.40 × Bypass + 0.25 × Meaning + 0.20 × Readability + 0.15 × Consistency
```

The reported overall subtracts itemized quality penalties from that raw composite:

```text
Reported Overall = Raw composite − quality penalties
```

The penalties cover split detector results, excess length, meaning drift, residual AI writing patterns, and instability across reruns. The complete rules and per-tool deductions are in [`penalties.json`](data/cycles/September%202026/penalties.json).

## Evidence pack

The repository includes a representative slice of six source texts, 41 supplied tool rewrites, and 210 detector values. The workbook omits the GPTHuman rewrite for sample `S01`, although it includes a detector row for that combination. The remaining slice helps readers inspect output quality and compare the tools directly.

The detector percentages are real test results for the six-text evidence slice. They cover 210 detector results: five detectors applied to six samples across seven tools. They are a representative subset of the 5,250 detector results used for the full leaderboard.

## Repository contents

```text
data/
  cycles/
    September 2026/
      leaderboard.json       # normalized rankings and score components
      leaderboard.csv        # portable table export
      penalties.json         # itemized deductions and penalty rules
      methodology.json       # sampling, settings, and scoring method
      evidence-originals.json
      evidence-rewrites.json
      evidence-detectors.json
      source.json            # provenance, scope, and test metadata
scripts/
  verify-leaderboard.mjs     # schema, ranking, and arithmetic checks
```

## Verify the data

Requires Node.js 18 or later.

```bash
npm run verify
```

The verifier checks required fields, unique ranks and slugs, descending score order, category leaders, weighted composites, penalty arithmetic, evidence counts, detector means, and pass counts.

Product names and trademarks belong to their respective owners. A ranking is a measurement claim, not an endorsement or affiliation.

## License

Code is released under the [MIT License](LICENSE). Data files are released under [CC BY 4.0](LICENSE-data).
