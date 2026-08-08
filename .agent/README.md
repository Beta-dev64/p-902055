# FuseLabs IO — Agent Workspace

This folder tracks the redesign/rebrand implementation. Human + agent both update these files as work progresses.

## Documents

| File | Purpose |
|---|---|
| [progress.md](progress.md) | Phase checklist, status, timestamps |
| [features.md](features.md) | Feature inventory + implementation status |
| [errors.md](errors.md) | Bugs, blockers, regressions, resolutions |
| [decisions.md](decisions.md) | Architecture & design decisions (ADRs-lite) |
| [implementation-plan.md](implementation-plan.md) | Phased build plan (OSE.builds) |
| [assets.md](assets.md) | Graphics / video / motion asset pipeline |
| [qa.md](qa.md) | QA checklist + Playwright visual passes |
| [changelog.md](changelog.md) | Notable changes per session |

## Source of truth

- Product & content requirements: [`../REQUIREMENTS.md`](../REQUIREMENTS.md)
- Design skill: `~/.cursor/skills/ose-builds-design/`
- Upstream codebase: https://github.com/Beta-dev64/p-902055.git

## Status legend

- `[ ]` not started  
- `[~]` in progress  
- `[x]` done  
- `[-]` cancelled / deferred  
- `[!]` blocked  

## How to update

1. Start of session → read `progress.md` + `errors.md`
2. During work → tick features in `features.md`, log decisions
3. On failure → append to `errors.md` with repro + fix
4. End of session → update `progress.md` + short entry in `changelog.md`
