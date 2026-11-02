# AI Humanizer Benchmark — November 2026

A comparison of ten AI humanizer tools, based on the aggregate November 2026 leaderboard and detector breakdown supplied by the benchmark maintainer.

## Best AI Humanizer

| Rank | Tool | Overall | Bypass Rate | Meaning | Readability | Factual Accuracy | Length Stability |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | **GPTHuman** | **88.6** | **93.0%** | 86.5 | 89.9 | 94.8% | 1.03× |
| 2 | WriteHuman | 74.1 | 85.3% | 72.5 | 68.0 | 87.3% | 1.12× |
| 3 | Undetectable.ai | 72.0 | 78.8% | 82.0 | 70.2 | 87.9% | 1.20× |
| 4 | Stealth Writer | 67.7 | 76.6% | 74.8 | 62.3 | 83.5% | 1.10× |
| 5 | UndetectedGPT | 66.8 | 82.2% | 70.4 | 67.1 | 81.0% | 1.16× |
| 6 | HIX Bypass | 64.2 | 69.7% | 76.1 | 58.3 | 84.8% | 1.14× |
| 7 | Phrasly | 61.4 | 88.6% | 55.1 | 52.8 | 78.0% | 1.29× |
| 8 | SmartHumanizer | 58.6 | 66.3% | 68.2 | 61.4 | 80.3% | 1.09× |
| 9 | GPTinf | 55.5 | 63.7% | 65.8 | 56.7 | 77.5% | 1.23× |
| 10 | QuillBot | 50.3 | 37.8% | 77.3 | 79.5 | 90.4% | 0.95× |

GPTHuman ranks first overall with **88.6**. It also has the highest average bypass rate (**93.0%**), meaning score (**86.5**), readability score (**89.9**), and factual accuracy (**94.8%**) in the supplied table.

## Bypass rate by detector

| Tool | Pangram | GPTZero | Originality.ai | Copyleaks | ZeroGPT | Average |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| GPTHuman | 91.6% | 94.7% | 95.2% | 92.8% | 93.4% | 93.0% |
| WriteHuman | 81.1% | 88.3% | 87.5% | 85.0% | 87.2% | 85.3% |
| UndetectedGPT | 78.0% | 84.9% | 84.2% | 82.1% | 84.0% | 82.2% |
| Undetectable.ai | 74.9% | 81.6% | 81.0% | 78.7% | 80.3% | 78.8% |
| Stealth Writer | 72.3% | 79.0% | 78.4% | 76.8% | 79.2% | 76.6% |
| HIX Bypass | 65.7% | 72.2% | 72.5% | 70.0% | 71.3% | 69.7% |
| Phrasly | 87.3% | 90.7% | 90.0% | 88.9% | 89.5% | 88.6% |
| SmartHumanizer | 62.8% | 69.1% | 68.3% | 66.4% | 67.9% | 66.3% |
| GPTinf | 60.2% | 66.0% | 65.4% | 63.7% | 65.6% | 63.7% |
| QuillBot | 34.6% | 40.0% | 39.5% | 37.7% | 39.3% | 37.8% |

GPTHuman has the highest bypass rate in every listed detector column. Phrasly is second on average bypass rate at **88.6%**, but ranks seventh overall because its meaning, readability, factual accuracy, and length-stability scores are lower.

## November data supplied

- Cycle: November 2026
- Tools: 10
- Detectors: Pangram, GPTZero, Originality.ai, Copyleaks, and ZeroGPT
- Overall leaderboard: [`leaderboard.csv`](data/cycles/November%202026/leaderboard.csv)
- Detector breakdown: [`detector-bypass.csv`](data/cycles/November%202026/detector-bypass.csv)
- Source metadata: [`source.json`](data/cycles/November%202026/source.json)

## Repository contents

```text
data/
  cycles/
    November 2026/
      leaderboard.csv        # overall rankings and component scores
      detector-bypass.csv    # bypass rate by detector
      source.json            # provenance and availability notes
    October 2026/
      leaderboard.csv        # archived October rankings and component scores
      detector-bypass.csv    # archived October bypass rates by detector
      source.json            # archived October source metadata
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

The verifier checks the archived September evidence pack.

Product names and trademarks belong to their respective owners. A ranking is a measurement claim, not an endorsement or affiliation.

## License

Code is released under the [MIT License](LICENSE). Data files are released under [CC BY 4.0](LICENSE-data).
