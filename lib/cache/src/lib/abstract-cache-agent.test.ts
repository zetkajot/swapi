import { AbstractCacheAgent } from './abstract-cache-agent';
import { CacheStorage } from './cache-storage';

const mockCacheKeyCalcFn = jest.fn();
const DummyAgent = class extends AbstractCacheAgent<string, string, string> {
  protected override getCacheKey = mockCacheKeyCalcFn;
};

describe('Abstract Cache Agent tests', () => {
  let agent: AbstractCacheAgent<string, string, string>;
  let mockStorage: CacheStorage<string, string>;
  beforeEach(() => {
    mockStorage = {
      get: jest.fn(),
      set: jest.fn(),
    };
    agent = new DummyAgent(mockStorage);
    jest.resetAllMocks();
  });
  describe('Cache-bounded function', () => {
    it('Should transform input using provided transform fn', async () => {
      const mockTransformer = jest.fn();
      const testFn = agent.bindCache(
        jest.fn(),
        mockTransformer
      );
      const fnInput = 'some data';
  
      await testFn(fnInput);
  
      expect(mockTransformer).toHaveBeenCalledWith([fnInput]);
    });
    it('Should always calculate cache key from transformed input', async () => {
      const expectedTransformedInput = 'transformed input';
      const mockTransformer = jest.fn().mockReturnValue(expectedTransformedInput);
      const testFn = agent.bindCache(
        jest.fn(),
        mockTransformer
      );
  
      await testFn();
  
      expect(mockCacheKeyCalcFn).toHaveBeenCalledWith(expectedTransformedInput);
    });
    it('Should always try to retrieve value from cache using calculated key', async () => {
      const expectedCacheKey = 'some cache key';
      mockCacheKeyCalcFn.mockReturnValue(expectedCacheKey);
      const testFn = agent.bindCache(
        jest.fn(),
        jest.fn().mockReturnValue(''),
      );
  
      await testFn();
  
      expect(mockStorage.get).toHaveBeenCalledWith(expectedCacheKey);
    });
    it('Should return value found in cache if it exists', async () => {
      const expectedValue = 'some cached data';
      (mockStorage.get as jest.Mock).mockResolvedValue(expectedValue);
      const testFn = agent.bindCache(
        () => '',
        jest.fn().mockReturnValue(''),
      );

      await expect(testFn()).resolves.toEqual(expectedValue);
  
    });
    it('Should call underlying non-cached function if no cached value was found', async () => {
      const mockFn = jest.fn();
      const expectedArgs = ['a', 'b', 'c'];
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCache(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      await testFn(...expectedArgs);

      expect(mockFn).toHaveBeenCalledWith(...expectedArgs);
    });
    it('Should cache result of  underlying non-cached function if no cached value was found', async () => {
      mockCacheKeyCalcFn.mockReturnValue('');
      const expectedValue = 'some uncached data';
      const mockFn = jest.fn().mockReturnValue(expectedValue);
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCache(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      await testFn();

      expect(mockStorage.set).toHaveBeenCalledWith(expect.anything(), expectedValue);
    });
    it('Should return result of underlying non-cached function if no cached value was found', async () => {
      const expectedValue = 'some uncached data';
      const mockFn = jest.fn().mockReturnValue(expectedValue);
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCache(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      expect(testFn()).resolves.toEqual(expectedValue);
    });
  });
  describe('Async Cache-bounded function', () => {
    it('Should transform input using provided transform fn', async () => {
      const mockTransformer = jest.fn();
      const testFn = agent.bindCacheAsync(
        jest.fn().mockResolvedValue(''),
        mockTransformer
      );
      const fnInput = 'some data';
  
      await testFn(fnInput);
  
      expect(mockTransformer).toHaveBeenCalledWith([fnInput]);
    });
    it('Should always calculate cache key from transformed input', async () => {
      const expectedTransformedInput = 'transformed input';
      const mockTransformer = jest.fn().mockReturnValue(expectedTransformedInput);
      const testFn = agent.bindCacheAsync(
        jest.fn().mockResolvedValue(''),
        mockTransformer
      );
  
      await testFn();
  
      expect(mockCacheKeyCalcFn).toHaveBeenCalledWith(expectedTransformedInput);
    });
    it('Should always try to retrieve value from cache using calculated key', async () => {
      const expectedCacheKey = 'some cache key';
      mockCacheKeyCalcFn.mockReturnValue(expectedCacheKey);
      const testFn = agent.bindCacheAsync(
        jest.fn().mockResolvedValue(''),
        jest.fn().mockReturnValue(''),
      );
  
      await testFn();
  
      expect(mockStorage.get).toHaveBeenCalledWith(expectedCacheKey);
    });
    it('Should return value found in cache if it exists', async () => {
      const expectedValue = 'some cached data';
      (mockStorage.get as jest.Mock).mockResolvedValue(expectedValue);
      const testFn = agent.bindCacheAsync(
        jest.fn().mockResolvedValue(''),
        jest.fn().mockReturnValue(''),
      );

      await expect(testFn()).resolves.toEqual(expectedValue);
  
    });
    it('Should call underlying non-cached function if no cached value was found', async () => {
      const mockFn = jest.fn();
      const expectedArgs = ['a', 'b', 'c'];
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCacheAsync(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      await testFn(...expectedArgs);

      expect(mockFn).toHaveBeenCalledWith(...expectedArgs);
    });
    it('Should cache result of  underlying non-cached function if no cached value was found', async () => {
      mockCacheKeyCalcFn.mockReturnValue('');
      const expectedValue = 'some uncached data';
      const mockFn = jest.fn().mockResolvedValue(expectedValue);
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCacheAsync(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      await testFn();

      expect(mockStorage.set).toHaveBeenCalledWith(expect.anything(), expectedValue);
    });
    it('Should return result of underlying non-cached function if no cached value was found', async () => {
      const expectedValue = 'some uncached data';
      const mockFn = jest.fn().mockResolvedValue(expectedValue);
      (mockStorage.get as jest.Mock).mockResolvedValue(null);
      const testFn = agent.bindCacheAsync(
        mockFn,
        jest.fn().mockReturnValue(''),
      );

      expect(testFn()).resolves.toEqual(expectedValue);
    });
  });


});
