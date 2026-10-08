# PyMaster — Audit & Progress Report

**Date:** 2026-10-01
**Repo:** `/home/atfp/PYTHONLEARNING`
**Stack:** React 19 + TypeScript 5.9 + Vite 7.3 + Tailwind CSS 4 + react-syntax-highlighter + lucide-react
**Status:** ✅ Runs, ✅ Builds, ✅ Type-checks clean

## 1. How to run (and localhost fix)

The `ERR_CONNECTION_REFUSED` you saw is expected in this sandbox: `vite` binds to `localhost` only by default and the background dev server is killed after the tool timeout.

```bash
npm install
npm run dev -- --host        # expose on LAN: http://localhost:5173/ + http://<your-ip>:5173/
# or
npm run build && npm run preview -- --host  # preview prod single-file build at :4173
```

Verified 2026-10-01:
- `npx tsc --noEmit` → clean (exit 0)
- `npm run build` → success in ~5s → `dist/index.html` ~1.1 MB (gzip ~362 KB, inlined via `vite-plugin-singlefile`)
- `npm run dev` / `preview` → `VITE ready` with no errors

> If browser still refuses: use `--host`, check firewall/proxy, try `127.0.0.1:5173` instead of `localhost`, ensure no other process occupies 5173.

## 2. What this project actually is

A 100% static French-language Python learning platform. No backend. Progress in `localStorage`. Navigation is state-based (`App.tsx:19-78`), not react-router.

Pages (all functional):
- `HomePage.tsx` — hero, stats, 8-module grid, features, footer
- `RoadmapPage.tsx` — learning path view
- `ModulesPage.tsx` — module list
- `ModuleDetailPage.tsx` — lesson viewer (mini-markdown renderer), code examples, exercises, quiz/project links
- `QuizPage.tsx` — QCM with score circle, review, retry
- `ProjectPage.tsx` + `StepByStepProject.tsx` — step-by-step project with validation, accumulated code, `.py` download
- `BadgesPage.tsx`, `ProfilePage.tsx` — gamification + reset
- Shared: `Header.tsx`, `CodeBlock.tsx` (Prism highlight + Run), `CodeEditor.tsx` (textarea + line numbers, **not Monaco**), `ExercisePanel.tsx` (run/validate/hints/solution)

Data layer:
- `src/data/modules.ts` (5410 lines) — single source of truth
- `src/data/projects.ts` — calculator (10 full steps) + 2 stubs
- `src/data/storage.ts` — `load/save/completeLesson/completeQuiz/completeProject`, XP, streak, 9 badge definitions
- `src/utils/pythonRunner.ts` — **simulated** Python interpreter (see §4)
- `src/utils/cn.ts`, `src/index.css` (Tailwind theme + animations)

Deploy: `.github/workflows/deploy.yml` → build → `peaceiris/actions-gh-pages` → `dist/`. `viteSingleFile()` makes this GH-Pages friendly.

## 3. Content inventory (measured, not claimed)

| Item | README claims | Actual (counted) |
|---|---|---|
| Modules | 12 | **8** (mod-1..mod-8) |
| Lessons | 60+ | **29** (3+5+4+3+5+5+2+2) |
| Exercises | — | **26** |
| Quiz questions | — | **37** (5+6+5+4+6+5+3+3) |
| Code examples | 150+ | **~48** `code:` blocks |
| Projects | 10+ | **1 complete** (Calculatrice 10 steps), 2 empty (`hangmanProject.steps=[]`, `contactManagerProject.steps=[]`) |
| Badges | 15+ | **9** in `BADGE_DEFINITIONS` |
| Levels/XP table | 10 levels, detailed XP | Partial: +25 lesson, +~50 quiz, +100 project; no 10-level ladder implemented |

Modules present:
1. Introduction à Python (Débutant, 4h, 3 lessons, 5 quiz)
2. Variables et Types (Débutant, 6h, 5 lessons, 6 quiz)
3. Opérateurs et Expressions (Débutant, 4h, 4 lessons, 5 quiz)
4. Structures de Contrôle (Débutant, 6h, 3 lessons, 4 quiz)
5. Fonctions (Intermédiaire, 8h, 5 lessons, 6 quiz)
6. Structures de Données (Intermédiaire, 10h, 5 lessons, 5 quiz)
7. Gestion des Erreurs (Intermédiaire, 5h, 2 lessons, 3 quiz)
8. POO (Avancé, 12h, 2 lessons, 3 quiz)

