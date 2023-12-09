import { Injectable } from '@nestjs/common';
import { AbstractCacheAgent } from '@self/cache';
import { AllRequests } from './types/all-requests';
import { AllResponses } from './types/all-responses';
import { SWCacheStorageService } from './sw-cache-storage.service';

type CacheInput = {
  path: string;
  request: AllRequests;
}

@Injectable()
export class SWCacheAgentService extends AbstractCacheAgent<CacheInput, AllResponses, string> {
  private static readonly CACHE_KEY_SEP = ':' as const;
  constructor(storage: SWCacheStorageService) {
    super(storage);
  }

  protected override getCacheKey(input: CacheInput): string {
    if (input.request[0] === undefined) {
      return input.path;
    } else if (typeof input.request[0] === 'number') {
      return input.path + SWCacheAgentService.CACHE_KEY_SEP + `${input.request[0]}`;
    } else {
      return input.path + SWCacheAgentService.CACHE_KEY_SEP + `${input.request[0].filter?.join(',') ?? ''}` + SWCacheAgentService.CACHE_KEY_SEP + `${input.request[0].page ?? '0'}`
    }
  }

}