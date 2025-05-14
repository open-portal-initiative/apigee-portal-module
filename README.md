# Apigee Portal Module
This NPM module provides a simple interface for TS/JS portals to use the Apigee X & Apigee API Hub APIs.

## Getting started

### Installation
```sh
npm install apigee-portal-module
```

### Usage
- The authentication and authorization to the Apigee & API Hub APIs are done through [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials)
```ts
import { PortalService, type ApiHubApiVersion } from "apigee-portal-module";

// create portalService instance for a GCP project and region where Apigee and API Hub are running
const portalService = new PortalService("YOUR_APIGEE_ORG", "YOUR_APIGEE_REGION");
// Get all APIs from API Hub that are tagged Public
const apigeeProductsResult = await portalService.getApis("target_user.enum_values.values.display_name:Public"); 
```