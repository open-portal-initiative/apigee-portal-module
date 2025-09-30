import { GoogleAuth } from "google-auth-library";
import {
  ApigeeApiProducts,
  ApigeeDeveloper,
  ApigeeApps,
  ApigeeApp,
  ApiHubApi,
  ApiHubApis,
  ApiHubApiVersion,
  ApiHubApiVersionSpecContents,
  Error,
  ApigeeAppKey,
} from "./interfaces.js";
const auth = new GoogleAuth({
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

export type {
  ApigeeDeveloper,
  ApigeeApiProducts,
  ApigeeApiProduct,
  ApigeeApps,
  ApigeeApp,
  ApiHubApis,
  ApiHubApi,
  ApiHubApiVersion,
  ApiHubApiVersionSpecContents,
  Error,
} from "./interfaces.js";

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
  async getApis(
    filter: string = "",
    pageSize: number = 50,
    pageToken: string = "",
    org: string = "",
    region: string = "",
  ): Promise<ApiHubApi[] | Error> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(
      `https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApiHubApis;
      return data.apis;
    } else {
      let data = (await response.json()) as Error;
      console.log(data.error.code.toString() + " - " + data.error.message);
      return data;
    }
  }

  // returns a an api version object
  async getApiVersion(apiVersion: string): Promise<ApiHubApiVersion | Error> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apihub.googleapis.com/v1/${apiVersion}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApiHubApiVersion;
      return data;
    } else {
      let data = (await response.json()) as Error;
      return data;
    }
  }

  // returns the contents of a version spec
  async getApiVersionSpecContents(
    apiVersionSpec: string,
  ): Promise<ApiHubApiVersionSpecContents | Error> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apihub.googleapis.com/v1/${apiVersionSpec}:contents`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApiHubApiVersionSpecContents;
      return data;
    } else {
      let data = (await response.json()) as Error;
      return data;
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async createDeveloper(
    developer: ApigeeDeveloper,
  ): Promise<[ApigeeDeveloper, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(developer),
      },
    );

    if (response.status === 201) {
      let data = (await response.json()) as ApigeeDeveloper;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // deletes a developer object or an error object if the developer does not exist
  async deleteDeveloper(email: string): Promise<[ApigeeDeveloper, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeDeveloper;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getDeveloper(email: string): Promise<[ApigeeDeveloper, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeDeveloper;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // returns an app object or an error object if the developer does not exist
  async createApp(email: string, appName: string): Promise<[ApigeeApp, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: appName,
          apiProducts: [],
        }),
      },
    );

    if (response.status === 201) {
      let data = (await response.json()) as ApigeeApp;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // update app key products
  async addAppKeyProducts(
    email: string,
    appName: string,
    keyName: string,
    products: string[],
  ): Promise<[ApigeeAppKey, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}/keys/${keyName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiProducts: products,
        }),
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeAppKey;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // remove app key product
  async removeAppKeyProduct(
    email: string,
    appName: string,
    keyName: string,
    product: string,
  ): Promise<[ApigeeAppKey, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}/keys/${keyName}/apiproducts/${product}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeAppKey;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getApp(email: string, appName: string): Promise<[ApigeeApp, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeApp;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getApps(email: string): Promise<[ApigeeApps, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps?expand=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeApps;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }

  // gets all of the products
  async getProducts(): Promise<[ApigeeApiProducts, Error]> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/apiproducts?expand=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeApiProducts;
      return [data, null];
    } else {
      let data = (await response.json()) as Error;
      return [null, data];
    }
  }
}
