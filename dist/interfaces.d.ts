export interface ApigeeDeveloper {
    developerId?: string;
    organizationName?: string;
    createdAt?: string;
    lastModifiedAt?: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    status?: string;
    apps?: string[];
    attributes?: KeyValue[];
    error?: Error;
}
export interface ApigeeApiProducts {
    apiProduct: ApigeeApiProduct[];
}
export interface ApigeeApiProduct {
    name: string;
    displayName: string;
    description: string;
    approvalType: string;
    attributes: KeyValue[];
}
export interface ApigeeApps {
    app: ApigeeApp[];
    error?: Error;
}
export interface ApigeeApp {
    appId: string;
    name: string;
    status?: string;
    callbackUrl?: string;
    createdAt?: string;
    credentials?: ApigeeAppKey[];
    apiProducts?: string[];
    error?: Error;
    attributes: KeyValue[];
}
export interface ApigeeAppKey {
    consumerKey?: string;
    consumerSecret?: string;
    issuedAt?: string;
    expiresAt?: string;
    scopes?: string[];
    status?: string;
    apiProducts?: ApigeeApiProductName[];
}
export interface ApigeeApiProductName {
    apiproduct: string;
    status: string;
}
export interface ApigeeAccessToken {
    access_token: string;
}
export interface ApiHubApis {
    apis: ApiHubApi[];
}
export interface ApiHubApi {
    name: string;
    displayName: string;
    description: string;
    documentation: {
        externalUri: string;
    };
    owner: {
        displayName: string;
        email: string;
    };
    versions: string[];
    createTime: string;
    updateTime: string;
    targetUser: ApiHubAttribute;
    team: ApiHubAttribute;
    businessUnit: ApiHubAttribute;
    maturityLevel: ApiHubAttribute;
    apiStyle: ApiHubAttribute;
    attributes: {
        [key: string]: ApiHubAttribute;
    };
}
export interface ApiHubApiVersion {
    name: string;
    displayName: string;
    description: string;
    createTime: string;
    updateTime: string;
    documentation?: {
        externalUri: string;
    };
    specs?: string[];
    apiOperations?: string[];
    definitions?: string[];
    deployments?: string[];
    attributes?: {
        [key: string]: ApiHubAttribute;
    };
}
export interface ApiHubApiVersionSpecContents {
    contents: string;
    mimeType: string;
}
export interface ApiHubAttribute {
    attribute: string;
    enumValues: {
        values: ApiHubAttributeValue[];
    };
}
export interface ApiHubAttributeValue {
    id: string;
    displayName: string;
    description: string;
    immutable: boolean;
}
export interface KeyValue {
    name: string;
    value: string;
}
export interface Error {
    error: ErrorDetail;
}
export interface ErrorDetail {
    code: number;
    message: string;
    status: string;
}
