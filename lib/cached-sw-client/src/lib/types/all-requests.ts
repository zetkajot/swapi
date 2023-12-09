import { SWClientService } from '@self/sw-client';

export type AllRequests = Parameters<SWClientService[keyof SWClientService]>;
