import { ApigeeDeveloper, ApiHubApis, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error } from './interfaces.js';
export type { ApigeeDeveloper, ApiHubApis, ApiHubApi, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error } from './interfaces.js';
export declare class PortalService {
    private org;
    private region;
    constructor(org: string, region: string);
    getApis(filter?: string, pageSize?: number, pageToken?: string, org?: string, region?: string): Promise<[ApiHubApis, Error]>;
    getApiVersion(apiName: string, apiVersion: string, org?: string, region?: string): Promise<[ApiHubApiVersion, Error]>;
    getApiVersionSpecContents(apiName: string, apiVersion: string, specName: string, org?: string, region?: string): Promise<[ApiHubApiVersionSpecContents, Error]>;
    getDeveloper(email: string): Promise<[ApigeeDeveloper, Error]>;
}
