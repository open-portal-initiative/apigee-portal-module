import { expect, test } from "vitest";
import { PortalService, ApigeeApiProducts, Error } from "../src";

test("get apigee products from existant org and region", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let region = process.env.REGION ? process.env.REGION : "europe-west1";
  let service = new PortalService(org, region);
  return service
    .getProducts()
    .then((result: { data: ApigeeApiProducts; error: Error }) => {
      // console.log(JSON.stringify(result));
      expect(result.error).toEqual(null);
      expect(result.data).not.toBeNull();
    });
});
