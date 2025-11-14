import { expect, test } from "vitest";
import {
  PortalService,
  ApigeeDeveloper,
  ApigeeApp,
  ApigeeAppKey,
  Error,
} from "../src";
import { error } from "console";

test("get nonexistant developer from nonexistant org", async () => {
  let service = new PortalService("", "");
  return service
    .getDeveloper("test@example.com")
    .then((result: { data: ApigeeDeveloper; error: Error }) => {
      //console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result.error) errorCode = result.error.code;
      expect(errorCode).toEqual(400);
    });
});

test("get nonexistant developer from existant org", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");
  return service
    .getDeveloper("test@example.com")
    .then((result: { data: ApigeeDeveloper; error: Error }) => {
      //console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result.error) errorCode = result.error.code;
      expect(errorCode).toEqual(404);
    });
});

test("create developer in an org", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let newDeveloper: ApigeeDeveloper = {
    email: "test@example.com",
    firstName: "Test",
    lastName: "Developer",
    userName: "test",
  };

  let service = new PortalService(org, "");
  return service
    .createDeveloper(newDeveloper)
    .then((result: { data: ApigeeDeveloper; error: Error }) => {
      // console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result[1]) {
        errorCode = result[1].error.code;
        console.log(JSON.stringify(result[1]));
      }
      expect(errorCode).toEqual(-1);
      expect(result.data.email).toEqual(newDeveloper.email);
    });
});

test("create developer app in an org", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  return service
    .createApp("test@example.com", "test-app")
    .then((result: { data: ApigeeApp; error: Error }) => {
      //console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result.error) {
        errorCode = result.error.code;
        console.log(JSON.stringify(result));
      }
      expect(errorCode).toEqual(-1);
      expect(result.data.name).toEqual("test-app");
    });
});

test("add product to developer app key", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  let appResult = await service.getApp("test@example.com", "test-app");
  let productResult = await service.getProducts();

  expect(productResult.data.apiProduct.length).greaterThan(0);
  expect(appResult.data.credentials).not.toBeNull();

  if (productResult.data.apiProduct.length > 0 && appResult.data.credentials) {
    let products: string[] = [productResult.data.apiProduct[0].name];
    let keyName = appResult.data.credentials[0].consumerKey ?? "";
    return service
      .addAppKeyProducts("test@example.com", "test-app", keyName, products)
      .then((result: { data: ApigeeAppKey; error: Error }) => {
        //console.log(JSON.stringify(result));
        let errorCode = -1;
        if (result[1]) {
          errorCode = result[1].error.code;
          console.log(JSON.stringify(result[1]));
        }
        expect(errorCode).toEqual(-1);
        expect(result.data.apiProducts?.length).toEqual(1);
      });
  }
});

test("remove product from developer app key", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  let appResult = await service.getApp("test@example.com", "test-app");

  expect(appResult.data.credentials).not.toBeNull();

  if (appResult.data.credentials) {
    let keyName = appResult.data.credentials[0].consumerKey ?? "";
    let apiProductName =
      appResult.data.credentials[0].apiProducts?.[0].apiproduct ?? "";
    return service
      .removeAppKeyProduct(
        "test@example.com",
        "test-app",
        keyName,
        apiProductName,
      )
      .then((result: { data: ApigeeAppKey; error: Error }) => {
        console.log(JSON.stringify(result));
        let errorCode = -1;
        if (result[1]) {
          errorCode = result[1].error.code;
          console.log(JSON.stringify(result[1]));
        }
        expect(errorCode).toEqual(-1);
        expect(result.data.apiProducts?.length).toEqual(0);
      });
  }
});

test("get developer apps", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";

  let service = new PortalService(org, "");
  return service
    .getApps("test@example.com")
    .then((result: { data: ApigeeApp[]; error: Error }) => {
      //console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result[1]) {
        errorCode = result[1].error.code;
        console.log(JSON.stringify(result[1]));
      }
      expect(result.data.length).toEqual(1);
      expect(errorCode).toEqual(-1);
    });
});

test("delete developer in an org", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");
  return service
    .deleteDeveloper("test@example.com")
    .then((result: { data: ApigeeDeveloper; error: Error }) => {
      // console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result[1]) {
        errorCode = result[1].error.code;
        console.log(JSON.stringify(result[1]));
      }
      expect(errorCode).toEqual(-1);
      expect(result.data.email).toEqual("test@example.com");
    });
});
