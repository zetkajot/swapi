import { AxiosError, Axios } from 'axios';
import { DefaultClientBuilder } from './default-client-builder';
import { CommonRequest } from './types/requests/common';
import { FilmResponse } from './types/responses/film';
import { PaginatedResponse } from './types/responses/paginated';
import { NoResponseError } from './errors/no-response.error';
import { InvalidResponseError } from './errors/invalid-response.error';
import { RequestFailedError } from './errors/request-failed.error';

describe('DefaultClientBuilder tests', () => {
  it('Should throw an error if `build()` is called without Base URL set', () => {
    const builder = DefaultClientBuilder.new();
    builder.setClient({} as never);
    expect(builder.build).toThrow();
  });
  it('Should throw an error if `build()` is called without HTTP client set', () => {
    const builder = DefaultClientBuilder.new();
    builder.setBaseURL('');
    expect(builder.build).toThrow();
  });
  it('Should build client with methods for paginated resource retrieval', () => {
    const client = DefaultClientBuilder.new()
      .setBaseURL('')
      .setClient({} as never)
      .registerRoute('Films')
      .registerRoute('Planets')
      .build();
    expect(client.getFilms).toBeDefined();
    expect(client.getFilms).toBeInstanceOf(Function);
    expect(client.getPlanets).toBeDefined();
    expect(client.getPlanets).toBeInstanceOf(Function);
  });
  it('Should build client with methods for single (by id) resource retrieval', () => {
    const client = DefaultClientBuilder.new()
      .setBaseURL('')
      .setClient({} as never)
      .registerRoute('Films')
      .registerRoute('Planets')
      .build();
    expect(client.getFilmById).toBeDefined();
    expect(client.getFilmById).toBeInstanceOf(Function);
    expect(client.getPlanetById).toBeDefined();
    expect(client.getPlanetById).toBeInstanceOf(Function);
  });
  describe('Built client', () => {
    const BASE_URL = 'http://example.org';
    let httpClient: { get: jest.Mock };
    let builtClient: {
      getFilms: (
        request?: CommonRequest | undefined
      ) => Promise<PaginatedResponse<FilmResponse>>;
    } & { getFilmById: (id: number) => Promise<FilmResponse> };
    beforeEach(() => {
      httpClient = {
        get: jest.fn(),
      };
      builtClient = DefaultClientBuilder.new()
        .setBaseURL(BASE_URL)
        .setClient(httpClient as unknown as Axios)
        .registerRoute('Films')
        .build();
    });

    it('Should rethrow any encountered unhandled errors during single resource retrieval', async () => {
      const expectedError = new Error('Unhandled Error!');
      httpClient.get.mockRejectedValue(expectedError);

      await expect(builtClient.getFilmById(0)).rejects.toThrow(expectedError);
    });
    it('Should throw `NoResponseError` when single resource retrieval failed due to no response received', async () => {
      const axiosError = new AxiosError();
      axiosError.request = {};
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilmById(0)).rejects.toThrow(NoResponseError);
    });
    it('Should throw `InvalidResponseError` when single resource retrieval failed due to invalid response code', async () => {
      const axiosError = new AxiosError();
      axiosError.request = {};
      axiosError.response = { status: 500 } as never;
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilmById(0)).rejects.toThrow(
        InvalidResponseError
      );
    });
    it('Should throw `RequestFailedError` when single resource retrieval failed due to request not being sent', async () => {
      const axiosError = new AxiosError();
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilmById(0)).rejects.toThrow(
        RequestFailedError
      );
    });
    it('Should rethrow any encountered unhandled errors during multi(paginated) resource retrieval', async () => {
      const expectedError = new Error('Unhandled Error!');
      httpClient.get.mockRejectedValue(expectedError);

      await expect(builtClient.getFilms()).rejects.toThrow(expectedError);
    });
    it('Should throw `NoResponseError` when multi(paginated) resource retrieval failed due to no response received', async () => {
      const axiosError = new AxiosError();
      axiosError.request = {};
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilms()).rejects.toThrow(NoResponseError);
    });
    it('Should throw `InvalidResponseError` when multi(paginated) resource retrieval failed due to invalid response code', async () => {
      const axiosError = new AxiosError();
      axiosError.request = {};
      axiosError.response = { status: 500 } as never;
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilms()).rejects.toThrow(
        InvalidResponseError
      );
    });
    it('Should throw `RequestFailedError` when multi(paginated) resource retrieval failed due to request not being sent', async () => {
      const axiosError = new AxiosError();
      httpClient.get.mockRejectedValue(axiosError);

      await expect(builtClient.getFilms()).rejects.toThrow(RequestFailedError);
    });
    it('Should call `get` method with transformed request as params on multi(paginated) resource retrieval', async () => {
      httpClient.get.mockResolvedValue({ data: {} });
      const request = {
        page: 3,
        filter: ['A'],
      };
      await builtClient.getFilms(request);

      expect(httpClient.get).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          params: {
            page: request.page,
            search: request.filter.join(','),
          },
        }),
      );
    });
    it('Should call `get` method with properly joined URL on multi(paginated) resource retrieval', async () => {
      httpClient.get.mockResolvedValue({ data: {} });
      const request = {
        page: 3,
        filter: ['A'],
      };
      await builtClient.getFilms(request);

      expect(httpClient.get).toHaveBeenCalledWith(
        BASE_URL+'/films/',
        expect.anything(),
      );
    });
    it('Should return value from resolved `get` call on multi(paginated) resource retrieval', async () => {
      const expectedData = {some: 'data'};
      httpClient.get.mockResolvedValue({ data: expectedData });
      const actualData = await builtClient.getFilms();

      expect(actualData).toEqual(expectedData);
    });
    it('Should call `get` method with id included as path param on single resource retrieval', async () => {
      const id = 12;
      httpClient.get.mockResolvedValue({ data: {} });
      await builtClient.getFilmById(id);

      const calledURL = httpClient.get.mock.lastCall[0] as string;
      const actualId = calledURL.replace(BASE_URL, '').replace('/films/', '');

      expect(actualId).toEqual(`${id}`);
    });
    it('Should return value from resolved `get` call on single resource retrieval', async () => {
      const expectedData = {some: 'data'};
      httpClient.get.mockResolvedValue({ data: expectedData });
      const actualData = await builtClient.getFilmById(0);

      expect(actualData).toEqual(expectedData);
    });
  });
});
