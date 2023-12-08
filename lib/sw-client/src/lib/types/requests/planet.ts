import { PlanetResponse } from '../responses/planet';
import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type PlanetRequest = PaginatedRequest<FilteredRequest<Pick<PlanetResponse, 'name'>>>