var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleAuth } from "google-auth-library";
const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
});
export class PortalService {
    // constructor
    constructor(org = "", region = "") {
        // the apigee organization id
        this.org = "";
        // the region of api hub
        this.region = "";
        this.org = org;
        this.region = region;
    }
    // returns a list of apis
    getApis() {
        return __awaiter(this, arguments, void 0, function* (filter = "", pageSize = 1000, pageToken = "", org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data.apis, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any apis.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    getApi(apiName_1) {
        return __awaiter(this, arguments, void 0, function* (apiName, org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = yield response.json();
                return { data: data, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find api" + apiName,
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    getApiVersions(apiName_1) {
        return __awaiter(this, arguments, void 0, function* (apiName, filter = "", pageSize = 1000, pageToken = "", org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/${apiName}/versions?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data.versions, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any versions.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    // returns a an api version object
    getApiVersion(apiVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apihub.googleapis.com/v1/${apiVersion}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find the API version.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    getApiDeployment(apiDeployment) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apihub.googleapis.com/v1/${apiDeployment}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = yield response.json();
                return { data: data, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find the API deployment.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    // returns the contents of a version spec
    getApiVersionSpecs(apiVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apihub.googleapis.com/v1/${apiVersion}/specs`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = yield response.json();
                return { data: data, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any specs for the API version.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    // returns the contents of a version spec
    getApiVersionSpecContents(apiVersionSpec) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apihub.googleapis.com/v1/${apiVersionSpec}:contents`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: undefined };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any spec for the API version.",
                        status: "Not found",
                    },
                };
            }
            else {
                let data = yield response.json();
                console.error(`Error getApiVersionSpecContents: ${response.status} - ${response.statusText}`);
                return { data: undefined, error: data.error };
            }
        });
    }
    // returns a developer object or an error object if the developer does not exist
    createDeveloper(developer) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(developer),
            });
            if (response.status === 201) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error createDeveloper: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // deletes a developer object or an error object if the developer does not exist
    deleteDeveloper(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error deleteDeveloper: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // returns a developer object or an error object if the developer does not exist
    getDeveloper(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find the developer.",
                        status: "Not found",
                    },
                };
            }
            else {
                console.error(`Error getDeveloper: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // returns an app object or an error object
    createApp(email_1, appName_1) {
        return __awaiter(this, arguments, void 0, function* (email, appName, products = []) {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: appName,
                    apiProducts: products,
                }),
            });
            if (response.status === 201) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error createApp: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // deletes an app
    deleteApp(email, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error deleteApp: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // update app key products
    addAppKeyProducts(email, appName, keyName, products) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}/keys/${keyName}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiProducts: products,
                }),
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error addAppKeyProducts: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // remove app key product
    removeAppKeyProduct(email, appName, keyName, product) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}/keys/${keyName}/apiproducts/${product}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else {
                console.error(`Error removeAppKeyProduct: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // returns a developer object or an error object if the developer does not exist
    getApp(email, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps/${appName}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else if (response.status === 404) {
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find the app.",
                        status: "Not found",
                    },
                };
            }
            else {
                console.error(`Error getApp: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
    // returns a developer object or an error object if the developer does not exist
    getApps(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}/apps?expand=true`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data.app, error: undefined };
            }
            else if (response.status === 404) {
                console.error(`Error getApps: ${response.status} - ${response.statusText}`);
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any apps.",
                        status: "Not found",
                    },
                };
            }
            else {
                console.error(`Error getApps: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: undefined, error: data.error };
            }
        });
    }
    // gets all of the products
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/apiproducts?expand=true`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                let data = (yield response.json());
                return { data: data, error: null };
            }
            else if (response.status === 404) {
                console.error(`Error getProducts: ${response.status} - ${response.statusText}`);
                return {
                    data: undefined,
                    error: {
                        code: 404,
                        message: "Could not find any apps.",
                        status: "Not found",
                    },
                };
            }
            else {
                console.error(`Error getProducts: ${response.status} - ${response.statusText}`);
                let data = yield response.json();
                return { data: null, error: data.error };
            }
        });
    }
}
