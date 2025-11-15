import { GoogleAuth } from "google-auth-library";
import {
  ApigeeApiProducts,
  ApigeeDeveloper,
  ApigeeApps,
  ApigeeApp,
  ApiHubApi,
  ApiHubApiVersion,
  ApiHubApiVersionSpecContents,
  ApigeeAppKey,
  Error,
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
  ApigeeAppKey,
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
  constructor(org: string = "", region: string = "") {
    this.org = org;
    this.region = region;
  }

  // returns a list of apis
  async getApis(
    filter: string = "",
    pageSize: number = 1000,
    pageToken: string = "",
    org: string = "",
    region: string = "",
  ): Promise<{ data: ApiHubApi[]; error: Error }> {
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
      let data = (await response.json()) as { apis: ApiHubApi[] };
      return { data: data.apis, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any apis.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  async getApi(
    apiName: string,
    org: string = "",
    region: string = "",
  ): Promise<{ data: ApiHubApi[]; error: Error }> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(
      `https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = await response.json();
      return { data: data, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find api" + apiName,
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  async getApiVersions(
    apiName: string,
    filter: string = "",
    pageSize: number = 1000,
    pageToken: string = "",
    org: string = "",
    region: string = "",
  ): Promise<{ data: ApiHubApiVersion[]; error: Error }> {
    let token = await auth.getAccessToken();
    let tempOrg = org ? org : this.org;
    let tempRegion = region ? region : this.region;
    let response = await fetch(
      `https://apihub.googleapis.com/v1/${apiName}/versions?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as { versions: ApiHubApiVersion[] };
      return { data: data.versions, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any versions.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  // returns a an api version object
  async getApiVersion(
    apiVersion: string,
  ): Promise<{ data: ApiHubApiVersion; error: Error }> {
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
      return { data: data, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find the API version.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  async getApiDeployment(
    apiDeployment: string,
  ): Promise<{ data: any; error: Error }> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apihub.googleapis.com/v1/${apiDeployment}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = await response.json();
      return { data: data, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find the API deployment.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  // returns the contents of a version spec
  async getApiVersionSpecs(
    apiVersion: string,
  ): Promise<{ data: ApiHubApiVersionSpecContents; error: Error }> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apihub.googleapis.com/v1/${apiVersion}/specs`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = await response.json();
      return { data: data, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any specs for the API version.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  // returns the contents of a version spec
  async getApiVersionSpecContents(
    apiVersionSpec: string,
  ): Promise<{ data: ApiHubApiVersionSpecContents; error: Error }> {
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
      return { data: data, error: undefined };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any spec for the API version.",
          status: "Not found",
        },
      };
    } else {
      let data = await response.json();
      console.error(
        `Error getApiVersionSpecContents: ${response.status} - ${response.statusText}`,
      );
      return { data: undefined, error: data.error };
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async createDeveloper(
    developer: ApigeeDeveloper,
  ): Promise<{ data: ApigeeDeveloper; error: Error }> {
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
      return { data: data, error: null };
    } else {
      console.error(
        `Error createDeveloper: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // deletes a developer object or an error object if the developer does not exist
  async deleteDeveloper(
    email: string,
  ): Promise<{ data: ApigeeDeveloper; error: Error }> {
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
      return { data: data, error: null };
    } else {
      console.error(
        `Error deleteDeveloper: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getDeveloper(
    email: string,
  ): Promise<{ data: ApigeeDeveloper; error: Error }> {
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
      return { data: data, error: null };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find the developer.",
          status: "Not found",
        },
      };
    } else {
      console.error(
        `Error getDeveloper: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // returns an app object or an error object
  async createApp(
    email: string,
    appName: string,
    products: string[] = [],
  ): Promise<{ data: ApigeeApp; error: Error }> {
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
          apiProducts: products,
        }),
      },
    );

    if (response.status === 201) {
      let data = (await response.json()) as ApigeeApp;
      return { data: data, error: null };
    } else {
      console.error(
        `Error createApp: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // deletes an app
  async deleteApp(
    email: string,
    appName: string,
  ): Promise<{ data: ApigeeApp; error: Error }> {
    let token = await auth.getAccessToken();
    let response = await fetch(
      `https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      let data = (await response.json()) as ApigeeApp;
      return { data: data, error: null };
    } else {
      console.error(
        `Error deleteApp: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // update app key products
  async addAppKeyProducts(
    email: string,
    appName: string,
    keyName: string,
    products: string[],
  ): Promise<{ data: ApigeeAppKey; error: Error }> {
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
      return { data: data, error: null };
    } else {
      console.error(
        `Error addAppKeyProducts: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // remove app key product
  async removeAppKeyProduct(
    email: string,
    appName: string,
    keyName: string,
    product: string,
  ): Promise<{ data: ApigeeAppKey; error: Error }> {
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
      return { data: data, error: null };
    } else {
      console.error(
        `Error removeAppKeyProduct: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getApp(
    email: string,
    appName: string,
  ): Promise<{ data: ApigeeApp; error: Error }> {
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
      return { data: data, error: null };
    } else if (response.status === 404) {
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find the app.",
          status: "Not found",
        },
      };
    } else {
      console.error(
        `Error getApp: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }

  // returns a developer object or an error object if the developer does not exist
  async getApps(email: string): Promise<{ data: ApigeeApp[]; error: Error }> {
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
      return { data: data.app, error: undefined };
    } else if (response.status === 404) {
      console.error(
        `Error getApps: ${response.status} - ${response.statusText}`,
      );
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any apps.",
          status: "Not found",
        },
      };
    } else {
      console.error(
        `Error getApps: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: undefined, error: data.error };
    }
  }

  // gets all of the products
  async getProducts(): Promise<{
    data: ApigeeApiProducts;
    error: Error;
  }> {
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
      return { data: data, error: null };
    } else if (response.status === 404) {
      console.error(
        `Error getProducts: ${response.status} - ${response.statusText}`,
      );
      return {
        data: undefined,
        error: {
          code: 404,
          message: "Could not find any apps.",
          status: "Not found",
        },
      };
    } else {
      console.error(
        `Error getProducts: ${response.status} - ${response.statusText}`,
      );
      let data = await response.json();
      return { data: null, error: data.error };
    }
  }
}
