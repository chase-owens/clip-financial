import { TABLE_NAME } from "./dynamodb";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";

export const LAMBDA_ID = "CreateInquiryLambda";
export const LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-create-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../../lambdas/create-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
  },
};
