import { AxiosResponse } from 'axios';
import { SWClientError } from './sw-client.error';

export class InvalidResponseError extends SWClientError {
  override name = InvalidResponseError.name;
  public readonly responseStatus: number;

  constructor(path: string, cause: AxiosResponse) {
    super(path);
    this.responseStatus = cause.status;
    this.message = `Request for path "${this.path}" received response with unexpected code! Status: ${this.responseStatus}, Response body: ${cause.data}`;
  }
}
