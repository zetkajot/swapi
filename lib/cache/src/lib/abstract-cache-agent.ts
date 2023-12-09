import { CacheStorage } from './cache-storage';
import { CacheableAsyncFn, CacheableFn } from './cacheable-fn';

export abstract class AbstractCacheAgent<In, Out, Key> {
  constructor(private readonly storage: CacheStorage<Key, Out>) {}
  protected abstract getCacheKey(input: In): Key;

  public getCachedValueFor(input: In): Promise<Out | null> {
    const cacheKey = this.getCacheKey(input);
    return this.storage.get(cacheKey);
  }

  public setCachedValueFor(input: In, value: Out): Promise<void> {
    const cacheKey = this.getCacheKey(input);
    return this.storage.set(cacheKey, value);
  }

  public bindCache<FnIn extends unknown[]>(fn: CacheableFn<FnIn, Out>, inputTransform: (fnInput: FnIn) => In): CacheableAsyncFn<FnIn, Out> {
    return async (...args: FnIn) => {
      const transformedInput = inputTransform(args);
      const cachedValue = await this.getCachedValueFor(transformedInput);
      if (cachedValue !== null) {
        return cachedValue;
      } else {
        const value = fn(...args);
        await this.setCachedValueFor(transformedInput, value);
        return value;
      }
    }
  }

  public bindCacheAsync<FnOut extends Out,FnIn extends unknown[]>(fn: CacheableAsyncFn<FnIn, FnOut>, inputTransform: (fnInput: FnIn) => In): typeof fn {
    return async (...args: FnIn) => {
      const transformedInput = inputTransform(args);
      const cachedValue = await this.getCachedValueFor(transformedInput);
      if (cachedValue !== null) {
        return cachedValue as FnOut;
      } else {
        const value = await fn(...args);
        await this.setCachedValueFor(transformedInput, value);
        return value;
      }
    }
  }
}