import { Axios, AxiosError } from 'axios';
import {
  APIRoutes,
  RequestForRoute,
  ResponseForRoute,
} from './types/api-routes';
import { AddRoute, ClientBuilder } from './types/client-builder';
import { PaginatedResponse } from './types/responses/paginated';
import { transformRequest } from './utils/transform-request';
import { InvalidResponseError } from './errors/invalid-response.error';
import { NoResponseError } from './errors/no-response.error';
import { RequestFailedError } from './errors/request-failed.error';
import { assert } from 'console';

export class DefaultClientBuilder<T = object> implements ClientBuilder<T> {
  private constructor(
    private readonly routeRegister: Set<string> = new Set(),
    private baseURL?: string,
    private httpClient?: Axios
  ) {}

  setBaseURL(url: string): ClientBuilder<T> {
    this.baseURL = url;
    return this.chainedState();
  }
  setClient(client: Axios): ClientBuilder<T> {
    this.httpClient = client;
    return this.chainedState();
  }
  registerRoute<R extends keyof typeof APIRoutes>(
    route: R
  ): ClientBuilder<T & AddRoute<R>> {
    this.routeRegister.add(route);
    return this.chainedState() as ClientBuilder<T & AddRoute<R>>;
  }
  build(): T {
    // Throwing generic js `Error`'s since build should only occur at the application startup
    // so no domain-specific handling would be needed
    assert(this.httpClient !== undefined, 'Cannot build client without set HTTP Client');
    assert(this.baseURL !== undefined, 'Cannot build client without set Base URL');

    const builtClient: Record<string, unknown> = {};
    for (const _routeName of this.routeRegister) {
      const routeName = _routeName as keyof typeof APIRoutes;
      builtClient['get' + routeName] = makeRouteHandlerForPaginated(routeName, APIRoutes[routeName], this.httpClient!, this.baseURL!)
      builtClient['get' + routeName.slice(0,-1) + 'ById'] = makeRouteHandlerForSingle(routeName, APIRoutes[routeName], this.httpClient!, this.baseURL!)
    }

    return builtClient as T;
  }

  public static new(): DefaultClientBuilder {
    return new DefaultClientBuilder();
  }

  private chainedState(): typeof this {
    return new DefaultClientBuilder<T>(
      this.routeRegister,
      this.baseURL,
      this.httpClient
    ) as typeof this;
  }
}

function makeRouteHandlerForPaginated<R extends keyof typeof APIRoutes>(
  _: R,
  routePath: (typeof APIRoutes)[R],
  client: Axios,
  baseURL: string
): (
  request?: RequestForRoute<(typeof APIRoutes)[R]>
) => Promise<PaginatedResponse<ResponseForRoute<(typeof APIRoutes)[R]>>> {
  return async (request) => {
    const requestURL = baseURL + routePath;
    try {
      const response = await client.get(requestURL, {
        params: request ? transformRequest(request) : undefined,
      });
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        handleAxiosError(routePath, e);
      } else {
        throw e;
      }
    }

  };
}

function makeRouteHandlerForSingle<R extends keyof typeof APIRoutes>(
  _: R,
  routePath: (typeof APIRoutes)[R],
  client: Axios,
  baseURL: string
): (
  id: number
) => Promise<ResponseForRoute<(typeof APIRoutes)[R]>> {
  return async (id) => {
    const requestURL = baseURL + routePath + id;
    try {
      const response = await client.get(requestURL);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        handleAxiosError(routePath, e);
      } else {
        throw e;
      }
    }

  };
}

function handleAxiosError(path: string, error: AxiosError): void {
  if (error.response) {
    throw new InvalidResponseError(path, error.response);
  } else if (error.request) {
    throw new NoResponseError(path, error);
  } else {
    throw new RequestFailedError(path, error);
  }
}