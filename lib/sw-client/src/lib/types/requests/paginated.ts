export type PaginatedRequest<T extends object> = T & {
  page?: number;
}