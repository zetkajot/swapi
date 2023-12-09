import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { PaginatedDto } from './paginated.dto';

export class PlanetDto extends BaseDto {
  @ApiProperty({ description: 'The name of this planet.' })
  name: string;
  @ApiProperty({ description: 'The diameter of this planet in kilometers.' })
  diameter: string;
  @ApiProperty({
    description:
      'The number of standard hours it takes for this planet to complete a single rotation on its axis.',
  })
  rotation_period: string;
  @ApiProperty({
    description:
      'The number of standard days it takes for this planet to complete a single orbit of its local star.',
  })
  orbital_period: string;
  @ApiProperty({
    description:
      'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.',
  })
  gravity: string;
  @ApiProperty({
    description:
      'The average population of sentient beings inhabiting this planet.',
  })
  population: string;
  @ApiProperty({
    description: 'The climate of this planet. Comma separated if diverse.',
  })
  climate: string;
  @ApiProperty({
    description: 'The terrain of this planet. Comma separated if diverse.',
  })
  terrain: string;
  @ApiProperty({
    description:
      'The percentage of the planet surface that is naturally occurring water or bodies of water.',
  })
  surface_water: string;
  @ApiProperty({
    description: 'An array of People URL Resources that live on this planet.',
  })
  residents: string[];
  @ApiProperty({
    description:
      'An array of Film URL Resources that this planet has appeared in.',
  })
  films: string[];
}

export class PaginatedPlanetDto extends PaginatedDto<PlanetDto>(PlanetDto) {}