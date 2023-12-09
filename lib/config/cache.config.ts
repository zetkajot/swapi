import { z } from 'zod';

export const CacheConfigSchema = z.object({
  CACHE_TTL: z.number().int().positive().default(30),
});