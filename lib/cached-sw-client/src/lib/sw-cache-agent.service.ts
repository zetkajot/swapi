import { Inject, Injectable } from '@nestjs/common';
import { AbstractCacheAgent, CacheStorage } from '@self/cache';
import { SWClientService } from '@self/sw-client';

export const SW_CACHE_AGENT_TOKEN = Symbol();

type AllRequests = Parameters<SWClientService[keyof SWClientService]>;
type CacheInput = {
  path: string;
  request: AllRequests;
}
type AllResponses = Awaited<ReturnType<SWClientService[keyof SWClientService]>>;

@Injectable()
export class SWCacheAgentService extends AbstractCacheAgent<CacheInput, AllResponses, string> {
  private static readonly CACHE_KEY_SEP = ':' as const;
  constructor(@Inject(SW_CACHE_AGENT_TOKEN) storage: CacheStorage<string, AllResponses>) {
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