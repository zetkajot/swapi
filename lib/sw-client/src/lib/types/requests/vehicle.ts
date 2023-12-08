import { VehicleResponse } from '../responses/vehicle';
import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type VehicleRequest = PaginatedRequest<
  FilteredRequest<Pick<VehicleResponse, 'name' | 'model'>>
>;
