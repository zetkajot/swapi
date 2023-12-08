import { transformRequest } from './transform-request';

describe('transformRequest() tests', () => {
  it("Should default `page` param to 1 when request's `page` property was `undefined` ", () => {
    const request = {};
    const expected = 1;

    const actual = transformRequest(request)?.page;

    expect(actual).toEqual(expected);
  });
  it("Should set `page` param to 1 when request's `page` property was less than 1 ", () => {
    const request = {
      page: 0,
    };
    const expected = 1;

    const actual = transformRequest(request)?.page;

    expect(actual).toEqual(expected);
  });
  it("Should set `page` param to `Math.floor(N)` when request's `page` property was set to `N` and `N` was not an integer ", () => {
    const request = {
      page: 13.4,
    };
    const expected = 13;

    const actual = transformRequest(request)?.page;

    expect(actual).toEqual(expected);
  });
  it("Should set `page` param to `N` when request's `page` property was set to `N` and `N` was positive integer ", () => {
    const request = {
      page: 13.4,
    };
    const expected = 13;

    const actual = transformRequest(request)?.page;

    expect(actual).toEqual(expected);
  });
  it('Should not define `search` param when request\'s `filter` property was not defined', () => {
    const request = {};
    const expected = undefined;

    const actual = transformRequest(request)?.search;

    expect(actual).toEqual(expected);
  });
  it('Should not define `search` param when request\'s `filter` property an empty array', () => {
    const request = {
      filter: [],
    };
    const expected = undefined;

    const actual = transformRequest(request)?.search;

    expect(actual).toEqual(expected);
  });
  it('Should set `search` param to the value of the request\'s `filter` array first element if array\'s length is 1', () => {
    const request = {
      filter: ['testParam'],
    };
    const expected = 'testParam';

    const actual = transformRequest(request)?.search;

    expect(actual).toEqual(expected);
  });
  it('Should set `search` param to the string containing comma-separated values of the request\'s `filter` array if array\'s length is greater than 1', () => {
    const request = {
      filter: ['testParam', 'otherParam', 'andAnotherParam'],
    };
    const expected = 'testParam,otherParam,andAnotherParam';

    const actual = transformRequest(request)?.search;

    expect(actual).toEqual(expected);
  });
});
