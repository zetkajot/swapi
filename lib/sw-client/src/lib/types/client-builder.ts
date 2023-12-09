import type { Axios } from 'axios';
import { APIRoutes, RequestForRoute, ResponseForRoute } from './api-routes';
import { PaginatedResponse } from './responses/paginated';

export type RemoveLastSChar<T extends string> = T extends `${infer Head}s`
  ? Head
  : never;
export type AddRoute<
  T extends keyof typeof APIRoutes,
  U extends string = RemoveLastSChar<T>
> = {
  [K in `get${T}`]: (
    request?: RequestForRoute<(typeof APIRoutes)[T]>
  ) => Promise<PaginatedResponse<ResponseForRoute<(typeof APIRoutes)[T]>>>;
} & {
  [K in `get${U}ById`]: (
    id: number
  ) => Promise<ResponseForRoute<(typeof APIRoutes)[T]>>;
};

export interface ClientBuilder<T extends Record<string, unknown>> {
  setBaseURL(url: string): ClientBuilder<T>;
  setClient(client: Axios): ClientBuilder<T>;
  registerRoute<R extends keyof typeof APIRoutes>(
    route: R
  ): ClientBuilder<T & AddRoute<R>>;

  build(): T;
}
