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

### 3. URL State Management Hooks (Future Enhancements)

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

### 4. ✅ GitHub Actions Workflow Setup - COMPLETED

**Goal**: Automated static code analysis and quality checks

- [x] **Environment variable strategy** - **Option A chosen: Mock env vars for CI**
  - Uses `SKIP_ENV_VALIDATION=true` for fast, secure CI runs
  - Mock values for all required environment variables
  - No GitHub Secrets needed - focuses on static analysis only
- [x] **Create static analysis workflow** (`.github/workflows/ci.yml`)
  - Triggers on push to `main` and all pull requests
  - Node.js 22+ enforced (matches `engines` field in package.json)
  - Uses `pnpm check` command (lint + format + typecheck combined)
  - Automatic dependency caching for fast builds (~2-3 minutes)
- [x] **Environment handling implementation**:
  - Mock environment variables for successful type checking
  - Skip env validation with `SKIP_ENV_VALIDATION=true`
  - Documented strategy in CLAUDE.md CI/CD section

**Implementation Status**: ✅ **COMPLETED**

- Fast CI feedback loop with comprehensive quality checks
- Modern Node.js 22+ and pnpm version requirements enforced
- Maintainable mock environment strategy with `.env.ci.example`
- Clean workflow with centralized CI environment configuration
- Proper `.pnpm-store` exclusion from Prettier formatting

### 5. Testing Framework Setup

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

## Architecture & Contract Boundaries

### 6. Service/Repository Layer Implementation

**Goal**: Implement proper service and repository layers for clear data access boundaries

**ADR - Architecture Decision Record**:

- **Pattern**: Class-based services with manual dependency injection
- **Interface naming**: No 'I' prefix (TypeScript convention) - `UserService`, `UserRepository`
- **Implementation naming**: Same-name pattern for services until business justification required, adapter prefix pattern for repositories - `UserService`, `DrizzleUserRepository`
- **DI Strategy**: Manual injection via tRPC context (no framework needed at current scale)
- **Interface design**: Arrow function properties for strict type safety
  - `getUsersPaginated: (params: PaginationParams) => Promise<PaginatedUsers>`
  - **Why**: Method syntax in interfaces uses bivariant checking (less strict, can lead to type unsoundness)
  - **Arrow functions**: Use contravariant checking (more strict, prevents parameter type issues)
  - **TypeScript variance**: Bivariant allows both input/output variance, contravariant only allows safe input variance
- **Implementation pattern**: Arrow function methods to prevent `this` binding issues
  - `getUsersPaginated = async (params: PaginationParams) => { /* implementation */ }`
  - **Prevents**: Loss of `this` context when methods passed as callbacks in tRPC middleware
- **Justification**:
  - **Memory efficiency**: Classes share methods via prototype (better for per-request tRPC context)
  - **Future-proof**: Essential for Clean Architecture/DDD/Event-driven evolution (70%+ probability)
  - **Type safety**: Arrow function interfaces prevent TypeScript method variance unsoundness
  - **Runtime safety**: Arrow function implementations prevent `this` binding issues
  - **Community standards**: Follows TypeScript expert recommendations for critical libraries
  - **Scalability**: Seamless migration to DI frameworks (NestJS/Inversify) if needed (25-30% probability)

**Implementation Tasks**: ✅ **COMPLETED**

- [x] **Create Pagination Types** (`common/types/pagination.ts`) - _Added during implementation_
  - `PaginationParams`, `PaginationResponse<T>`, `PaginatedResult<T>` interfaces
  - Shared types for consistent pagination across layers
- [x] **Create Repository Layer** (`features/users/user.repository.ts`)
  - `interface UserRepository` - clean interface name (no 'I' prefix)
  - `class DrizzleUserRepository implements UserRepository` - concrete implementation
  - Constructor inject `DrizzleInstance` dependency (_deviation: added proper DB type_)
  - Handle pagination queries and database operations
- [x] **Create User Service Layer** (`features/users/user-management.service.ts`) - _Renamed during implementation_
  - `interface UserService` - service contract
  - `class UserManagementService implements UserService` (_deviation: avoided unsafe declaration merging_)
  - Constructor inject `UserRepository` dependency
  - Implement `getUsersPaginated()` service method
  - Handle data transformation at service boundary
