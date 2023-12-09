import { Module } from '@nestjs/common';
import { SWCacheAgentService } from './sw-cache-agent.service';
import { SWCacheStorageService } from './sw-cache-storage.service';
import { RedisModule } from '@self/redis';
import { SWClientModule } from '@self/sw-client';
import { CachedSWClientService } from './cached-sw-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [RedisModule, SWClientModule, ConfigModule],
  providers: [CachedSWClientService, SWCacheAgentService, SWCacheStorageService],
  exports: [CachedSWClientService],
})
export class CachedSWClientModule {}
