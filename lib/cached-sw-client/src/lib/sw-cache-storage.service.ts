import { CacheStorage } from '@self/cache';
import { AllResponses } from './types/all-responses';
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import {Config} from '@self/config';

@Injectable()
export class SWCacheStorageService
  implements CacheStorage<string, AllResponses>
{
  private cacheTTL: number;
  constructor(private readonly redis: Redis, configSvc: ConfigService<Config>) {
    this.cacheTTL = configSvc.get('CACHE_TTL')!;
  }

  public async set(key: string, value: AllResponses): Promise<void> {
    Logger.debug(`Caching value for key "${key}".`);
    await this.redis.setex(key, this.cacheTTL, JSON.stringify(value));
  }

  public async get(key: string): Promise<AllResponses | null> {
    const value = await this.redis.get(key);
    if (value === null) {
      Logger.debug(`Cache miss for "${key}".`)
      return value as null;
    }
    Logger.debug(`Cache hit for "${key}".`)
    return JSON.parse(value);
  }
}
