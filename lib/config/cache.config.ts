import { z } from 'zod';

export const CacheConfigSchema = z.object({
  CACHE_TTL: z.coerce.number().int().positive().default(86400),
});