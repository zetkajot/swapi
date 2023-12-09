import { SWCacheAgentService } from './sw-cache-agent.service';

describe('SW Cache Agent tests', () => {
  const singleResourceRequestsInput: [
    { path: string; request: [id: number] },
    string
  ][] = [
    [{ path: 'films', request: [1] }, 'films:1'],
    [{ path: 'vehicles', request: [5] }, 'vehicles:5'],
    [{ path: 'planets', request: [10] }, 'planets:10'],
  ];
  const bareMultiResourceRequestsInput: [
    {path: string, request: []}, string
  ][] = [
    [{ path: 'films', request: [] }, 'films'],
    [{ path: 'vehicles', request: [] }, 'vehicles'],
    [{ path: 'planets', request: [] }, 'planets'],
  ];
  const pagedMultiResourceRequestsInput: [
    {path: string, request: [{page?: number}]}, string
  ][] = [
    [{ path: 'films', request: [{ page: 1}] }, 'films::1'],
    [{ path: 'vehicles', request: [{page: 13}] }, 'vehicles::13'],
    [{ path: 'vehicles', request: [{page: undefined}] }, 'vehicles::0'],
    [{ path: 'planets', request: [{page: 0}] }, 'planets::0'],
  ];
  const filteredMultiResourceRequestsInput: [
    {path: string, request: [{filter?: string[]}]}, string
  ][] = [
    [{ path: 'films', request: [{ filter: []}] }, 'films::0'],
    [{ path: 'vehicles', request: [{filter: ['a']}] }, 'vehicles:a:0'],
    [{ path: 'vehicles', request: [{filter: undefined}] }, 'vehicles::0'],
    [{ path: 'planets', request: [{filter: ['a','b','c']}] }, 'planets:a,b,c:0'],
  ];
  const pagedAndFilteredMultiResourceRequestsInput: [
    {path: string, request: [{filter?: string[], page?: number}]}, string
  ][] = [
    [{ path: 'films', request: [{ filter: [], page: 3}] }, 'films::3'],
    [{ path: 'films', request: [{ filter: undefined, page: 2}] }, 'films::2'],
    [{ path: 'vehicles', request: [{filter: ['a'], page: 15}] }, 'vehicles:a:15'],
    [{ path: 'vehicles', request: [{filter: ['a'], page: undefined}] }, 'vehicles:a:0'],
    [{ path: 'planets', request: [{filter: ['a','b','c'], page: 7}] }, 'planets:a,b,c:7'],
  ];

  const mockStorage = {
    get: jest.fn(),
    set: jest.fn(),
  };
  let agent: SWCacheAgentService;
  beforeEach(() => {
    agent = new SWCacheAgentService(mockStorage as never);
    jest.resetAllMocks();
  });

  describe('Should use correct key for single resource requests', () => {
    for (const [input, expectedKey] of singleResourceRequestsInput) {
      it(`For request at path "${input.path}" for resource with id "${input.request[0]}" key should be "${expectedKey}"`, async () => {
        await agent.bindCache(jest.fn(), ([v]) => v)(input);
        expect(mockStorage.get).toHaveBeenCalledWith(expectedKey);
      }); 
    }
  });
  describe('Should use correct key for multi resource requests without paging and filters', () =>{
    for (const [input, expectedKey] of bareMultiResourceRequestsInput) {
      it(`For request at path "${input.path}" for multiple resources key should be "${expectedKey}"`, async () => {
        await agent.bindCache(jest.fn(), ([v]) => v)(input);
        expect(mockStorage.get).toHaveBeenCalledWith(expectedKey);
      }); 
    }
  });
  describe('Should use correct key for multi resource requests with paging', () =>{
    for (const [input, expectedKey] of pagedMultiResourceRequestsInput) {
      it(`For request at path "${input.path}" for multiple resources on page ${input.request[0].page} key should be "${expectedKey}"`, async () => {
        await agent.bindCache(jest.fn(), ([v]) => v)(input);
        expect(mockStorage.get).toHaveBeenCalledWith(expectedKey);
      }); 
    }
  });
  describe('Should use correct key for multi resource requests with filters', () =>{
    for (const [input, expectedKey] of filteredMultiResourceRequestsInput) {
      it(`For request at path "${input.path}" for multiple resources with filter "${input.request[0].filter}" key should be "${expectedKey}"`, async () => {
        await agent.bindCache(jest.fn(), ([v]) => v)(input);
        expect(mockStorage.get).toHaveBeenCalledWith(expectedKey);
      }); 
    }
  });
  describe('Should use correct key for multi resource requests with both filters and paging', () =>{
    for (const [input, expectedKey] of pagedAndFilteredMultiResourceRequestsInput) {
      it(`For request at path "${input.path}" for multiple resources on page ${input.request[0].page} with filter "${input.request[0].filter}" key should be "${expectedKey}"`, async () => {
        await agent.bindCache(jest.fn(), ([v]) => v)(input);
        expect(mockStorage.get).toHaveBeenCalledWith(expectedKey);
      }); 
    }
  });
});
