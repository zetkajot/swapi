import { z } from 'zod';
import { CacheConfigSchema } from './cache.config';
import { RedisConfigSchema } from './redis.config';
import { AppConfigSchema } from './app.config';
import { SWClientConfigSchema } from './sw-client.config';

export const ConfigSchema = CacheConfigSchema.merge(RedisConfigSchema).merge(SWClientConfigSchema).merge(AppConfigSchema);

export type Config = z.infer<typeof CacheConfigSchema> &
  z.infer<typeof RedisConfigSchema> &
  z.infer<typeof SWClientConfigSchema> & z.infer<typeof AppConfigSchema>;
