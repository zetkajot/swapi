import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { PaginatedDto } from './paginated.dto';

export class VehicleDto extends BaseDto {
  @ApiProperty({
    description:
      'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".',
  })
  name: string;
  @ApiProperty({
    description:
      'The model or official name of this vehicle. Such as "All-Terrain Attack Transport".',
  })
  model: string;
  @ApiProperty({
    description:
      'The class of this vehicle, such as "Wheeled" or "Repulsorcraft".',
  })
  vehicle_class: string;
  @ApiProperty({
    description:
      'The manufacturer of this vehicle. Comma separated if more than one.',
  })
  manufacturer: string;
  @ApiProperty({ description: 'The length of this vehicle in meters.' })
  length: string;
  @ApiProperty({
    description: 'The cost of this vehicle new, in Galactic Credits.',
  })
  cost_in_credits: string;
  @ApiProperty({
    description: 'The number of personnel needed to run or pilot this vehicle.',
  })
  crew: string;
  @ApiProperty({
    description:
      'The number of non-essential people this vehicle can transport.',
  })
  passengers: string;
  @ApiProperty({
    description: 'The maximum speed of this vehicle in the atmosphere.',
  })
  max_atmosphering_speed: string;
  @ApiProperty({
    description:
      'The maximum number of kilograms that this vehicle can transport.',
  })
  cargo_capacity: string;
  @ApiProperty({
    description:
      'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.',
  })
  consumables: string;
  @ApiProperty({
    description:
      'An array of Film URL Resources that this vehicle has appeared in.',
  })
  films: string[];
  @ApiProperty({
    description:
      'An array of People URL Resources that this vehicle has been piloted by.',
  })
  pilots: string[];
}

export class PaginatedVehicleDto extends PaginatedDto(VehicleDto) {}