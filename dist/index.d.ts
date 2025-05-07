import { ApigeeDeveloper, ApiHubApis, Error } from './interfaces.js';
export type { ApigeeDeveloper, ApiHubApis, Error } from './interfaces.js';
export declare class PortalService {
    private org;
    private region;
    constructor(org: string, region: string);
    getApis(filter?: string, pageSize?: number, pageToken?: string, org?: string, region?: string): Promise<[ApiHubApis, Error]>;
    getDeveloper(email: string): Promise<[ApigeeDeveloper, Error]>;
}
