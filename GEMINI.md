# Project: Lidyaphille Portfolio

## Project Overview

This is a Next.js-based portfolio website for an artist named Lidya. The project uses Sanity.io as a headless CMS to manage content, Tailwind CSS for styling, and Framer Motion for animations. The site has a unique, interactive navigation menu featuring a hand icon that points to the selected menu item.

### Key Technologies

*   **Framework:** Next.js
*   **CMS:** Sanity.io
*   **Styling:** Tailwind CSS
*   **Animation:** Framer Motion
*   **Package Manager:** pnpm

## Building and Running

### Prerequisites

Make sure you have `pnpm` installed. If not, you can install it with:

```bash
npm install -g pnpm
```

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Running the Development Server

To run the development server:

```bash
pnpm dev
```

This will start the development server at `http://localhost:3000`. The Sanity Studio is available at `http://localhost:3000/studio`.

### Building for Production

To create a production build:

```bash
pnpm build
```

### Starting the Production Server

To start the production server:

```bash
pnpm start
```

## Development Conventions

### Code Style

The project uses ESLint for code linting. You can run the linter with:

```bash
pnpm lint
```

### Sanity.io Schema

The Sanity.io schema is defined in the `sanity/schemaTypes` directory. The main schema file is `sanity/schemaTypes/index.ts`, which currently imports the `imageType` schema.

### Components

React components are located in the `components` directory. UI components are in `components/ui`.

### Navigation

The main navigation is handled by the `HandNavigation.tsx` component, which uses Framer Motion for a unique, interactive experience. The navigation state is managed by the `NavigationContext.tsx` context.
