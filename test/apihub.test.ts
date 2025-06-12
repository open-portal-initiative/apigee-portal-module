import {expect, test} from "vitest";
import { PortalService, Error, ApiHubApis } from "../src";

test("get Api Hub apis from existant org and region", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service.getApis().then((result: [ApiHubApis, Error]) => {
    //console.log(JSON.stringify(result));
    expect(result[1]).toEqual(null);
  });
});