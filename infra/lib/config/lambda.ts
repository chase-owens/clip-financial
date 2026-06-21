import { TABLE_NAME } from "./dynamodb";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";

export const CREATE_INQUIRY_LAMBDA_ID = "CreateInquiryLambda";

export const CREATE_INQUIRY_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-create-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/create-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
    EVENT_BUS_NAME: "clip-events-prod",
  },
};

export const GET_INQUIRIES_LAMBDA_ID = "GetInquiriesLambda";

export const GET_INQUIRIES_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-get-inquiries-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/get-inquiries/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
  },
};

export const GET_INQUIRY_LAMBDA_ID = "GetInquiryLambda";

export const GET_INQUIRY_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-get-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/get-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
  },
};

export const UPDATE_INQUIRY_LAMBDA_ID = "UpdateInquiryLambda";

export const UPDATE_INQUIRY_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-update-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/update-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
  },
};

export const GET_CONTENT_LAMBDA_ID = "GetContentLambda";

export const GET_CONTENT_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-get-content-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/get-content/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    CONTENT_BUCKET_NAME: "clip-content-prod",
    CONTENT_KEY: "data/root-content.json",
  },
};

export const UPDATE_CONTENT_LAMBDA_ID = "UpdateContentLambda";

export const UPDATE_CONTENT_LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-update-content-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/update-content/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    CONTENT_BUCKET_NAME: "clip-content-prod",
    CONTENT_KEY: "data/root-content.json",
  },
};

export const AUDIT_INQUIRY_LAMBDA_ID = "AuditInquiryLambda";

export const AUDIT_INQUIRY_LAMBDA_PROPS = {
  functionName: "clip-audit-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/audit-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME: "clip-audit-prod",
  },
};

export const EMAIL_INQUIRY_LAMBDA_ID = "EmailInquiryLambda";

export const EMAIL_INQUIRY_LAMBDA_PROPS = {
  functionName: "clip-email-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/email-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {},
};
