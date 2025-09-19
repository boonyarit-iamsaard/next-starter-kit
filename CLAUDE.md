# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager.

### Essential Commands

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start development server with Turbo      |
| `pnpm build`   | Build production bundle                  |
| `pnpm preview` | Build and start production preview       |
| `pnpm check`   | Run all checks (lint, format, typecheck) |

### Code Quality

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `pnpm lint`       | Run ESLint                            |
| `pnpm lint:fix`   | Fix ESLint issues automatically       |
| `pnpm format`     | Check Prettier formatting             |
| `pnpm format:fix` | Fix Prettier formatting automatically |
| `pnpm typecheck`  | Run TypeScript type checking          |

### CI/CD

GitHub Actions workflow automatically runs quality checks on every push and pull request:

- **Triggers**: Push to `main` branch and all pull requests
- **Node.js**: Version 22+ (enforced by `engines` field in package.json)
- **Package Manager**: pnpm version auto-detected from `packageManager` field
- **Quality Checks**: Runs `pnpm check` (lint + format + typecheck)
- **Environment**: Uses `.env.ci.example` with mock values and `SKIP_ENV_VALIDATION=true`
- **Performance**: Fast feedback (~2-3 minutes) with automatic dependency caching
- **Maintenance**: Mock environment values centralized in documented `.env.ci.example` file

