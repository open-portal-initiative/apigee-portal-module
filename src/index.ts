import { GoogleAuth } from 'google-auth-library';
import { ApigeeDeveloper, ApiHubApi, ApiHubApis, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error } from './interfaces.js';
const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform'
});

export type { ApigeeDeveloper, ApiHubApis, ApiHubApiVersion, ApiHubApiVersionSpecContents, Error } from './interfaces.js';

export class PortalService {

  // the apigee organization id
  private org: string = "";
  // the region of api hub
  private region: string = "";

  // constructor
  constructor(org: string, region: string) {
    this.org = org;
    this.region = region;
  }

  // returns a list of apis
  async getApis(filter: string = "", pageSize: number = 50, pageToken: string = "", org: string = "", region: string = ""): Promise<[ApiHubApis, Error]> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      let data = await response.json() as ApiHubApis;
      return [data, null];
    } else {
      let data = await response.json() as Error;
      return [null, data];
    }
  }

  // returns a an api version object
  async getApiVersion(apiName: string, apiVersion: string, org: string = "", region: string = ""): Promise<[ApiHubApiVersion, Error]> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}/versions/${apiVersion}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      let data = await response.json() as ApiHubApiVersion;
      return [data, null];
    } else {
      let data = await response.json() as Error;
      return [null, data];
    }
  }

  // returns the contents of a version spec
  async getApiVersionSpecContents(apiName: string, apiVersion: string, specName: string, org: string = "", region: string = ""): Promise<[ApiHubApiVersionSpecContents, Error]> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}/versions/${apiVersion}/specs/${specName}:contents`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      let data = await response.json() as ApiHubApiVersionSpecContents;
      return [data, null];
    } else {
      let data = await response.json() as Error;
      return [null, data];
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getDeveloper(email: string): Promise<[ApigeeDeveloper, Error]>  {
    let token = await auth.getAccessToken();
    let response = await fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      let data = await response.json() as ApigeeDeveloper;
      return [data, null];
    } else {
      let data = await response.json() as Error;
      return [null, data];
    }
  }
}