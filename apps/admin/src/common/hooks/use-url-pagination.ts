"use client";

import type { PaginationState } from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Custom hook for URL-synchronized pagination state with TanStack Table compatibility
 *
 * Provides seamless URL persistence for pagination with user-friendly 1-based page numbers
 * in URLs while maintaining 0-based indexing internally for TanStack Table compatibility.
 *
 * @example
 * ```tsx
 * // URL: ?page=3&page-size=10
 * // UI: "Page 3 of 10"
 * // Internal: pageIndex = 2 (0-based)
 * // Database: LIMIT 10 OFFSET 20
 *
 * const { pagination, setPagination } = useURLPagination({
 *   defaultPageSize: 10,
 *   totalPages: data?.pagination.pages
 * });
 * ```
 *
 * Features:
 * - 1-based URLs (?page=3) with 0-based internal conversion
 * - Kebab-case URL parameters (page-size instead of pageSize)
 * - Browser back/forward navigation support (automatic via useSearchParams)
 * - Parameter validation with bounds checking
 * - Automatic URL correction for invalid/out-of-bounds pages
 * - Shallow routing without full page reloads
 */

interface UseURLPaginationOptions {
  defaultPageSize?: number;
  totalPages?: number;
}

interface UseURLPaginationReturn {
  pagination: PaginationState;
  setPagination: (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState),
  ) => void;
  /**
   * Updates URL with pagination state.
   * @param page - 0-based page index
   * @param pageSize - number of items per page
   * @param replace - if true, replaces current history entry (useful for correcting invalid URLs)
   */
  updateURL: (page: number, pageSize: number, replace?: boolean) => void;
}

function isValidTotalPages(
  totalPages: number | undefined,
): totalPages is number {
  return totalPages !== undefined && totalPages >= 0;
}

export function useURLPagination({
  defaultPageSize = 10,
  totalPages,
}: UseURLPaginationOptions = {}): UseURLPaginationReturn {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = searchParams.get("page");
  const rawPageSize = searchParams.get("page-size");

  const parsedPage = rawPage ? parseInt(rawPage, 10) : 1;
  const validPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

  const parsedPageSize = rawPageSize
    ? parseInt(rawPageSize, 10)
    : defaultPageSize;
  const validPageSize = Number.isNaN(parsedPageSize)
    ? defaultPageSize
    : Math.max(1, Math.min(100, parsedPageSize));

  const boundedPage = isValidTotalPages(totalPages)
    ? Math.min(validPage, Math.max(1, totalPages))
    : validPage;

  const pageIndex = boundedPage - 1;

  const updateURL = useCallback(
    (page: number, pageSize: number, replace = false) => {
      let clampedPage = Math.max(0, page);
      const clampedSize = Math.max(1, Math.min(100, pageSize));

      if (isValidTotalPages(totalPages) && totalPages > 0) {
        clampedPage = Math.min(clampedPage, totalPages - 1);
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (clampedPage + 1).toString());
      params.set("page-size", clampedSize.toString());

      const url = `${pathname}?${params.toString()}`;
      if (replace) {
        window.history.replaceState(null, "", url);
        return;
      }
      window.history.pushState(null, "", url);
    },
    [searchParams, pathname, totalPages],
  );

  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex,
      pageSize: validPageSize,
    }),
    [pageIndex, validPageSize],
  );

  const setPagination = useCallback(
    (
      updaterOrValue:
        | PaginationState
        | ((old: PaginationState) => PaginationState),
    ) => {
      const currentPagination = {
        pageIndex,
        pageSize: validPageSize,
      };

      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(currentPagination)
          : updaterOrValue;

      updateURL(newPagination.pageIndex, newPagination.pageSize);
    },
    [updateURL, pageIndex, validPageSize],
  );

  return {
    pagination,
    setPagination,
    updateURL,
  };
}