### Database Operations

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `pnpm db:generate` | Generate Drizzle schema                            |
| `pnpm db:migrate`  | Run database migrations                            |
| `pnpm db:push`     | Push schema to database                            |
| `pnpm db:reset`    | Reset database (clear all data) using drizzle-seed |
| `pnpm db:seed`     | Reset database and seed with test data (25 users)  |
| `pnpm db:studio`   | Launch Drizzle Studio                              |

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
├── app/                                   # Next.js App Router pages
│   ├── (auth)/                            # Route group for authentication
│   │   ├── layout.tsx                     # Shared auth layout
│   │   ├── sign-in/                       # /sign-in route
│   │   └── create-account/                # /create-account route
│   ├── api/
│   │   ├── auth/[...all]/                 # Better Auth API routes
│   │   └── trpc/[trpc]/                   # tRPC API routes
│   ├── layout.tsx                         # Root layout
│   └── page.tsx                           # Home page
├── core/                                  # Cross-domain singletons & infrastructure
│   ├── api/                               # tRPC router and context
│   │   ├── root.ts                        # Main app router
│   │   └── trpc.ts                        # tRPC setup
│   ├── auth/                              # Better Auth configuration
│   │   ├── index.ts                       # Auth setup and config
│   │   └── client.ts                      # Client-side auth utilities
│   └── database/                          # Database configuration
│       ├── index.ts                       # Database client
│       ├── reset.ts                       # Database reset script
│       ├── seed.ts                        # Database seeding script
│       ├── schema.ts                      # Drizzle schema definitions
│       └── seeders/                       # Database seeders
│           ├── index.ts                   # Main seeder orchestration
│           ├── types.ts                   # Seeder interfaces
│           └── users.ts                   # User seeder factory
├── features/                              # Domain-specific logic & components
│   ├── auth/                              # Authentication domain
│   │   ├── auth.model.ts                  # SessionUser, CurrentSession types & schemas
│   │   ├── auth.service.ts                # getCurrentSession() server-side service
│   │   ├── components/                    # Auth UI components
│   │   └── hooks/                         # Auth custom hooks
│   │       └── use-current-session.ts     # Client-side session hook
│   └── users/                             # User management domain
│       ├── user.model.ts                  # Full UserModel with business logic
│       ├── user.router.ts                 # tRPC routes for users
│       └── components/                    # User-specific components
├── common/                                # Cross-domain shared utilities
│   ├── types/
│   │   ├── user-role.ts                   # Shared role definitions (UserRole, userRoles)
│   │   └── nav.ts                         # Navigation types
│   ├── components/
│   │   ├── ui/                            # Reusable UI components
│   │   ├── data-table.tsx                 # TanStack Table with pagination
│   │   ├── app-shell.tsx                  # Main layout structure
│   │   └── app-sidebar.tsx                # Navigation sidebar
│   ├── hooks/                             # Shared custom hooks
│   │   └── use-url-pagination.ts          # URL-synchronized pagination
│   └── helpers/                           # Utility functions
├── trpc/                                  # tRPC client configuration
│   ├── query-client.ts                    # React Query client
│   ├── react.tsx                          # Client-side tRPC provider
│   └── server.ts                          # Server-side tRPC helpers
└── env.ts                                 # Environment variable validation
```

### Key Design Patterns

1. **Route Groups**: Authentication pages use `(auth)` route group for shared layout and organization
2. **Domain-Centric Architecture**: Features organized by business domain with clear ownership and no circular dependencies
3. **Clean Dependency Flow**: `Presentation → Features → Common → Core` with proper separation of concerns
4. **Type-safe API**: All API calls use tRPC for end-to-end type safety
5. **Database Schema**: Uses Drizzle ORM with PostgreSQL, includes Better Auth tables (users, sessions, accounts, verifications)
6. **Authentication**: Better Auth handles email/password and OAuth (Google) authentication with modern UX standards
7. **Environment Management**: Strict environment variable validation with @t3-oss/env-nextjs
8. **Server Components**: Leverages React Server Components for optimal performance
9. **Data Tables**: Server-side pagination with TanStack Table and shadcn/ui components
10. **URL State Management**: Custom `useURLPagination` hook with kebab-case parameters and browser navigation support
11. **Database Seeding**: Factory-pattern seeder system for test data generation
12. **Session Management**: Domain-specific session handling with separate SessionUser (lightweight) vs UserModel (full data)

### Authentication Architecture

The authentication system follows modern UX/UI best practices and domain-driven design:

**Domain Organization:**

- Authentication logic lives in `features/auth/` domain
- `auth.model.ts`: SessionUser type, CurrentSession interface, and Zod schemas
- `auth.service.ts`: Server-side `getCurrentSession()` function for RSC/middleware
- `hooks/use-current-session.ts`: Client-side session hook with type validation
- Clean separation between session data (SessionUser) and full user data (UserModel)

**Components & Hooks:**

- `SignInForm` component with `useSignInForm` hook (`/sign-in` route)
- `CreateAccountForm` component with `useCreateAccountForm` hook (`/create-account` route)
- Shared `AuthLayout` applied via route group layout
- `useCurrentSession()` hook for client-side session access with proper typing

**Terminology Standards:**

- Uses "Sign In" / "Create Account" instead of "Login" / "Register"
- Consistent button capitalization (Title Case for actions)
- Cross-referencing navigation between forms

**Technical Implementation:**

- Better Auth with email/password and Google OAuth
- Client-side navigation with Next.js `useRouter`
- Form validation with react-hook-form and Zod
- Database integration via Drizzle ORM PostgreSQL adapter
- Role-based access control with typed roles ("user" | "admin")
- Middleware integration for server-side route protection

### Better Auth Setup

The authentication system uses Better Auth with:

- **Email/Password**: Enabled with 8-128 character password requirements
- **OAuth**: Google provider configured
- **Database**: Drizzle adapter with PostgreSQL tables (users, sessions, accounts, verifications)
- **Session Management**: Cookie-based sessions with Next.js integration
- **Configuration**: Located in `src/core/auth/index.ts`

### tRPC Setup

- **Main router** in `src/core/api/root.ts` - aggregates feature routers
- **Server-side caller** utilities in `src/trpc/server.ts` for RSC
- **Client-side React Query** integration in `src/trpc/react.tsx`
- **API routes** handled through `src/app/api/trpc/[trpc]/route.ts`
- **Feature routers** organized by domain (e.g., `src/features/users/user.router.ts`)

### URL State Management

The project includes a production-ready `useURLPagination` hook (`src/common/hooks/use-url-pagination.ts`):

- **1-based URLs** (`?page=3&page-size=10`) with 0-based internal conversion for TanStack Table
- **Kebab-case parameters** following web standards (`page-size` not `pageSize`)
- **Automatic validation** and bounds checking with URL correction
- **Browser navigation support** without breaking SPA behavior
- **Type-safe** with full TypeScript integration

## Architecture Principles

### Domain Organization

- **Core**: Cross-domain singletons & infrastructure (database, auth config, environment)
- **Common**: Cross-domain shared utilities (types, UI components, generic hooks)
- **Features**: Domain-specific logic organized by business capability (auth, users, etc.)

### Dependency Rules

- **Clean Flow**: Presentation → Features → Common → Core
- **No Circular Dependencies**: Features can depend on other features, but avoid circular references
- **Domain Ownership**: Each feature domain owns its types, services, and business logic
- **Shared Types**: Cross-domain types (like UserRole) live in `common/types/`

### Session Architecture

- **SessionUser**: Lightweight type for session data (auth domain)
- **UserModel**: Full user data with business logic (users domain)
- **Domain Services**: `getCurrentSession()` in auth domain, not shared utilities
- **Type Safety**: Proper Zod validation at domain boundaries

### Service/Repository Layer Architecture

The project implements a class-based service and repository pattern with manual dependency injection:

**Interface Design:**

- **Arrow function properties**: `getUsersPaginated: (params: PaginationParams) => Promise<PaginatedUsers>`
- **No 'I' prefix**: Clean TypeScript naming (`UserService`, not `IUserService`)
- **Type safety**: Arrow functions use contravariant checking (prevents parameter variance issues)

**Implementation Pattern:**

- **Class-based services**: `class UserServiceImpl implements UserService`
- **Arrow function methods**: `getUsersPaginated = async (params) => { }` (prevents `this` binding issues)
- **Dependency injection**: Manual injection via tRPC context creation

**Architecture Flow:**

```text
tRPC Router → Service Layer → Repository Layer → Database
     ↓              ↓                ↓
