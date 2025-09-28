export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}
