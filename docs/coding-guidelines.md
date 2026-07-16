# Coding Guidelines

## Overview

This document is a narrative summary of the coding style and quality principles used throughout this project. It applies to both the `packages/backend` (Express) and `packages/frontend` (React) codebases. The goal is to keep the codebase consistent, readable, and easy for both humans and Copilot to reason about.

## General Style

The project favors simple, explicit, and readable code over clever or overly abstract solutions. Code should read top-to-bottom without requiring the reader to jump between many layers of indirection. Use 2-space indentation, single quotes for strings, and semicolons at the end of statements, consistent with the existing files in `packages/backend/src` and `packages/frontend/src`. Keep line lengths reasonable and break up long expressions rather than letting them run on. Favor `const` over `let`, and avoid `var` entirely. Prefer template literals over string concatenation when building dynamic strings.

Naming should be descriptive and consistent: `camelCase` for variables and functions, `PascalCase` for React components and classes, and `UPPER_SNAKE_CASE` for constants that represent fixed configuration values. Function and variable names should describe intent (e.g., `fetchData`, `handleSubmit`, `insertStmt`) rather than being abbreviated or vague.

## Import Organization

Imports should be grouped and ordered as follows, with a blank line between groups where it improves readability:

1. External/third-party packages (e.g., `react`, `express`, `cors`, `better-sqlite3`).
2. Internal modules and relative imports (e.g., `./App.css`, `../src/app`).

Avoid unused imports, and avoid deep relative import chains (e.g., `../../../`) — prefer restructuring code or exposing a clear module boundary instead. Each file should only import what it directly uses.

## Linting

The frontend uses the `react-app` ESLint configuration (via `react-scripts`, configured in `packages/frontend/package.json`), which enforces React and accessibility best practices out of the box. Code should be free of ESLint warnings before being committed — do not disable lint rules with inline comments unless there is a well-documented reason. When adding new tooling or dependencies, prefer configuration that integrates with the existing `react-app` lint setup rather than introducing a parallel or conflicting linter.

## Error Handling

Backend routes should validate input explicitly and return meaningful HTTP status codes and JSON error messages (see `packages/backend/src/app.js` for the pattern: `400` for invalid input, `404` for missing resources, `500` for unexpected failures, each wrapped in a `try/catch`). Frontend code should handle failed requests gracefully, surfacing a user-facing error message rather than letting exceptions propagate silently or crash the UI.

## DRY and Reuse

Avoid duplicating logic across files. If the same validation, formatting, or data-access logic is needed in more than one place, extract it into a shared function rather than copy-pasting. On the frontend, reusable UI patterns (e.g., list items, form controls) should be factored into components rather than repeated inline. On the backend, shared database queries or validation logic should be extracted into helper functions rather than duplicated across route handlers. That said, do not over-abstract: prefer a small amount of duplication over a premature or overly generic abstraction that obscures intent.

## Comments and Documentation

Code should be self-explanatory through clear naming and structure; use comments to explain *why* something is done a certain way, not to restate *what* the code already makes obvious. Avoid leaving commented-out code or TODOs without context in committed code.

## Testing Expectations

All new functionality should be accompanied by tests, following the conventions described in [Testing Guidelines](testing-guidelines.md). Code should be structured in a way that makes it testable in isolation — for example, keeping business logic separate from framework wiring (e.g., separating `app.js` route logic from `index.js` server startup, as is already done in the backend).

## Consistency Above All

When in doubt, match the style of the surrounding code rather than introducing a new pattern. Consistency across the codebase is more valuable than any individual stylistic preference.
