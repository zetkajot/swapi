import { RequestForRoute, APIRoutes } from '../types/api-routes';
import { URLParams } from '../types/url-params';

/**
 * Transforms a request into an object (dict) with key and value pairs reflecting
 * HTTP(S) request's query params to use.
 * @param request Request
 */
export function transformRequest<T extends APIRoutes>(
  request: RequestForRoute<T>
): URLParams {
  const page = Math.floor(Math.max(1, request.page ?? 1));
  let search: string | undefined;

  if (request.filter !== undefined && request.filter.length > 0) {
    search = request.filter.join(',');
  } else {
    search = undefined;
  }

  return {
    page,
    search,
  };
}
