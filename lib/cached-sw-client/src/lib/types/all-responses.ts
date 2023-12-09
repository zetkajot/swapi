import { SWClientService } from '@self/sw-client';

export type AllResponses = Awaited<ReturnType<SWClientService[keyof SWClientService]>>;
