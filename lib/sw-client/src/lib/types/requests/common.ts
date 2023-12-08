import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type CommonRequest = PaginatedRequest<FilteredRequest>;