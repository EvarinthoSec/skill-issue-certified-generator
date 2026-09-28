# Task 1 Report

## Status

Complete. Implemented the Vitest/jsdom/Testing Library harness and certificate-name domain contract using TDD. Committed as:

- `ba3bf1862f8ef0b9f5486ee57659b800dd932cb8` — `test: add certificate name contract`

## Changes

- Added `vitest.config.ts` with React plugin, jsdom environment, setup file, and `.test.ts`/`.test.tsx` inclusion.
- Added `vitest.setup.ts` importing `@testing-library/jest-dom/vitest`.
- Added `lib/certificate.test.ts` covering:
  - surrounding whitespace trimming;
  - blank input;
  - Thai and mixed Unicode text;
  - 32 Unicode code-point maximum.
- Added `lib/certificate.ts` with:
  - `MAX_CERTIFICATE_NAME_LENGTH = 32`;
  - `normalizeCertificateName(value)` using trim plus `Array.from(...).slice(...).join(...)`.
- Added the `test` script (`vitest run`) and the five requested dev dependencies to `package.json`; updated `package-lock.json`.
- `tsconfig.json` was not changed because its existing `**/*.ts` include already discovers `vitest.setup.ts`.

## TDD Evidence and Verification

### Dependency installation

Requested command:

```text
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

Result: failed with `ERESOLVE`; Vitest 5 required `@types/node` `^22.0.0 || >=24.0.0`, while the repository has `@types/node` `^20`.

Resolution used:

```text
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom --legacy-peer-deps
```

This installed the requested packages. Vitest's Vite peer was then materialized with:

```text
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom --force
```

Both commands completed with exit code `0`; npm reported `found 0 vulnerabilities`.

### RED

Before creating `lib/certificate.ts`:

```text
npm test -- lib/certificate.test.ts
```

Exited `1` with the expected missing-module failure:

```text
Error: Failed to resolve import "./certificate" from "lib/certificate.test.ts". Does the file exist?
```

### GREEN

After implementing `lib/certificate.ts`:

```text
npm test -- lib/certificate.test.ts
```

Exited `0`:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
```

Full test suite:

```text
npm test
```

Exited `0`:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
```

Additional verification:

```text
npx tsc --noEmit     # exited 0
npm run lint         # exited 0
```

## Concerns

- Vitest emits a non-failing warning that `vitest.config.ts` uses ESM syntax while loaded as CommonJS and recommends `.mjs` or `type: module`. The configuration matches the approved brief exactly, so no extra change was made.
- The initial dependency command could not resolve the repository's existing `@types/node` major version against the current Vitest release. The lockfile records the resolved dependency graph; the root package retains the five requested test-related dev dependencies and existing `@types/node` constraint.
- Pre-existing untracked `.hermes/` remains untouched and was not included in the commit.

## Dependency Compatibility Fix

### Root cause

The original Task 1 dependency ranges resolved to Vitest `5.0.2`, jsdom `30.1.1`, `@vitejs/plugin-react` `6.1.1`, `@testing-library/react` `16.3.3`, and `@testing-library/jest-dom` `7.0.1`. The initial ordinary install failed with `ERESOLVE` because Vitest 5 requires `@types/node` `^22.0.0 || >=24.0.0`, while this repository intentionally keeps `@types/node` at `^20`. The resolved jsdom 30 line also targets newer Node versions, so the complete test-tool set was revised together rather than bypassing peer resolution.

### Versions selected

The five test-related dev dependencies now use these compatible ranges in `package.json`, with these exact versions recorded in `package-lock.json`:

| Package | package.json range | Installed lockfile version |
| --- | --- | --- |
| `vitest` | `^2.1.9` | `2.1.9` |
| `jsdom` | `^24.1.3` | `24.1.3` |
| `@vitejs/plugin-react` | `^4.3.4` | `4.3.4` |
| `@testing-library/react` | `^16.1.0` | `16.1.0` |
| `@testing-library/jest-dom` | `^6.6.3` | `6.6.3` |

These versions preserve the existing Vitest configuration and certificate utility/tests, support the repository's React 19 and `@types/node` `^20` baseline, and avoid changing production dependencies.

### Commands and outputs

Dependency change and ordinary install:

```text
npm install --save-dev vitest@2.1.9 jsdom@24.1.3 @vitejs/plugin-react@4.3.4 @testing-library/react@16.1.0 @testing-library/jest-dom@6.6.3
```

Exited `0`; npm reported `added 54 packages, removed 27 packages, changed 31 packages`. No force or legacy-peer-deps flag was used. npm reported 5 audit findings (3 moderate, 1 high, 1 critical), which are unrelated to this compatibility fix.

Clean install verification:

```text
rm -rf node_modules && npm install
```

Exited `0`; npm reported `added 471 packages` and `audited 472 packages`. This was an ordinary clean `npm install` with no `--force` or `--legacy-peer-deps` flags.

Resolved-version verification:

```text
npm ls vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @types/node --depth=0
```

```text
@testing-library/jest-dom@6.6.3
@testing-library/react@16.1.0
@types/node@20.19.43
@vitejs/plugin-react@4.3.4
jsdom@24.1.3
vitest@2.1.9
```

```text
npm install --dry-run
```

Exited `0`; npm reported `up to date`.

Required repository gates:

```text
npm test
```

Exited `0`:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
```

```text
npx tsc --noEmit
```

Exited `0` with no output.

```text
npm run lint
```

Exited `0` with no lint errors.

### Commit

The dependency compatibility fix was committed as:

- `e36e665fed10153d21b797147bdc05bf02d97ec6` — `fix: align test dependencies with node 20`

The report append is intentionally separate from the implementation commit so this report can record the exact implementation SHA.
