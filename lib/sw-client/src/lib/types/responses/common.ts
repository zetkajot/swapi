export type CommonResponse<T extends object> = T & {
  url: string;
  created: string;
  edited: string;
}