Input validation  Business logic  Data access
Response format   Transformation   DB queries
```

**Justification:**

- **Memory efficient**: Classes share methods via prototype (optimal for per-request tRPC context)
- **Type safe**: Prevents TypeScript method variance unsoundness and runtime `this` binding issues
- **Future-proof**: Seamless evolution to Clean Architecture/DDD/Event-driven patterns
- **Testable**: Manual DI enables easy mocking and unit testing

## Important Notes

- **ALWAYS run `pnpm check` after making any code changes and fix any issues before proceeding**
- Database schema changes require running `pnpm db:generate` and `pnpm db:push`
- Environment variables are strictly validated - check `src/env.ts` for required variables
- Uses server-only imports where appropriate to prevent client-side execution
- Database reset script uses dotenvx to load environment variables automatically
- Authentication follows modern UX/UI standards for terminology and user experience
- URL parameters should use kebab-case (e.g., `page-size`, `search-term`) for web standards compliance
- When adding new features, create new domains in `features/` with clear ownership of types and logic

## Code Style Guidelines

### TypeScript

- Prefer `interface` over `type` alias unless unions/computed types needed
- Use type inference over explicit casting - never use `any`
- Prefer function declarations over arrow functions (except callbacks/closures)
- Use early returns and type guards over nested if/else blocks
- Always use braces for if statements - avoid nested ternaries

### Comments

- Write comments for **why** rather than **what** - explain reasoning and decisions
- Avoid comments when code is self-explanatory
- Keep comments clear, concise, and not verbose
- Use JSDoc for public APIs and complex hooks

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

### Commit Types - Rule of Thumb

Choose the type based on the **primary intent** of your change:

| Type       | Rule of Thumb                                         | Description                              |
| ---------- | ----------------------------------------------------- | ---------------------------------------- |
| `feat`     | Does this introduce a new user-facing capability?     | New features users can see/interact with |
| `fix`      | Does this correct an error impacting user experience? | Bug fixes and error corrections          |
| `style`    | Does this only affect visual presentation/formatting? | Cosmetic changes, code formatting        |
| `refactor` | Does this restructure code without changing behavior? | Internal improvements for readability    |
| `perf`     | Does this specifically make the app faster/efficient? | Performance optimizations                |
| `test`     | Does this involve only test-related changes?          | Adding/modifying automated tests         |
| `build`    | Does this relate to build system or dependencies?     | Build configuration, dependency updates  |
| `ci`       | Does this only affect CI configuration/scripts?       | Continuous Integration changes           |
| `docs`     | Does this only affect documentation files?            | Documentation updates                    |
| `chore`    | Is this maintenance not modifying source/test files?  | Routine maintenance tasks                |
