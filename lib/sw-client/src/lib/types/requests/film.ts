import { FilmResponse } from '../responses/film';
import { FilteredRequest } from './filtered';
import { PaginatedRequest } from './paginated';

export type FilmRequest = PaginatedRequest<
  FilteredRequest<Pick<FilmResponse, 'title'>>
>;
