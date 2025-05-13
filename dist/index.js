var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleAuth } from 'google-auth-library';
const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
});
export class PortalService {
    // constructor
    constructor(org, region) {
        // the apigee organization id
        this.org = "";
        // the region of api hub
        this.region = "";
        this.org = org;
        this.region = region;
    }
    // returns a list of apis
    getApis() {
        return __awaiter(this, arguments, void 0, function* (filter = "", pageSize = 50, pageToken = "", org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis?filter=${filter}&pageSize=${pageSize}&pageToken=${pageToken}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                let data = yield response.json();
                return [data, null];
            }
            else {
                let data = yield response.json();
                return [null, data];
            }
        });
    }
    // returns a an api version object
    getApiVersion(apiName_1, apiVersion_1) {
        return __awaiter(this, arguments, void 0, function* (apiName, apiVersion, org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}/versions/${apiVersion}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                let data = yield response.json();
                return [data, null];
            }
            else {
                let data = yield response.json();
                return [null, data];
            }
        });
    }
    // returns the contents of a version spec
    getApiVersionSpecContents(apiName_1, apiVersion_1, specName_1) {
        return __awaiter(this, arguments, void 0, function* (apiName, apiVersion, specName, org = "", region = "") {
            let token = yield auth.getAccessToken();
            let tempOrg = org ? org : this.org;
            let tempRegion = region ? region : this.region;
            let response = yield fetch(`https://apihub.googleapis.com/v1/projects/${tempOrg}/locations/${tempRegion}/apis/${apiName}/versions/${apiVersion}/specs/${specName}:contents`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                let data = yield response.json();
                return [data, null];
            }
            else {
                let data = yield response.json();
                return [null, data];
            }
        });
    }
    // returns a developer object or an error object if the developer does not exist
    getDeveloper(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield auth.getAccessToken();
            let response = yield fetch(`https://apigee.googleapis.com/v1/organizations/${this.org}/developers/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                let data = yield response.json();
                return [data, null];
            }
            else {
                let data = yield response.json();
                return [null, data];
            }
        });
    }
}
