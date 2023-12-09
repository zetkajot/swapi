import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, z } from 'zod';

@Injectable()
export class ParseQueryPagePipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string): number | undefined {
    const parseResult = z.coerce
      .number()
      .int()
      .nonnegative()
      .optional()
      .safeParse(value);
    if (!parseResult.success) {
      throw new BadRequestException(
        `Invalid "page" query param value: ${
          (parseResult as { error: ZodError }).error.flatten().formErrors.join('; ')
        }`
      );
    } else {
      return parseResult.data;
    }
  }
}
