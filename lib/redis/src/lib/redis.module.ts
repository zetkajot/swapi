import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '@self/config';
import { Redis } from 'ioredis';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: Redis,
      useFactory: (cfg: ConfigService<Config>) => {
        return new Redis(cfg.get('REDIS_PORT')!, cfg.get('REDIS_HOST')!);
      },
      inject: [ConfigService],
    },
  ],
  exports: [Redis],
})
export class RedisModule {}
