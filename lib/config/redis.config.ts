import { z } from 'zod';

export const RedisConfigSchema = z.object({
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),
})
