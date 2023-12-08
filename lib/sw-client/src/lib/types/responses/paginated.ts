export type PaginatedResponse<T extends object> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
