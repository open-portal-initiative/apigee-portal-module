import {expect, test} from "vitest";
import { PortalService, Error, ApigeeDeveloper, ApiHubApis, ApigeeApps, ApigeeApp } from "../src";
import { error } from "console";
import { ApigeeApiProducts, ApigeeAppKey } from "../src/interfaces";

test("get nonexistant developer from nonexistant org", () => {
  let service = new PortalService("", "");
  return service.getDeveloper("test@example.com").then((result: [ApigeeDeveloper, Error]) => {
    //console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) errorCode = result[1].error.code;
    expect(errorCode).toEqual(400);
  });
});

test("get nonexistant developer from existant org", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");
  return service.getDeveloper("test@example.com").then((result: [ApigeeDeveloper, Error]) => {
    //console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) errorCode = result[1].error.code;
    expect(errorCode).toEqual(404);
  });
});

test("create developer in an org", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let newDeveloper: ApigeeDeveloper = {
    email: "test@example.com",
    firstName: "Test",
    lastName: "Developer",
    userName: "test"
  };

  let service = new PortalService(org, "");
  return service.createDeveloper(newDeveloper).then((result: [ApigeeDeveloper, Error]) => {

    // console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) {
      errorCode = result[1].error.code;
      console.log(JSON.stringify(result[1]));
    }
    expect(errorCode).toEqual(-1);
    expect(result[0].email).toEqual(newDeveloper.email);
  });
});

test("create developer app in an org", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  return service.createApp("test@example.com", "test-app").then((result: [ApigeeApp, Error]) => {

    //console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) {
      errorCode = result[1].error.code;
      console.log(JSON.stringify(result[1]));
    }
    expect(errorCode).toEqual(-1);
    expect(result[0].name).toEqual("test-app");
  });
});

test("add product to developer app key", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  let appResult = await service.getApp("test@example.com", "test-app");
  let productResult = await service.getProducts();

  expect(productResult[0].apiProduct.length).greaterThan(0);
  expect(appResult[0].credentials).not.toBeNull();

  if (productResult[0].apiProduct.length > 0 && appResult[0].credentials) {
    
    let products: string[] = [
      productResult[0].apiProduct[0].name
    ]
    let keyName = appResult[0].credentials[0].consumerKey ?? "";
    return service.addAppKeyProducts("test@example.com", "test-app", keyName, products).then((result: [ApigeeAppKey, Error]) => {
      //console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result[1]) {
        errorCode = result[1].error.code;
        console.log(JSON.stringify(result[1]));
      }
      expect(errorCode).toEqual(-1);
      expect(result[0].apiProducts?.length).toEqual(1);
    });
  }
});

test("remove product from developer app key", async () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");

  let appResult = await service.getApp("test@example.com", "test-app");

  expect(appResult[0].credentials).not.toBeNull();

  if (appResult[0].credentials) {
    let keyName = appResult[0].credentials[0].consumerKey ?? "";
    let apiProductName = appResult[0].credentials[0].apiProducts?.[0].apiproduct ?? "";
    return service.removeAppKeyProduct("test@example.com", "test-app", keyName, apiProductName).then((result: [ApigeeAppKey, Error]) => {
      console.log(JSON.stringify(result));
      let errorCode = -1;
      if (result[1]) {
        errorCode = result[1].error.code;
        console.log(JSON.stringify(result[1]));
      }
      expect(errorCode).toEqual(-1);
      expect(result[0].apiProducts?.length).toEqual(0);
    });
  }
});

test("get developer apps", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";

  let service = new PortalService(org, "");
  return service.getApps("test@example.com").then((result: [ApigeeApps, Error]) => {

    //console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) {
      errorCode = result[1].error.code;
      console.log(JSON.stringify(result[1]));
    }
    expect(result[0].app.length).toEqual(1);
    expect(errorCode).toEqual(-1);
  });
});

test("delete developer in an org", () => {
  let org = process.env.GCLOUD_PROJECT ? process.env.GCLOUD_PROJECT : "";
  let service = new PortalService(org, "");
  return service.deleteDeveloper("test@example.com").then((result: [ApigeeDeveloper, Error]) => {
    // console.log(JSON.stringify(result));
    let errorCode = -1;
    if (result[1]) {
      errorCode = result[1].error.code;
      console.log(JSON.stringify(result[1]));
    }
    expect(errorCode).toEqual(-1);
    expect(result[0].email).toEqual("test@example.com");
  });
});