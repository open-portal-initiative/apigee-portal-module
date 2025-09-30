import { expect, test } from "vitest";
import {
  PortalService,
  Error,
  ApiHubApi,
  ApiHubApiVersion,
  ApiHubApiVersionSpecContents,
} from "../src";

test("Get Api Hub apis from existant org and region", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service.getApis().then(async (result) => {
    expect(result["error"]).toEqual(undefined);
    let apiHubApis = result as ApiHubApi[];
    expect(apiHubApis.length).toBeGreaterThan(0);

    console.log(JSON.stringify(apiHubApis[0], null, 2));

    return service
      .getApiVersion(apiHubApis[0].versions[0])
      .then(async (versionResult) => {
        expect(versionResult["error"]).toEqual(undefined);
        console.log(JSON.stringify(versionResult, null, 2));

        let apiVersion = versionResult as ApiHubApiVersion;

        if (apiVersion.specs)
          return service
            .getApiVersionSpecContents(apiVersion.specs[0])
            .then(async (specResult) => {
              expect(specResult["error"]).toEqual(undefined);
              let apiSpec = specResult as ApiHubApiVersionSpecContents;
              let specContents = atob(apiSpec.contents);
              //console.log(apiSpec);
            });
      });
  });
});
