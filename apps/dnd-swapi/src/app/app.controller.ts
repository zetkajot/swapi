/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, NotImplementedException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ParseQueryArrayPipe, ParseQueryPagePipe } from '@self/utils';

@Controller()
export class AppController {
  constructor() {}

  @Get('films')
  @ApiQuery({
    name: 'filter',
    type: [String],
    style: 'form',
    explode: false,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  public getFilms(
    @Query('filter', new ParseQueryArrayPipe()) filters?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    throw new NotImplementedException();
  }

  @Get('films/:id')
  public getFilmById(
    @Param('id', new ParseIntPipe()) id: number, 
  ) {
    throw new NotImplementedException();
  }

  @Get('species')
  public getSpecies(
    @Query('filter', new ParseQueryArrayPipe()) filters?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    throw new NotImplementedException();
  }

  @Get('species/:id')
  public getSpeciesById(
    @Param('id', new ParseIntPipe()) id: number, 
  ) {
    throw new NotImplementedException();
  }

  @Get('vehicles')
  public getVehicles(
    @Query('filter', new ParseQueryArrayPipe()) filters?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    throw new NotImplementedException();
  }

  @Get('vehicles/:id')
  public getVehicleById(
    @Param('id', new ParseIntPipe()) id: number, 
  ) {
    throw new NotImplementedException();
  }

  @Get('starships')
  public getStarships(
    @Query('filter', new ParseQueryArrayPipe()) filters?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    throw new NotImplementedException();
  }

  @Get('starships/:id')
  public getStarshipById(
    @Param('id', new ParseIntPipe()) id: number, 
  ) {
    throw new NotImplementedException();
  }

  @Get('planets')
  public getPlanets(
    @Query('filter', new ParseQueryArrayPipe()) filters?: string[],
    @Query('page', new ParseQueryPagePipe()) page?: number
  ) {
    throw new NotImplementedException();
  }

  @Get('planets/:id')
  public getPlanetById(
    @Param('id', new ParseIntPipe()) id: number, 
  ) {
    throw new NotImplementedException();
  }
}
