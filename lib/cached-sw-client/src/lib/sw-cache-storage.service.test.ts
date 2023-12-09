import { SWCacheStorageService } from './sw-cache-storage.service';

describe('SW Storage Service tests', () => {
  const setTTL = 2137;
  const mockRedis = {
    setex: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  };
  const mockConfig = {
    get: jest.fn().mockReturnValue(setTTL),
  };
  let storage: SWCacheStorageService;
  beforeEach(() => {
    storage = new SWCacheStorageService(
      mockRedis as never,
      mockConfig as never
    );
  });
  it('Should store cached values in Redis at given key using "SETEX" command', async () => {
    const expectedKey = 'some key';
    await storage.set(expectedKey, {} as never);
    expect(mockRedis.setex.mock.lastCall[0]).toEqual(expectedKey);
  });
  it('Should store cached values in Redis with configured TTL using "SETEX" command', async () => {
    const expectedTTL = setTTL;
    await storage.set('anything', {} as never);
    expect(mockRedis.setex.mock.lastCall[1]).toEqual(expectedTTL);
  });
  it('Should store values in JSON-encoded form using "SETEX" command', async () => {
    const data = { a: 1, b: 'b', c: false, d: ['a', 1] };
    const expectedValue = JSON.stringify(data);
    await storage.set('anything', data as never);
    expect(mockRedis.setex.mock.lastCall[2]).toEqual(expectedValue);
  });
  it('Should store values in JSON-encoded form using "SETEX" command', async () => {
    const data = { a: 1, b: 'b', c: false, d: ['a', 1] };
    const expectedValue = JSON.stringify(data);
    await storage.set('anything', data as never);
    expect(mockRedis.setex.mock.lastCall[2]).toEqual(expectedValue);
  });
  it('Should retrieve cached values at given key from Redis using "GET" command', async () => {
    mockRedis.get.mockResolvedValue('{}');
    const expectedKey = 'some key';
    await storage.get(expectedKey);
    expect(mockRedis.get).toHaveBeenCalledWith(expectedKey);
  });
  it('Should return cached values at given key after JSON parsing them', async () => {
    const expectedValue = { a: 1, b: 'b', c: false, d: ['a', 1] };
    mockRedis.get.mockResolvedValue(JSON.stringify(expectedValue));
    await expect(storage.get('some key')).resolves.toEqual(expectedValue);
  });
  it('Should return null if cached value stored for given key is corrupted (i.e. cannot be JSON parsed)', async () => {
    const expectedValue = null;
    mockRedis.get.mockResolvedValue('not a json');
    await expect(storage.get('some key')).resolves.toEqual(expectedValue);
  });
  it('Should delete cached value at given key from Redis using "DEL" command if it is corrupted.', async () => {
    const expectedKey = 'some key';
    mockRedis.get.mockResolvedValue('not a json');
    
    await storage.get(expectedKey);

    expect(mockRedis.del).toHaveBeenCalledWith(expectedKey);
  });
});
