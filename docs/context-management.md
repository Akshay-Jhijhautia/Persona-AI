# Context Management

## Frontend State

The chat conversation is stored in React state inside the frontend. Each visible message contains:

- A user or assistant role
- Message content
- The responding persona for assistant messages
- A local identifier used for rendering

Messages appear immediately in the interface and auto-scroll keeps the newest response visible.

## Recent Message Window

For every new user submission, the frontend creates a request from the latest eight chat messages, including the new user message.

Only the following fields are sent to the backend:

- role
- content

Local identifiers, UI state, and persona labels attached to individual bubbles are not included in the message history.

The backend also limits the received history to the most recent eight messages before calling OpenAI.

## Why Eight Messages

A fixed recent-message window:

- Controls token usage and API cost
- Keeps the most relevant context close to the current question
- Prevents an indefinitely growing prompt
- Keeps the version 1 implementation simple

Older messages remain visible in the current browser session but eventually fall outside the context sent to the model.

## Persona Switching

The persona dropdown controls which persona prompt is used for the next request. Switching personas does not remove the visible conversation.

Each assistant message retains the persona that generated it, so earlier responses remain correctly labelled after the dropdown changes.

## Persistence

Version 1 has no database or server-side conversation storage. Chat history exists only in React state and is cleared when the page is refreshed or closed.

Persistent conversations, user accounts, shared sessions, and long-term memory are outside the version 1 scope.
