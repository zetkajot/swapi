import { SpeciesResponse } from '../responses/species';
import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type SpeciesRequest = PaginatedRequest<
  FilteredRequest<Pick<SpeciesResponse, 'name'>>
>;
