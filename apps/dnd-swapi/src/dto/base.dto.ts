import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ description: 'ISO8601 representation of the date at which this resource was created' })
  created: string;

  @ApiProperty({ description: 'ISO8601 representation of the date at which this resource was edited' })
  edited: string;

  @ApiProperty({ description: 'URL of this resource.' })
  url: string;
}