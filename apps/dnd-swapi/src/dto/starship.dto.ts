import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { PaginatedDto } from './paginated.dto';

export class StarshipDto extends BaseDto {
  @ApiProperty({
    description:
      'The name of this starship. The common name, such as "Death Star".',
  })
  name: string;
  @ApiProperty({
    description:
      'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".',
  })
  model: string;
  @ApiProperty({
    description:
      'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"',
  })
  starship_class: string;
  @ApiProperty({
    description:
      'The manufacturer of this starship. Comma separated if more than one.',
  })
  manufacturer: string;
  @ApiProperty({
    description: 'The cost of this starship new, in galactic credits.',
  })
  cost_in_credits: string;
  @ApiProperty({ description: 'The length of this starship in meters.' })
  length: string;
  @ApiProperty({
    description:
      'The number of personnel needed to run or pilot this starship.',
  })
  crew: string;
  @ApiProperty({
    description:
      'The number of non-essential people this starship can transport.',
  })
  passengers: string;
  @ApiProperty({
    description:
      'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.',
  })
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'The class of this starships hyperdrive.' })
  hyperdrive_rating: string;
  @ApiProperty({
    description:
      'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.',
  })
  MGLT: string;
  @ApiProperty({
    description:
      'The maximum number of kilograms that this starship can transport.',
  })
  cargo_capacity: string;
  @ApiProperty({
    description:
      'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.',
  })
  consumables: string;
  @ApiProperty({
    description:
      'An array of Film URL Resources that this starship has appeared in.',
  })
  films: string[];
  @ApiProperty({
    description:
      'An array of People URL Resources that this starship has been piloted by.',
  })
  pilots: string[];
}

export class PaginatedStarshipDto extends PaginatedDto(StarshipDto) {}