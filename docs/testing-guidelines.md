# Testing Guidelines

## Overview

This document describes the testing principles and conventions for the project. All tests added to this codebase should follow these guidelines.

## 1. Unit Tests

- Use Jest to test individual functions and React components in isolation.
- Unit tests should use the naming convention `*.test.js` or `*.test.ts`.
- Backend unit tests should be placed in the `packages/backend/__tests__/` directory.
- Frontend unit tests should be placed in the `packages/frontend/src/__tests__/` directory.
- Name unit test files to match what they're testing (e.g., `app.test.js` for testing `app.js`).

## 2. Integration Tests

- Use Jest + Supertest to test backend API endpoints with real HTTP requests.
- Integration tests should be placed in the `packages/backend/__tests__/integration/` directory.
- Integration tests should also use the naming convention `*.test.js` or `*.test.ts`.
- Name integration test files intelligently based on what they test (e.g., `todos-api.test.js` for TODO API endpoints).

## 3. End-to-End (E2E) Tests

- Use Playwright (the required framework) to test complete UI workflows through browser automation.
- E2E tests should be placed in the `tests/e2e/` directory.
- E2E tests should use the naming convention `*.spec.js` or `*.spec.ts`.
- Name E2E test files based on the user journey they test (e.g., `todo-workflow.spec.js`).
- Playwright tests must use the Chrome browser only.
- Playwright tests must use the Page Object Model (POM) pattern for maintainability.

## 4. General Principles

- All tests must be isolated and independent — each test should set up its own data and not rely on other tests.
