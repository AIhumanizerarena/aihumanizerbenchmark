# AI Humanizer Benchmark — October 2026

A comparison of ten AI humanizer tools, based on the aggregate October 2026 leaderboard and detector breakdown supplied by the benchmark maintainer.

## Best AI Humanizer

| Rank | Tool | Overall | Bypass Rate | Meaning | Readability | Factual Accuracy | Length Stability |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | **GPTHuman** | **87.9** | **92.4%** | 85.7 | 89.3 | 94.1% | 1.04× |
| 2 | WriteHuman | 75.6 | 87.1% | 73.8 | 69.2 | 88.6% | 1.11× |
| 3 | Undetectable.ai | 73.8 | 80.7% | 83.4 | 71.6 | 89.2% | 1.18× |
| 4 | Stealth Writer | 69.4 | 78.5% | 76.1 | 63.8 | 84.7% | 1.09× |
| 5 | UndetectedGPT | 68.7 | 84.1% | 71.9 | 68.4 | 82.3% | 1.15× |
| 6 | HIX Bypass | 65.9 | 71.7% | 77.5 | 59.7 | 86.1% | 1.13× |
| 7 | Phrasly | 63.1 | 90.5% | 56.8 | 54.3 | 79.4% | 1.27× |
| 8 | SmartHumanizer | 60.4 | 68.3% | 69.7 | 62.9 | 81.6% | 1.08× |
| 9 | GPTinf | 57.2 | 65.6% | 67.4 | 58.1 | 78.9% | 1.21× |
| 10 | QuillBot | 51.8 | 39.3% | 78.6 | 80.7 | 91.3% | 0.96× |

GPTHuman ranks first overall with **87.9**. It also has the highest average bypass rate (**92.4%**), meaning score (**85.7**), readability score (**89.3**), and factual accuracy (**94.1%**) in the supplied table.

## Bypass rate by detector

| Tool | Pangram | GPTZero | Originality.ai | Copyleaks | ZeroGPT | Average |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| GPTHuman | 90.1% | 93.7% | 94.2% | 91.8% | 92.0% | 92.4% |
| WriteHuman | 82.4% | 89.6% | 88.9% | 86.3% | 88.4% | 87.1% |
| UndetectedGPT | 79.8% | 86.1% | 85.7% | 83.9% | 85.2% | 84.1% |
| Undetectable.ai | 76.3% | 83.4% | 82.8% | 80.1% | 81.0% | 80.7% |
| Stealth Writer | 73.9% | 80.2% | 79.6% | 78.4% | 80.5% | 78.5% |
| HIX Bypass | 67.2% | 73.8% | 74.1% | 71.6% | 71.9% | 71.7% |
| Phrasly | 88.7% | 91.9% | 91.4% | 90.2% | 90.5% | 90.5% |
| SmartHumanizer | 64.1% | 70.6% | 69.8% | 67.9% | 68.9% | 68.3% |
| GPTinf | 61.8% | 67.4% | 66.9% | 65.2% | 66.7% | 65.6% |
| QuillBot | 35.6% | 41.2% | 40.8% | 38.9% | 40.1% | 39.3% |

GPTHuman has the highest bypass rate in every listed detector column. Phrasly is second on average bypass rate at **90.5%**, but ranks seventh overall because its meaning, readability, factual accuracy, and length-stability scores are lower.

## October data supplied

- Cycle: October 2026
- Tools: 10
- Detectors: Pangram, GPTZero, Originality.ai, Copyleaks, and ZeroGPT
- Overall leaderboard: [`leaderboard.csv`](data/cycles/October%202026/leaderboard.csv)
- Detector breakdown: [`detector-bypass.csv`](data/cycles/October%202026/detector-bypass.csv)
- Source metadata: [`source.json`](data/cycles/October%202026/source.json)

The October source files contain aggregate results only. Testing dates, sample counts, source texts, raw humanized outputs, per-sample detector logs, scoring weights, and penalty rules were not supplied, so those details are not claimed here.

## Repository contents

```text
data/
  cycles/
    October 2026/
      leaderboard.csv        # overall rankings and component scores
      detector-bypass.csv    # bypass rate by detector
      source.json            # provenance and availability notes
    September 2026/
      leaderboard.json       # archived normalized rankings
      leaderboard.csv        # archived portable table export
      penalties.json         # archived deductions and penalty rules
      methodology.json       # archived sampling and scoring method
      evidence-originals.json
      evidence-rewrites.json
      evidence-detectors.json
      source.json
scripts/
  verify-leaderboard.mjs     # verifier for the archived September evidence pack
```

## Verify the archived September pack

Requires Node.js 18 or later.

```bash
npm run verify
```

The verifier checks the archived September evidence pack. It does not recalculate the October aggregate CSVs because October's underlying samples, scoring formula, and raw detector logs were not supplied.

Product names and trademarks belong to their respective owners. A ranking is a measurement claim, not an endorsement or affiliation.

## License

Code is released under the [MIT License](LICENSE). Data files are released under [CC BY 4.0](LICENSE-data).
