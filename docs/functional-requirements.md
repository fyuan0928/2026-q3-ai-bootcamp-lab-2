# Functional Requirements

## Overview

This document describes the functional requirements for the To Do application, a full-stack JavaScript app consisting of a React frontend and an Express.js backend.

## 1. Item Management

### 1.1 View Items
- The system shall display a list of all items retrieved from the backend API.
- The system shall display a loading indicator while items are being fetched.
- The system shall display an error message if items fail to load.
- Items shall be ordered by creation date, most recently created first.

### 1.2 Add Item
- The system shall provide a form allowing the user to enter a new item name.
- The system shall require the item name to be a non-empty string.
- Submitting the form shall send the new item to the backend and add it to the displayed list on success.
- The system shall clear the input field after a successful submission.
- The system shall display an error message if adding the item fails.

### 1.3 Delete Item
- The system shall allow the user to delete an existing item from the list.
- Deleting an item shall remove it from the backend and from the displayed list on success.
- The system shall display an error message if deleting the item fails.

## 2. Backend API

### 2.1 Health Check
- `GET /` shall return a status object indicating the server is running.

### 2.2 Items Endpoints
- `GET /api/items` shall return all items, ordered by creation date descending.
- `POST /api/items` shall create a new item.
  - Request body must include a non-empty `name` string.
  - The system shall respond with `400 Bad Request` if `name` is missing or invalid.
  - On success, the system shall respond with `201 Created` and the created item.
- `DELETE /api/items/:id` shall delete the item with the given ID.
  - The system shall respond with `400 Bad Request` if the ID is not a valid number.
  - The system shall respond with `404 Not Found` if no item exists with the given ID.
  - On success, the system shall respond with a confirmation message and the deleted item's ID.

## 3. Data Persistence

- Items shall be stored in a SQLite database.
- Each item shall have an auto-incrementing ID, a name, and a creation timestamp.

## 4. Non-Functional Considerations

- The backend shall enable CORS to allow requests from the frontend.
- The backend shall log HTTP requests for observability.
- Error responses shall include a descriptive error message in JSON format.
