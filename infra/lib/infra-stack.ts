import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";
import { RemovalPolicy } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

const API_ID = "ClipApi";
const API_NAME = "clip-api-prod";
const API_PROPS = {
  restApiName: API_NAME,
  deployOptions: {
    stageName: "prod",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: ["OPTIONS", "POST"],
    allowHeaders: ["Content-Type"],
  },
};

const TABLE_NAME = "clip-inquiries-prod";
const TABLE_ID = "ClipInquiriesTable";

const LAMBDA_ID = "CreateInquiryLambda";
const LAMBDA_PROPS: nodeLambda.NodejsFunctionProps = {
  functionName: "clip-create-inquiry-prod",
  runtime: lambda.Runtime.NODEJS_22_X,
  entry: path.join(__dirname, "../../lambdas/create-inquiry/index.ts"),
  projectRoot: path.join(__dirname, "../.."),
  handler: "handler",
  environment: {
    TABLE_NAME,
  },
};

const TABLE_PROPS: dynamodb.TableProps = {
  tableName: TABLE_NAME,
  partitionKey: {
    name: "inquiryId",
    type: dynamodb.AttributeType.STRING,
  },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.RETAIN,
};

export class InfraStack extends cdk.Stack {
  public readonly inquiriesTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.inquiriesTable = new dynamodb.Table(this, TABLE_ID, TABLE_PROPS);

    const createInquiryLambda = new nodeLambda.NodejsFunction(
      this,
      LAMBDA_ID,
      LAMBDA_PROPS,
    );

    this.inquiriesTable.grantWriteData(createInquiryLambda);

    const api = new apigateway.RestApi(this, API_ID, API_PROPS);

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });

    const inquiries = api.root.addResource("inquiries");

    inquiries.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createInquiryLambda),
    );
  }
}
