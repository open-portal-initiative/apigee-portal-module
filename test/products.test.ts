import {expect, test} from "vitest";
import { PortalService, Error, ApigeeApiProducts } from "../src";

test("get apigee products from existant org and region", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service.getProducts().then((result: [ApigeeApiProducts, Error]) => {
    // console.log(JSON.stringify(result));
    expect(result[1]).toEqual(null);
    expect(result[0]).not.toBeNull();
  });
});