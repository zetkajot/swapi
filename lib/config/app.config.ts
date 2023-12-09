import { z } from 'zod';

export const AppConfigSchema = z.object({
  APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});
