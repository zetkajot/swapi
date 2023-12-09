import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { PaginatedDto } from './paginated.dto';

export class SpeciesDto extends BaseDto {
  @ApiProperty({ description: 'The name of this species.' })
  name: string;
  @ApiProperty({
    description:
      'The classification of this species, such as "mammal" or "reptile".',
  })
  classification: string;
  @ApiProperty({
    description: 'The designation of this species, such as "sentient".',
  })
  designation: string;
  @ApiProperty({
    description: 'The average height of this species in centimeters.',
  })
  average_height: string;
  @ApiProperty({
    description: 'The average lifespan of this species in years.',
  })
  average_lifespan: string;
  @ApiProperty({
    description:
      'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.',
  })
  eye_colors: string;
  @ApiProperty({
    description:
      'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.',
  })
  hair_colors: string;
  @ApiProperty({
    description:
      'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.',
  })
  skin_colors: string;
  @ApiProperty({ description: 'The language commonly spoken by this species.' })
  language: string;
  @ApiProperty({
    description:
      'The URL of a planet resource, a planet that this species originates from.',
  })
  homeworld: string;
  @ApiProperty({
    description:
      'An array of People URL Resources that are a part of this species.',
  })
  people: string[];
  @ApiProperty({
    description:
      'An array of Film URL Resources that this species has appeared in.',
  })
  films: string[];
}

export class PaginatedSpeciesDto extends PaginatedDto(SpeciesDto) {}