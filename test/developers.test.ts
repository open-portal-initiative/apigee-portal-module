import {expect, test} from "vitest";
import { PortalService, Error, ApigeeDeveloper, ApiHubApis } from "../src";

test("get nonexistant developer from nonexistant org", () => {
  let service = new PortalService("", "");
  return service.getDeveloper("test@example.com").then((result: [ApigeeDeveloper, Error]) => {
    console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) errorCode = result[1].error.code;
    expect(errorCode).toEqual(400);
  });
});

test("get nonexistant developer from existant org", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");
  return service.getDeveloper("test@example.com").then((result: [ApigeeDeveloper, Error]) => {
    console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) errorCode = result[1].error.code;
    expect(errorCode).toEqual(404);
  });
});

test("get Api Hub apis from existant org and region", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service.getApis().then((result: [ApiHubApis, Error]) => {
    console.log(JSON.stringify(result));
    expect(result[1]).toEqual(null);
  });
});