export interface ApigeeDeveloper {
  developerId?: string;
  organizationName: string;
  createdAt: string;
  lastModifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  status?: string;
  apps: string[];
  attributes: KeyValue[];
  error?: Error;
}

export interface ApiHubApis {
  apis: ApiHubApi[];
}

export interface ApiHubApi {
  name: string,
  displayName: string,
  description: string,
  documentation: {externalUri: string},
  owner: {displayName: string, email: string},
  versions: string[],
  createTime: string,
  updateTime: string,
  targetUser: ApiHubAttribute,
  team: ApiHubAttribute,
  businessUnit: ApiHubAttribute,
  maturityLevel: ApiHubAttribute,
  apiStyle: ApiHubAttribute,
  attributes: {[key: string]: ApiHubAttribute}
}

export interface ApiHubAttribute {
  attribute: string,
  enumValues: {
    values: ApiHubAttributeValue[]
  }
}

export interface ApiHubAttributeValue {
  id: string,
  displayName: string,
  description: string,
  immutable: boolean
}

export interface KeyValue {
  name: string;
  value: string;
}

export interface Error {
  error: ErrorDetail
}

export interface ErrorDetail {
  code: number;
  message: string;
  status: string;
}