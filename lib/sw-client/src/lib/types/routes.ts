import { FilmRequest } from './requests/film';
import { PlanetRequest } from './requests/planet';
import { SpeciesRequest } from './requests/species';
import { StarshipRequest } from './requests/starship';
import { VehicleRequest } from './requests/vehicle';
import { FilmResponse } from './responses/film';
import { PlanetResponse } from './responses/planet';
import { SpeciesResponse } from './responses/species';
import { StarshipResponse } from './responses/starship';
import { VehicleResponse } from './responses/vehicle';

export const Routes = {
  FILMS: '/films/',
  PLANETS: '/planets/',
  SPECIES: '/species/',
  VEHICLES: '/vehicles/',
  STARSHIPS: '/starships/',
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];

type RouteTypesMap = {
  [Routes.FILMS]: {request: FilmRequest, response: FilmResponse}, 
  [Routes.PLANETS]: {request: PlanetRequest, response: PlanetResponse}, 
  [Routes.SPECIES]: {request: SpeciesRequest, response: SpeciesResponse}, 
  [Routes.VEHICLES]: {request: VehicleRequest, response: VehicleResponse}, 
  [Routes.STARSHIPS]: {request: StarshipRequest, response: StarshipResponse}, 
};

export type RequestForRoute<T extends Routes> = RouteTypesMap[T]['request'];
export type ResponseForRoute<T extends Routes> = RouteTypesMap[T]['response'];