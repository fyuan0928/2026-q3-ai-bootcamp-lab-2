# UI Guidelines

## Overview

This document defines the core UI/UX guidelines for the To Do application frontend. All new components and screens should follow these guidelines to keep the interface consistent, accessible, and easy to maintain.

## 1. Design Approach

- Keep the UI simple, minimal, and functional — avoid unnecessary visual complexity.
- Use plain CSS (as in `App.css`) for styling. Do not introduce a component library (e.g., Material UI, Bootstrap) without discussion, to keep the app lightweight and dependency-free.
- Favor semantic HTML elements (`header`, `main`, `section`, `ul`/`li`, `form`, `button`) over generic `div`/`span` where possible.

## 2. Color Palette

| Purpose            | Color       | Usage                                  |
|--------------------|-------------|-----------------------------------------|
| Primary background | `#282c34`   | Header background, dark surfaces        |
| Primary accent     | `#61dafb`   | Primary buttons, interactive highlights |
| Accent hover       | `#21a1c9`   | Hover state for primary buttons         |
| Destructive        | `#f44336`   | Delete buttons, error/destructive actions |
| Surface background | `#f5f5f5`   | Section/card backgrounds                |
| Text on dark       | `#ffffff`   | Text on dark backgrounds (e.g., header) |
| Text on light       | `#282c34`   | Default body/button text on light backgrounds |
| Border/divider     | `#dddddd`   | Input borders, list dividers            |

New colors should only be introduced when necessary and should maintain a minimum contrast ratio of 4.5:1 against their background (WCAG AA for normal text).

## 3. Buttons

- All buttons must have a clear visual affordance: rounded corners (`border-radius: 4px`), sufficient padding (`8px 16px`), and a `hover` state that darkens/changes the background color.
- Primary actions (e.g., "Add Item") use the primary accent color (`#61dafb`) with dark text.
- Destructive actions (e.g., "Delete") use the destructive color (`#f44336`) with white text, and should require the action to be unambiguous (e.g., labeled "Delete", not just an icon, unless paired with an `aria-label`).
- Buttons must have a visible `:focus` state (do not remove the outline without providing an equivalent alternative such as a box-shadow ring).
- Disabled buttons must be visually distinct (reduced opacity) and use `disabled` / `aria-disabled` attributes.

## 4. Forms and Inputs

- Every input must have an associated, visible label or a clear `placeholder` plus an `aria-label` for screen reader users.
- Form validation errors must be displayed near the relevant field and announced via `aria-live="polite"` or an equivalent mechanism.
- Required fields (e.g., item name) must prevent submission of empty/whitespace-only values, both client-side and via backend validation.

## 5. Layout

- Content should be centered with a max width (currently `800px`) to maintain readability on large screens.
- Use consistent spacing: `20px` between major sections, `10px` between related inline elements (e.g., form fields and buttons).
- The layout must be responsive and usable on mobile viewports (min width ~320px); avoid fixed-width elements that can overflow small screens.

## 6. Feedback States

- **Loading**: Show a clear loading indicator (e.g., "Loading data...") while data is being fetched. Avoid layout shift when the loading state resolves.
- **Empty state**: When there are no items, show a friendly message (e.g., "No items yet — add one above!") rather than an empty list.
- **Error state**: Display errors in a visually distinct style (e.g., red text) and keep the rest of the UI usable/recoverable.
- **Success feedback**: Actions like add/delete should reflect immediately in the UI once confirmed by the API.

## 7. Accessibility

- All interactive elements must be reachable and operable via keyboard alone (`Tab`, `Enter`, `Space`).
- Maintain a logical heading hierarchy (`h1` for the app title, `h2` for section titles, etc.).
- Use `aria-label`, `aria-live`, and `role` attributes where visual-only cues (color, icons) are used to convey state or meaning.
- Ensure text and interactive elements meet WCAG 2.1 AA contrast requirements.
- Do not rely on color alone to convey information (e.g., pair error text with an icon or explicit wording, not just red color).

## 8. Consistency

- Reuse existing class names and patterns (`App-header`, `add-item-section`, `items-section`, `delete-btn`) instead of introducing new one-off styles for the same purpose.
- Any new UI component should be reviewed against this document before merging.