- [x] **Update Database Types** (`core/database/index.ts`) - _Added during implementation_
  - Export `DrizzleInstance` type (_deviation: renamed from generic `Database`_)
  - Follows adapter prefix pattern for technology-specific types
- [x] **Update tRPC Context** (`core/api/trpc.ts`)
  - Manual dependency injection: `new DrizzleUserRepository(db)` → `new UserManagementService(repo)`
  - Type context as `{ services: { userManagementService: UserService } }` (_deviation: wrapped in services object_)
  - Clean separation: Router → Service → Repository → Database
- [x] **Update tRPC Router** (`features/users/user.router.ts`)
  - Remove direct database access
  - Delegate to `ctx.services.userManagementService.getUsersPaginated()` (_deviation: updated path_)
  - Focus on input validation and response formatting
- [x] **Remove Runtime DB Parsing**
  - Database is trusted source - no need for Zod validation of DB results
  - Transform at service boundary, not in router
  - Clear data flow: DB → Service (transform) → Router → Client

**Implementation Deviations from Original Plan:**

1. **Service naming**: Used `UserManagementService` instead of `UserService` to avoid TypeScript unsafe declaration merging
2. **Service organization**: Wrapped services in `ctx.services` object for better scalability
3. **Database typing**: Created `DrizzleInstance` type instead of generic `Database` for better clarity
4. **File naming**: Renamed service file to `user-management.service.ts` to match class name
5. **Additional types**: Created shared pagination types for better type consistency across layers

### 7. tRPC Authentication Context

**Goal**: Add proper authentication context to tRPC procedures

- [ ] **Update tRPC Context** (`core/api/trpc.ts`)
  - Add `getCurrentSession()` to context creation
  - Provide session info to all procedures
  - Handle authentication at infrastructure level
- [ ] **Create Protected Procedures**
  - Add `protectedProcedure` for authenticated routes
  - Add `adminProcedure` for admin-only routes
  - Remove reliance on `publicProcedure` for sensitive data
- [ ] **Session Middleware**
  - Create reusable auth middleware
  - Handle session validation consistently
  - Proper error responses for auth failures

### 8. Improved State Management Contracts

**Goal**: Clear contracts for loading, error, and data states

- [ ] **Enhanced Hook Contracts** (`features/auth/hooks/use-current-session.ts`)
  - Return `{ session, isLoading, error }` instead of `session | null`
  - Distinguish between loading vs unauthenticated states
  - Proper error boundaries and failure handling
- [ ] **Loading State Standards**
  - Consistent loading patterns across hooks
  - Skeleton components for loading states
  - Error boundaries with retry mechanisms
- [x] **Type-Safe Global State** - SKIPPED (current implementation acceptable)
  - ~~Remove `as unknown as` type assertions~~
  - ~~Proper typing for global development utilities~~
  - ~~Clear development vs production boundaries~~

### 9. ✅ Data Transformation Ownership - COMPLETED

**Goal**: Clear ownership of data transformation responsibilities

- [x] **Domain Boundary Transformations**
  - Auth domain: Session → SessionUser (auth.service.ts) - `getCurrentSession()` with `sessionUserSchema.safeParse()`
  - Users domain: Database → UserModel (user.repository.ts) - Direct transformation with type assertion
  - Clear transformation points with validation at service boundaries
- [x] **API Response Standards**
  - Consistent response shapes across tRPC procedures - `PaginationResponse<T>` pattern
  - ~~Standard error response format~~ - Using tRPC defaults (acceptable)
  - Pagination response standardization - `{ data, pagination }` structure implemented
- [x] **Validation Strategy**
  - Input validation: Router level (untrusted client data) - Zod schemas in tRPC procedures
  - Output validation: Service level (domain boundaries) - Auth service validates session data
  - No validation: Database level (trusted internal data) - Repository trusts DB results

**Implementation Status**: ✅ **COMPLETED**

- Clear data flow: Router → Service → Repository → Database
- Proper separation of concerns with domain transformations
- Type-safe boundaries with validation where needed

## Authentication Configuration

### 10. Configure autoSignIn Behavior

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
