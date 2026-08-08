### ERR-001 — Dependency install / Vite start failure
- **Date:** 2026-08-08
- **Phase:** 0
- **Severity:** high
- **Status:** resolved — Vite running via npx on :5178 after yarn partial link
- **Repro:**
  1. `npm install` / `yarn install` after clone
  2. `npm run dev` or `node node_modules/vite/bin/vite.js`
- **Expected:** Dev server on localhost
- **Actual:** npm hung / ENOTEMPTY; Vite failed with `@swc/core` "Failed to load native binding". Yarn install stuck at "Linking dependencies..."
- **Cause:** Corrupted / incomplete `node_modules` from interrupted installs; SWC native binary missing
- **Fix (recommended locally):**
  1. Stop node/npm/yarn processes
  2. Delete `node_modules`
  3. `yarn install` (or `npm ci`)
  4. `yarn dev` / `npm run dev`
- **Prevention:** Avoid killing mid-install; prefer single package manager (yarn.lock present)

