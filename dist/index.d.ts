import { ApigeeApiProducts, ApigeeDeveloper, ApigeeApps, ApigeeApp, ApiHubApis, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error, ApigeeAppKey } from './interfaces.js';
export type { ApigeeDeveloper, ApigeeApiProducts, ApigeeApiProduct, ApigeeApps, ApigeeApp, ApiHubApis, ApiHubApi, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error } from './interfaces.js';
export declare class PortalService {
    private org;
    private region;
    constructor(org: string, region: string);
    getApis(filter?: string, pageSize?: number, pageToken?: string, org?: string, region?: string): Promise<[ApiHubApis, Error]>;
    getApiVersion(apiName: string, apiVersion: string, org?: string, region?: string): Promise<[ApiHubApiVersion, Error]>;
    getApiVersionSpecContents(apiName: string, apiVersion: string, specName: string, org?: string, region?: string): Promise<[ApiHubApiVersionSpecContents, Error]>;
    createDeveloper(developer: ApigeeDeveloper): Promise<[ApigeeDeveloper, Error]>;
    deleteDeveloper(email: string): Promise<[ApigeeDeveloper, Error]>;
    getDeveloper(email: string): Promise<[ApigeeDeveloper, Error]>;
    createApp(email: string, appName: string): Promise<[ApigeeApp, Error]>;
    addAppKeyProducts(email: string, appName: string, keyName: string, products: string[]): Promise<[ApigeeAppKey, Error]>;
    removeAppKeyProduct(email: string, appName: string, keyName: string, product: string): Promise<[ApigeeAppKey, Error]>;
    getApp(email: string, appName: string): Promise<[ApigeeApp, Error]>;
    getApps(email: string): Promise<[ApigeeApps, Error]>;
    getProducts(): Promise<[ApigeeApiProducts, Error]>;
}
