export type FilteredRequest<T extends Record<string, unknown>> = {
  filter?: Partial<T>;
};
