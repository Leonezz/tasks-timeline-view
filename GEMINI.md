# GEMINI.md

## Project Overview

This project is a React component library called `tasks-timeline-view`. It provides a timeline view for displaying and managing tasks. The library is built with React, TypeScript, and Vite. It uses Storybook for component development and demonstration, and Zustand for state management.

The main component exported by the library is `TimelineView`, which takes a list of tasks and renders them in a timeline format. The library also provides types and utility functions for working with task items.

## Building and Running

### Build

To build the library, run the following command:

```bash
npm run build
```

This will generate the compiled JavaScript files in the `dist` directory.

### Development

To start the Storybook development server, run the following command:

```bash
npm start
```

This will open Storybook in your browser, where you can view and interact with the components.

### Linting

To lint the code, run the following command:

```bash
npm run lint
```

This will check the code for any linting errors or warnings.

## Development Conventions

### Code Style

The project uses Prettier for code formatting. The Prettier configuration is defined in the `.prettierrc` file. The main conventions are:

- Single quotes are used for strings.
- Semicolons are not used at the end of statements.
- The tab width is 2 spaces.

### State Management

The project uses Zustand for state management. The `useTodoStore` hook, defined in `src/datastore/useTodoStore.ts`, is used to manage the state of the to-do items. The store includes actions for initializing, adding, deleting, editing, and querying tasks.
