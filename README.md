# AI Humanizer Benchmark — September 2026

An independent comparison of seven AI humanizer tools, based on the September 2026 leaderboard supplied by the benchmark maintainer.

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

## Scoring note

The source workbook states this formula:

```text
Overall = 0.40 × Bypass + 0.25 × Meaning + 0.20 × Readability + 0.15 × Consistency
```

The reported overall scores do not equal the direct weighted result of the four published sub-scores. The difference ranges from 2.16 to 4.02 points. This repository preserves the reported scores and publishes the recomputed values and differences in [`data/cycles/September 2026/leaderboard.json`](data/cycles/September%202026/leaderboard.json). This may reflect an unpublished adjustment or penalty, but the supplied workbook does not identify one.

## Repository contents

```text
data/
  cycles/
    September 2026/
      leaderboard.json       # normalized source data and formula comparison
      leaderboard.csv        # portable table export
      source.json            # provenance and test metadata
scripts/
  verify-leaderboard.mjs     # schema, ranking, and arithmetic checks
```

## Verify the data

Requires Node.js 18 or later.

```bash
npm run verify
```

The verifier checks required fields, unique ranks and slugs, descending score order, category leaders, and the recomputed weighted scores. It deliberately does not claim to reproduce detector-level results because the supplied source contains aggregate scores only.

## Data provenance and limitations

The September values were imported from `september-2026-ai-humanizer-leaderboard.xlsx`, supplied by the repository owner on 11 September 2026. The workbook contains aggregate scores and test metadata. It does not contain the 150 source texts, 1,050 humanized outputs, individual detector verdicts, scoring code, or evidence supporting the stated testing process. Those claims therefore cannot be independently reproduced from this repository alone.

Product names and trademarks belong to their respective owners. A ranking is a measurement claim, not an endorsement or affiliation.

## License

Code is released under the [MIT License](LICENSE). Data files are released under [CC BY 4.0](LICENSE-data).

