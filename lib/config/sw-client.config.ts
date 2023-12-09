import { z } from 'zod';
export const SWClientConfigSchema = z.object({
  SW_CLIENT_BASE_URL: z.string().url(),
})