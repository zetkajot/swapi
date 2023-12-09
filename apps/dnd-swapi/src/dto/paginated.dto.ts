import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

interface BarePaginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export function PaginatedDto<T>(ResultType: Type<T>): Type<BarePaginated<T>> {
  class Paginated<T> {
    @ApiProperty({
      description: 'Number of results returned for this request',
    })
    count: number;
    @ApiProperty({
      description: 'URL to the next results page or null if no more results are available',
      nullable: true,
    })
    next: string | null;
    @ApiProperty({
      description: 'URL to the previous results page or null if it is the first page',
      nullable: true,
    })
    previous: string | null;
    @ApiProperty({
      description: 'Array of results',
      type: [ResultType],
    })
    results: T[];
  }
  return Paginated;
}