import * as apigateway from "aws-cdk-lib/aws-apigateway";

export const API_ID = "ClipApi";
export const API_NAME = "clip-api-prod";
export const API_PROPS = {
  restApiName: API_NAME,
  deployOptions: {
    stageName: "prod",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: ["OPTIONS", "POST", "GET", "PATCH"],
    allowHeaders: ["Content-Type"],
  },
};
