export interface CacheStorage<K, V> {
  set(key: K, value: V): Promise<void>;
  get(key: K): Promise<V | null>;
}