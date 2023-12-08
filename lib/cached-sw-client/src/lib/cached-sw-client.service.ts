import { Injectable } from '@nestjs/common';
import { SWClientService } from '@self/sw-client';
import { SWCacheAgentService } from './sw-cache-agent.service';

@Injectable()
export class CachedSWClientService implements SWClientService {
  constructor(
    private readonly client: SWClientService,
    private readonly cacheAgent: SWCacheAgentService
  ) {}
  getFilms = this.cacheAgent.bindCacheAsync(this.client.getFilms, (input) => ({
    path: 'films',
    request: input,
  }));
  getPlanets = this.cacheAgent.bindCacheAsync(this.client.getPlanets, (input) => ({
    path: 'planets',
    request: input,
  }));
  getSpecies = this.cacheAgent.bindCacheAsync(this.client.getSpecies, (input) => ({
    path: 'species',
    request: input,
  }));
  getVehicles = this.cacheAgent.bindCacheAsync(this.client.getVehicles, (input) => ({
    path: 'vehicles',
    request: input,
  }));
  getStarships = this.cacheAgent.bindCacheAsync(
    this.client.getStarships,
    (input) => ({ path: 'starships', request: input })
  );
  getFilmById = this.cacheAgent.bindCacheAsync(this.client.getFilmById, (input) => ({
    path: 'films',
    request: input,
  }));
  getPlanetById = this.cacheAgent.bindCacheAsync(
    this.client.getPlanetById,
    (input) => ({ path: 'planets', request: input })
  );
  getSpecieById = this.cacheAgent.bindCacheAsync(
    this.client.getSpecieById,
    (input) => ({ path: 'species', request: input })
  );
  getVehicleById = this.cacheAgent.bindCacheAsync(
    this.client.getVehicleById,
    (input) => ({ path: 'vehicles', request: input })
  );
  getStarshipById = this.cacheAgent.bindCacheAsync(
    this.client.getStarshipById,
    (input) => ({ path: 'starships', request: input })
  );
}
