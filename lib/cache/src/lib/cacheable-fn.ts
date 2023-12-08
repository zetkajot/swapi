export type CacheableFn<In extends unknown[], Out> = (...args: In) => Out;
export type CacheableAsyncFn<In extends unknown[], Out> = (...args: In) => Promise<Out>;