Missing vs README roadmap: Modules 9-12 (Fichiers, Modules/Packages, Projets Avancés, Chaînes/Regex split), `LessonPage.tsx`, `CodeExecutor.tsx`, `ExerciseValidator.tsx`, `data/exercises.ts`, `utils/codeValidator.ts`.

## 4. Audit findings

### Strengths
- Clean TS, no `any` abuse, strict mode passes.
- Good UX: responsive header/mobile menu, progress bars, XP/streak in header, lesson prev/next, quiz review.
- Single-file build works for static hosting.
- Storage logic handles streak rollover and XP correctly.

### Critical gaps (functionality ≠ marketing)
1. **No real Python execution.** `package.json` lists `pyodide` + `@monaco-editor/react` but neither is imported. `pythonRunner.ts:12-110` skips `def/for/while/if/try/import/return` bodies and only evaluates top-level `print` + assignments + basic arithmetic. Any lesson using functions/loops shows `(Aucune sortie)` or wrong output.
2. **Weak validation.** `validateCode()` (`pythonRunner.ts:212-235`) passes if `output.includes(expected) || code.includes(expected)`. Students can pass by pasting the expected string in a comment. Project step validation (`StepByStepProject.tsx:59-88`) is substring match on e.g. `return a + b`.
3. **Empty projects.** Only calculator is usable. Hangman/contact manager have `steps: []` → `ProjectPage` falls back to “execute locally” notice.
4. **README overclaims.** 12→8 modules, Monaco/Pyodide/auto-completion not implemented, `CodeEditor` is a `<textarea>`.

### Medium issues
- `ModuleDetailPage.tsx:159` uses `dangerouslySetInnerHTML` for `**bold**` only — low risk (static data) but should use a real markdown renderer.
- `ExercisePanel` completion does not persist (only lesson “Marquer comme terminé” writes to storage). Exercise XP is never awarded despite README saying +15 XP.
- `completeQuiz` adds XP on every retry (`storage.ts:91`), farmable by re-taking quizzes.
- No tests, no lint script, no `preview`/`deploy` base-path config (`vite.config.ts` has no `base` — breaks GH Pages project-site URLs like `/pymaster/` unless root domain).
- `QuizPage.tsx:38-53` builds `answers` incrementally; a skipped-question edge case would misalign scores (currently safe because answer is forced per question).
- 1.1 MB inlined HTML — fine for Pages, but Monaco/Pyodide if added later will blow this up; will need code-splitting + dropping singlefile.

### Low / polish
- `getModuleProgress(_moduleId...)` unused param; `cn()` imported rarely.
- `public/images/python-hero.jpg` (122 KB) referenced correctly.
- French-only UI — fine for target, but no i18n scaffolding.

## 5. Progress estimate

| Area | Done |
|---|---|
| Scaffold + styling + nav + deploy workflow | 100% |
| Home / Modules / Roadmap / Profile / Badges | ~90% |
| Lesson content (8/12 modules) | ~65% |
| Exercises + hints + solutions | ~60% (26 ex., validation weak) |
| Quiz system | ~85% (works, XP farmable) |
| Projects | ~35% (1/3, only calculator interactive) |
| Real code execution (Pyodide/Monaco) | **0%** |
| Tests / lint / CI quality gates | 0% |
| Docs vs reality alignment | 40% |
| **Overall** | **~65% of a credible v1** |

## 6. Recommended next steps (priority order)

1. **Decide on execution engine:** either (a) integrate real Pyodide + Monaco (heavy, correct) or (b) keep simulator but explicitly scope lessons to supported syntax + fix README. Hybrid: keep simulator for lessons, require local Python for projects (already messaged in `ProjectPage`).
2. **Harden validation:** execute tests in Pyodide (or at minimum check output equality, not substring; strip comments before `code.includes`).
3. **Fill content gap:** complete hangman + contact manager steps, or remove stubs from `allProjects` so UI doesn’t promise them. Add missing modules 9-12 or update README to 8.
4. **Fix gamification:** persist exercise completion, award exercise XP once, cap quiz XP to max-score improvement only, implement level ladder from README if wanted.
5. **Fix deploy:** set `base: './'` or repo name in `vite.config.ts` for GH Pages project sites; add `npm run lint/test` and CI check.
6. **Replace mini-markdown + `dangerouslySetInnerHTML`** with `react-markdown` (or at least escape HTML first).

## 7. Quick verification log

```
npx tsc --noEmit          → clean
npm run build             → dist/index.html 1.10 MB, gzip 362 KB, ✓ 5s
npm run dev -- --host     → VITE ready, Local http://localhost:5173/
```

---
*Generated by code inspection (file reads + `tsc` + `build` + content counts), not from README claims.*
