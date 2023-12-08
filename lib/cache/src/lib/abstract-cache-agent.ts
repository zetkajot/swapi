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
        return fn(...args);
      }
    }
  }

  public bindCacheAsync<FnIn extends unknown[]>(fn: CacheableAsyncFn<FnIn, Out>, inputTransform: (fnInput: FnIn) => In): CacheableAsyncFn<FnIn, Out> {
    return async (...args: FnIn) => {
      const transformedInput = inputTransform(args);
      const cachedValue = await this.getCachedValueFor(transformedInput);
      if (cachedValue !== null) {
        return cachedValue;
      } else {
        return fn(...args);
      }
    }
  }
}