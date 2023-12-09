import {
  ArgumentsHost,
  Catch,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  InvalidResponseError,
  NoResponseError,
  RequestFailedError,
  SWClientError,
} from '@self/sw-client';

@Catch(SWClientError)
export class SWClientExceptionsFilter extends BaseExceptionFilter {
  override catch(exception: SWClientError, host: ArgumentsHost) {
    let error: HttpException;
    if (exception instanceof InvalidResponseError) {
      error =this.handleInvalidResponseCodeError(exception);
    } else if (exception instanceof RequestFailedError) {
      error = this.handleRequestFailedError(exception);
    } else if (exception instanceof NoResponseError) {
      error = this.handleNoResponseError(exception);
    } else {
      Logger.error(
        `Unknown SWClientError ${exception.name} for "${exception.path}": ${exception.message}`
      );
      error = new InternalServerErrorException();
    }
    super.catch(error, host);
  }

  private handleInvalidResponseCodeError(err: InvalidResponseError) {
    if (err.responseStatus === 404) {
      Logger.debug(`SW Client Not Found for path ${err.path}`);
      return new NotFoundException();
    } else {
      Logger.error(
        `SW Client Invalid response code for path "${err.path}": ${err.responseStatus}. Message: ${err.message}`
      );
      return new InternalServerErrorException();
    }
  }

  private handleRequestFailedError(err: RequestFailedError) {
    Logger.error(
      `SW Client Request Failed for path "${err.path}": ${err.message}`
    );
    return new InternalServerErrorException();
  }

  private handleNoResponseError(err: NoResponseError) {
    Logger.error(
      `SW CLient no response error for path "${err.path}": ${err.message}`
    );
    return new InternalServerErrorException();
  }
}
