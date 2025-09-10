# TODO

## Data Table Improvements

### 1. Separate Data Table Pagination Component

- [ ] Extract pagination controls into separate `data-table-pagination.tsx` component
- [ ] Move pagination logic from main `data-table.tsx` to dedicated component
- [ ] Keep pagination props interface in main data table component
- [ ] Improve component reusability and maintainability

### 2. Pagination Index Convention + URL Persistence (Combined)

**Goal**: Implement URL state persistence while deciding on pagination index convention

- [ ] **Research Next.js URL state patterns** (useSearchParams, useRouter, shallow routing)
- [ ] **Decision**: Choose pagination index convention considering URL implications
  - URLs like `?page=1` (1-based) vs `?page=0` (0-based)
  - Impact on user bookmarking and sharing
  - Developer experience vs user experience trade-offs
- [ ] **Implementation options**:
  - Option A: 1-based URLs (`?page=1`), convert to 0-based internally
  - Option B: 0-based URLs (`?page=0`), keep consistent throughout
  - Option C: Use `offset` parameter (`?offset=0`) to avoid page numbering
- [ ] **Implement URL synchronization**:
  - Read URL params on page load
  - Update URL when pagination changes (shallow routing)
  - Handle browser back/forward navigation
  - Validate URL parameters (bounds checking)
- [ ] **Integration points**:
  - Update tRPC query to accept URL-derived parameters
  - Sync TanStack Table state with URL state
  - Handle edge cases (invalid page numbers, out of bounds)
- [ ] **Update test cases** to include URL persistence scenarios

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
