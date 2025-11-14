import { expect, test } from "vitest";
import {
  PortalService,
  ApiHubApi,
  ApiHubApiVersion,
  ApiHubApiVersionSpecContents,
  Error,
} from "../src";

test("Get Api Hub apis from existant org and region", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service.getApis().then(async (result) => {
    expect(result["error"]).toEqual(undefined);
    let apiHubApis = result as { data: ApiHubApi[]; error: Error };
    expect(apiHubApis.data.length).toBeGreaterThan(0);

    console.log(JSON.stringify(apiHubApis[0], null, 2));
  });
});
