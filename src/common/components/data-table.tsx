"use client";

import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/common/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: Boolean(pageCount !== undefined),
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {pageCount !== undefined && pagination && onPaginationChange && (
        <div className="flex items-center justify-between space-x-2 p-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pagination.pageSize}`}
              onValueChange={(value: string) => {
                onPaginationChange?.({
                  ...pagination,
                  pageSize: Number(value),
                  pageIndex: 0,
                });
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center text-sm font-medium text-nowrap">
              Page {pagination.pageIndex + 1} of {Math.max(1, pageCount)}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {renderPaginationItems(
                  pagination.pageIndex,
                  pageCount,
                  (pageIndex) => {
                    onPaginationChange?.({
                      ...pagination,
                      pageIndex,
                    });
                  },
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}

function renderPaginationItems(
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
) {
  const items = [];
  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  if (startPage > 0) {
    items.push(
      <PaginationItem key={0}>
        <PaginationLink
          onClick={(e) => {
            e.preventDefault();
            onPageChange(0);
          }}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <PaginationItem key={page}>
        <PaginationLink
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
          isActive={page === currentPage}
          className="cursor-pointer"
        >
          {page + 1}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (endPage < totalPages - 1) {
    if (endPage < totalPages - 2) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    items.push(
      <PaginationItem key={totalPages - 1}>
        <PaginationLink
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPages - 1);
          }}
          className="cursor-pointer"
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return items;
}
