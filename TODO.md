# TODO

## Data Table Improvements

### 1. Separate Data Table Pagination Component

- [ ] Extract pagination controls into separate `data-table-pagination.tsx` component
- [ ] Move pagination logic from main `data-table.tsx` to dedicated component
- [ ] Keep pagination props interface in main data table component
- [ ] Improve component reusability and maintainability

### 2. ✅ Pagination Index Convention + URL Persistence (Combined) - COMPLETED

**Decision**: User-friendly 1-based URLs (`?page=3&page-size=10`) with internal 0-based conversion for TanStack Table compatibility

**Implementation**:

- [x] Created `useURLPagination` hook with URL sync, validation, and browser navigation support
- [x] Updated `UserTable` to use URL-backed pagination state
- [x] Handles edge cases (invalid/out-of-bounds pages) with automatic URL correction

### 4. URL State Management Hooks (Future Enhancements)

**Goal**: Build complementary hooks using the same reactive pattern as `useURLPagination`

- [ ] **useURLSorting**: Handle sorting state with URL persistence
  - Support multiple sort columns (`?sort=name,desc&sort=created-at,asc`)
  - TanStack Table `SortingState` compatibility
  - Kebab-case column names for URLs (web standard)
- [ ] **useURLFilters**: Manage filter state in URLs
  - Support multiple filters (`?status=active&search-term=value`)
  - Type-safe filter definitions
  - Debounced updates for search inputs
  - Kebab-case parameter names
- [ ] **useURLState**: Generic URL state hook
  - Simple key-value URL state (`?sidebar-open=true`)
  - Type-safe value parsing and validation
  - Reusable for various UI state needs
  - Kebab-case parameter names

## CI/CD & Testing Infrastructure

### 5. GitHub Actions Workflow Setup

**Goal**: Automated static code analysis and quality checks

- [ ] **Research environment variable strategy** for GitHub Actions
  - Option A: Mock env vars for type checking (fastest, CI-focused)
  - Option B: Use GitHub Secrets for real env validation
  - Option C: Conditional env validation (skip in CI, validate in build)
- [ ] **Create static analysis workflow** (`.github/workflows/ci.yml`)
  - Run `pnpm lint` (ESLint)
  - Run `pnpm format` (Prettier check)
  - Run `pnpm typecheck` (TypeScript compilation)
  - Decide on build requirement for type checking
- [ ] **Environment handling decision**:
  - Skip database env vars in CI (type-only validation)
  - Mock required env vars for successful type checking
  - Document env setup in workflow

### 6. Testing Framework Setup

**Goal**: Choose and configure testing framework for the project

- [x] **Framework decision**: ✅ **Vitest chosen**
  - Superior TypeScript support (built-in, no configuration needed)
  - Native ESM support (no CommonJS headaches)
  - ~10x faster than Jest with modern React/Next.js compatibility
  - Better alignment with Next.js 15 + TypeScript + ESM stack
- [ ] **Configure chosen testing framework**
  - Install dependencies and setup config
  - Configure with TypeScript and Next.js App Router
  - Setup test utilities for React components
  - Configure path aliases (`~/*` imports)
- [ ] **First test implementation**: URL pagination hook
  - Test `useURLPagination` hook functionality
  - URL parameter parsing and validation
  - 1-based to 0-based conversion logic
  - Edge cases (invalid pages, out-of-bounds)
  - Browser navigation simulation

## Authentication Configuration

### 3. Configure autoSignIn Behavior

**Current state**: `autoSignIn: false` in `src/core/auth/index.ts`

- [ ] **Research autoSignIn implications** for user experience
- [ ] **Decision needed**: Should users be automatically signed in after account creation?
  - **Seeded users**: Test accounts created via `pnpm db:seed`
  - **Real users**: Users who create accounts through the UI
- [ ] **Consider user flows**:
  - Sign up → Email verification → Auto sign in vs manual sign in
  - Development/testing experience with seeded accounts
  - Production user experience expectations
- [ ] **Implementation options**:
  - Keep `autoSignIn: false` for security (require explicit sign in)
  - Enable `autoSignIn: true` for better UX (immediate access after signup)
  - Conditional logic based on environment (auto in dev, manual in prod)
- [ ] **Update seeder if needed** to handle different auth flows
