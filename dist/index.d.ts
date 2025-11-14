import { ApigeeApiProducts, ApigeeDeveloper, ApigeeApp, ApiHubApi, ApiHubApiVersion, ApiHubApiVersionSpecContents, ApigeeAppKey, Error } from "./interfaces.js";
export type { ApigeeDeveloper, ApigeeApiProducts, ApigeeApiProduct, ApigeeApps, ApigeeApp, ApigeeAppKey, ApiHubApi, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error, } from "./interfaces.js";
export declare class PortalService {
    private org;
    private region;
    constructor(org?: string, region?: string);
    getApis(filter?: string, pageSize?: number, pageToken?: string, org?: string, region?: string): Promise<{
        data: ApiHubApi[];
        error: Error;
    }>;
    getApiVersions(apiName: string, filter?: string, pageSize?: number, pageToken?: string, org?: string, region?: string): Promise<{
        data: ApiHubApiVersion[];
        error: Error;
    }>;
    getApiVersion(apiVersion: string): Promise<{
        data: ApiHubApiVersion;
        error: Error;
    }>;
    getApiVersionSpecs(apiVersion: string): Promise<{
        data: ApiHubApiVersionSpecContents;
        error: Error;
    }>;
    getApiVersionSpecContents(apiVersionSpec: string): Promise<{
        data: ApiHubApiVersionSpecContents;
        error: Error;
    }>;
    createDeveloper(developer: ApigeeDeveloper): Promise<{
        data: ApigeeDeveloper;
        error: Error;
    }>;
    deleteDeveloper(email: string): Promise<{
        data: ApigeeDeveloper;
        error: Error;
    }>;
    getDeveloper(email: string): Promise<{
        data: ApigeeDeveloper;
        error: Error;
    }>;
    createApp(email: string, appName: string, products?: string[]): Promise<{
        data: ApigeeApp;
        error: Error;
    }>;
    deleteApp(email: string, appName: string): Promise<{
        data: ApigeeApp;
        error: Error;
    }>;
    addAppKeyProducts(email: string, appName: string, keyName: string, products: string[]): Promise<{
        data: ApigeeAppKey;
        error: Error;
    }>;
    removeAppKeyProduct(email: string, appName: string, keyName: string, product: string): Promise<{
        data: ApigeeAppKey;
        error: Error;
    }>;
    getApp(email: string, appName: string): Promise<{
        data: ApigeeApp;
        error: Error;
    }>;
    getApps(email: string): Promise<{
        data: ApigeeApp[];
        error: Error;
    }>;
    getProducts(): Promise<{
        data: ApigeeApiProducts;
        error: Error;
    }>;
}
