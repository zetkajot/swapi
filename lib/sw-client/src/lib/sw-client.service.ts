import { APIRoutes } from './types/api-routes';
import { AddRoute } from './types/client-builder';

// Exporting both const cls and type of the same name for easier client injection in other modules 

export const SWClientService = class {};
export type SWClientService = AddRoute<keyof typeof APIRoutes>;
