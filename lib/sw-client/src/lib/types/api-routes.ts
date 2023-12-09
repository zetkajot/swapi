import { FilmRequest } from './requests/film';
import { PeopleRequest } from './requests/people';
import { PlanetRequest } from './requests/planet';
import { SpeciesRequest } from './requests/species';
import { StarshipRequest } from './requests/starship';
import { VehicleRequest } from './requests/vehicle';
import { FilmResponse } from './responses/film';
import { PeopleResponse } from './responses/people';
import { PlanetResponse } from './responses/planet';
import { SpeciesResponse } from './responses/species';
import { StarshipResponse } from './responses/starship';
import { VehicleResponse } from './responses/vehicle';

export const APIRoutes = {
  Films: '/films/',
  Planets: '/planets/',
  Species: '/species/',
  Vehicles: '/vehicles/',
  Starships: '/starships/',
  Peoples: '/people/',
} as const;

export type APIRoutes = (typeof APIRoutes)[keyof typeof APIRoutes];


type RouteTypesMap = {
  [APIRoutes.Films]: { request: FilmRequest; response: FilmResponse };
  [APIRoutes.Planets]: { request: PlanetRequest; response: PlanetResponse };
  [APIRoutes.Species]: { request: SpeciesRequest; response: SpeciesResponse };
  [APIRoutes.Vehicles]: { request: VehicleRequest; response: VehicleResponse };
  [APIRoutes.Starships]: {
    request: StarshipRequest;
    response: StarshipResponse;
  };
  [APIRoutes.Peoples]: {
    request: PeopleRequest,
    response: PeopleResponse,
  }
};

export type RequestForRoute<T extends APIRoutes> = RouteTypesMap[T]['request'];
export type ResponseForRoute<T extends APIRoutes> = RouteTypesMap[T]['response'];
