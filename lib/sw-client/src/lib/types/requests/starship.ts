import { StarshipResponse } from '../responses/starship';
import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type StarshipRequest = PaginatedRequest<
  FilteredRequest<Pick<StarshipResponse, 'name' | 'model'>>
>;
