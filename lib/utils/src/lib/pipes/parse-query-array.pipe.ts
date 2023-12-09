import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseQueryArrayPipe implements PipeTransform<string, string[]> {
  transform(value: string): string[] {
    return value?.split(',') ?? [];
  }
}
