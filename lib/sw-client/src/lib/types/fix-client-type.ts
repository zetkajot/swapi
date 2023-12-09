import { APIRoutes, RequestForRoute, ResponseForRoute } from './api-routes';
import { AddRoute } from './client-builder';
import { PaginatedResponse } from './responses/paginated';

type FixedFnForMethod<T extends string> = T extends `get${infer U}ById`
  ? `${U}s` extends keyof typeof APIRoutes
    ? (id: number) => Promise<ResponseForRoute<(typeof APIRoutes)[`${U}s`]>>
    : never
  : T extends `get${infer U}`
  ? U extends keyof typeof APIRoutes
    ? (request: RequestForRoute<(typeof APIRoutes)[U]>) => Promise<PaginatedResponse<ResponseForRoute<(typeof APIRoutes)[U]>>>
    : never
  : never;

export type FixClientType<T extends AddRoute<keyof typeof APIRoutes>> = {
  [K in Extract<
    keyof T,
    string
  >]: FixedFnForMethod<K>;
};
