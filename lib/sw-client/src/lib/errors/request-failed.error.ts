import { SWClientError } from './sw-client.error';

export class RequestFailedError extends SWClientError {
  override name = RequestFailedError.name;

  constructor(path: string, cause?: Error) {
    super(path);
    this.message = `Request for path "${this.path}" could not be sent! Cause: ${cause?.message}`;
  }
}