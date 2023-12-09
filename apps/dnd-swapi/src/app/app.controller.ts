/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery,  } from '@nestjs/swagger';
import { ParseQueryArrayPipe, ParseQueryPagePipe } from '@self/utils';
import { FilmDto, PaginatedFilmDto } from '../dto/film.dto';
import { AppService } from './app.service';
import { CachedSWClientService } from '@self/cached-sw-client';
import { PaginatedPlanetDto, PlanetDto } from '../dto/planet.dto';
import { PaginatedStarshipDto, StarshipDto } from '../dto/starship.dto';
import { PaginatedVehicleDto, VehicleDto } from '../dto/vehicle.dto';
import { PaginatedSpeciesDto, SpeciesDto } from '../dto/species.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appSvc: AppService,
    private readonly client: CachedSWClientService
  ) {}

  @Get('films')
  @ApiQuery({
    name: 'filter',
    description: 'Values to filter the resources with.',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated responses',
    type: Number,
    required: false,
  })
  @ApiOkResponse({ type: PaginatedFilmDto })
  @ApiOperation({
    description: 'Returns list of films',
  })
  @ApiNotFoundResponse({
    description: 'Returned when resource and/or page matching given criteria was not found',
  })
  @ApiBadRequestResponse({
    description: 'Returned when filter and/or page query param failed validation',
  })
  public getFilms(
    @Query('filter', new ParseQueryArrayPipe()) filter?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    return this.client.getFilms({ filter, page });
  }

  @ApiQuery({
    name: 'cs',
    description:
      'Flag controlling whether word matching should be case-sensitive or not. Defaults to case-sensitive matching',
    type: Boolean,
    required: false,
  })
  @Get('films/words')
  @ApiOkResponse({
    description:
      "Array of tuples, each of which consisting of word literal and a number of it's occurrences",
  })
  @ApiOperation({
    description: 'Calculates unique word\'s occurrence in film\'s opening crawls and returns the results.',
  })
  public getWords(
    @Query('cs', new ParseBoolPipe({ optional: true })) caseSensitive?: boolean
  ) {
    return this.appSvc.getWordsCounts(caseSensitive ?? true);
  }

  @Get('films/most-frequent-character')
  @ApiOkResponse({ type: [String], description: 'Array containing names of characters.' })
  @ApiOperation({
    description: 'Finds which character\'s (or characters\') name(s) occur the most frequently in film\'s opening crawls.',
  })
  public getMostFreqCharacter() {
    return this.appSvc.getMostFrequentCharacter();
  }

  @Get('films/:id')
  @ApiOkResponse({ type: FilmDto })
  @ApiOperation({
    description: 'Retrieves single film resource using it\'s id',
  })
  public getFilmById(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.getFilmById(id);
  }

  @ApiQuery({
    name: 'filter',
    description: 'Values to filter the resources with.',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated responses',
    type: Number,
    required: false,
  })
  @ApiOperation({
    description: 'Returns list of species',
  })
  @ApiNotFoundResponse({
    description: 'Returned when resource and/or page matching given criteria was not found',
  })
  @ApiBadRequestResponse({
    description: 'Returned when filter and/or page query param failed validation',
  })
  @ApiOkResponse({
    type: SpeciesDto,
  })
  @Get('species')
  public getSpecies(
    @Query('filter', new ParseQueryArrayPipe()) filter?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    return this.client.getSpecies({ filter, page });
  }

  @ApiOperation({
    description: 'Retrieves single species resource using it\'s id',
  })
  @ApiBadRequestResponse({
    description: 'Returned when id param failed validation',
  })
  @ApiOkResponse({
    type: PaginatedSpeciesDto
  })
  @Get('species/:id')
  public getSpeciesById(@Param('id', new ParseIntPipe()) id: number) {
    return this.getSpeciesById(id);
  }

  @ApiQuery({
    name: 'filter',
    description: 'Values to filter the resources with.',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated responses',
    type: Number,
    required: false,
  })
  @ApiNotFoundResponse({
    description: 'Returned when resource and/or page matching given criteria was not found',
  })
  @ApiBadRequestResponse({
    description: 'Returned when filter and/or page query param failed validation',
  })
  @ApiOperation({
    description: 'Returns list of vehicles',
  })
  @ApiOkResponse({
    type: PaginatedVehicleDto
  })
  @Get('vehicles')
  public getVehicles(
    @Query('filter', new ParseQueryArrayPipe()) filter?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    return this.client.getVehicles({ filter, page });
  }

  @Get('vehicles/:id')
  @ApiOperation({
    description: 'Retrieves single vehicle resource using it\'s id',
  })
  @ApiBadRequestResponse({
    description: 'Returned when id param failed validation',
  })
  @ApiOkResponse({
    type: VehicleDto
  })
  public getVehicleById(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.getVehicleById(id);
  }

  @ApiQuery({
    name: 'filter',
    description: 'Values to filter the resources with.',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated responses',
    type: Number,
    required: false,
  })
  @ApiOperation({
    description: 'Returns list of starships',
  })
  @ApiNotFoundResponse({
    description: 'Returned when resource and/or page matching given criteria was not found',
  })
  @ApiBadRequestResponse({
    description: 'Returned when filter and/or page query param failed validation',
  })
  @ApiOkResponse({type: PaginatedStarshipDto})
  @Get('starships')
  public getStarships(
    @Query('filter', new ParseQueryArrayPipe()) filter?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    return this.client.getStarships({ filter, page });
  }

  @ApiOperation({
    description: 'Retrieves single straship resource using it\'s id',
  })
  @ApiBadRequestResponse({
    description: 'Returned when id param failed validation',
  })
  @ApiOkResponse({ type: StarshipDto})
  @Get('starships/:id')
  public getStarshipById(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.getStarshipById(id);
  }

  @ApiQuery({
    name: 'filter',
    description: 'Values to filter the resources with.',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for paginated responses',
    type: Number,
    required: false,
  })
  @ApiOperation({
    description: 'Returns list of planets',
  })
  @ApiOkResponse({type: PaginatedPlanetDto})
  @ApiNotFoundResponse({
    description: 'Returned when resource and/or page matching given criteria was not found',
  })
  @ApiBadRequestResponse({
    description: 'Returned when filter and/or page query param failed validation',
  })
  @Get('planets')
  public getPlanets(
    @Query('filter', new ParseQueryArrayPipe()) filter?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    return this.client.getPlanets({ filter, page });
  }

  @ApiOperation({
    description: 'Retrieves single planet resource using it\'s id',
  })
  @ApiOkResponse({type: PlanetDto})
  @ApiParam({name: 'id', type: Number, description: 'Id of the planet resource'})
  @ApiBadRequestResponse({
    description: 'Returned when id param failed validation',
  })
  @ApiNotFoundResponse({
    description: 'Returned when resource with given id was not found',
  })
  @Get('planets/:id')
  public getPlanetById(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.getPlanetById(id);
  }
}
