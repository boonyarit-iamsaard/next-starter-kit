# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager.

### Essential Commands

- `pnpm dev` - Start development server with Turbo
- `pnpm build` - Build production bundle
- `pnpm preview` - Build and start production preview
- `pnpm check` - Run all checks (lint, format, typecheck)

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm format` - Check Prettier formatting
- `pnpm format:fix` - Fix Prettier formatting automatically
- `pnpm typecheck` - Run TypeScript type checking

### Database Operations

- `pnpm db:generate` - Generate Drizzle schema
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Launch Drizzle Studio

## Architecture Overview

This is a Next.js 15 starter kit built with the T3 stack pattern, featuring:

### Core Stack

- **Next.js 15** with App Router and React Server Components
- **tRPC** for type-safe API calls
- **Drizzle ORM** with PostgreSQL database
- **Better Auth** for authentication with email/password and OAuth
- **TailwindCSS** for styling
- **TypeScript** with strict type checking

### Directory Structure

```text
src/
├── app/                    # Next.js App Router pages
│   ├── api/trpc/          # tRPC API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── core/                  # Core business logic
│   ├── api/               # tRPC router and context
│   │   ├── root.ts        # Main app router
│   │   └── trpc.ts        # tRPC setup
│   ├── auth/              # Better Auth configuration
│   │   ├── index.ts       # Auth setup and config
│   │   └── client.ts      # Client-side auth utilities
│   └── database/          # Database configuration
│       ├── index.ts       # Database client
│       └── schema.ts      # Drizzle schema definitions
├── common/                # Shared components and utilities
│   ├── components/ui/     # Reusable UI components
│   └── helpers/           # Utility functions
├── trpc/                  # tRPC client configuration
│   ├── query-client.ts    # React Query client
│   ├── react.tsx          # Client-side tRPC provider
│   └── server.ts          # Server-side tRPC helpers
└── env.ts                 # Environment variable validation
```

### Key Design Patterns

1. **Type-safe API**: All API calls use tRPC for end-to-end type safety
2. **Database Schema**: Uses Drizzle ORM with PostgreSQL, includes Better Auth tables (users, sessions, accounts, verifications)
3. **Authentication**: Better Auth handles email/password and OAuth (Google) authentication
4. **Environment Management**: Strict environment variable validation with @t3-oss/env-nextjs
5. **Server Components**: Leverages React Server Components for optimal performance
6. **Feature-based Organization**: Core infrastructure, domain features, and shared utilities for better maintainability

### Better Auth Setup

The authentication system uses Better Auth with:

- **Email/Password**: Enabled with 8-128 character password requirements
- **OAuth**: Google provider configured
- **Database**: Drizzle adapter with PostgreSQL tables (users, sessions, accounts, verifications)
- **Session Management**: Cookie-based sessions with Next.js integration
- **Configuration**: Located in `src/core/auth/index.ts`

### tRPC Setup

- Main router in `src/core/api/root.ts`
- Server-side caller utilities in `src/trpc/server.ts`
- Client-side React Query integration in `src/trpc/react.tsx`
- API routes handled through `src/app/api/trpc/[trpc]/route.ts`

## Important Notes

- Always run `pnpm check` before committing changes
- Database schema changes require running `pnpm db:generate` and `pnpm db:push`
- Environment variables are strictly validated - check `src/env.ts` for required variables
- Uses server-only imports where appropriate to prevent client-side execution

## Code Style Guidelines

### TypeScript

- Prefer `interface` over `type` alias unless unions/computed types needed
- Use type inference over explicit casting - never use `any`
- Prefer function declarations over arrow functions (except callbacks/closures)
- Use early returns and type guards over nested if/else blocks
- Always use braces for if statements - avoid nested ternaries

### Example

```typescript
// Good
interface User {
  id: string;
  name: string;
}
type Status = "pending" | "completed";

function processUser(user: unknown): string {
  if (!user) {
    return "No user provided";
  }
  if (!isValidUser(user)) {
    return "Invalid user";
  }
  return `Hello, ${user.name}!`;
}

function isValidUser(user: unknown): user is User {
  return typeof user === "object" && user !== null && "id" in user;
}

// Arrow functions for callbacks only
const activeUsers = users.filter((user) => user.active);
```

## Commit Messages

Write clear, concise git commit messages following conventional commit format.

### Guidelines

- Use conventional commit format: `<type>(<scope>): <subject>`
- Write subject line in imperative mood (e.g., "fix bug", not "fixed bug")
- Keep subject line lowercase except for proper nouns and acronyms
- Limit subject line to 72 characters maximum
- Omit commit message body - keep commits concise
- Do not end subject line with a period
- Use common commit types: feat, fix, docs, style, refactor, test, chore
