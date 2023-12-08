export class SWClientError extends Error {
  override name: string = SWClientError.name;

  constructor(public readonly path: string) {
    super(`Generic SWClientError occurred for path "${path}".`);
  }
}