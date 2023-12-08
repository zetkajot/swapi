import { SWClientError } from './sw-client.error';

export class NoResponseError extends SWClientError {
  override name = NoResponseError.name;

  constructor(path: string, cause?: Error) {
    super(path);
    this.message = `Request for path "${this.path}" received no response! Cause: ${cause?.message}`;
  }
}