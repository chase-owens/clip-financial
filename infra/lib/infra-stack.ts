import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { API_ID, API_PROPS } from "./config/api";
import { TABLE_ID, TABLE_PROPS } from "./config/dynamodb";
import {
  CREATE_INQUIRY_LAMBDA_ID,
  CREATE_INQUIRY_LAMBDA_PROPS,
  GET_INQUIRIES_LAMBDA_ID,
  GET_INQUIRIES_LAMBDA_PROPS,
  UPDATE_INQUIRY_LAMBDA_ID,
  UPDATE_INQUIRY_LAMBDA_PROPS,
} from "./config/lambda";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { createBasicAuthFunctionCode } from "./functions/basic-auth";
import { ADMIN_USERNAME } from "./config/cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import "dotenv/config";

export class InfraStack extends cdk.Stack {
  public readonly inquiriesTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is required");
    }

    const basicAuthFunction = new cloudfront.Function(
      this,
      "ClipAdminBasicAuthFunction",
      {
        functionName: "clip-admin-basic-auth",
        code: cloudfront.FunctionCode.fromInline(
          createBasicAuthFunctionCode(ADMIN_USERNAME, adminPassword),
        ),
      },
    );

    const adminBucket = new s3.Bucket(this, "ClipAdminBucket", {
      bucketName: "clip-admin-prod",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    const adminDistribution = new cloudfront.Distribution(
      this,
      "ClipAdminDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(adminBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [
            {
              function: basicAuthFunction,
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            },
          ],
        },
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      },
    );

    this.inquiriesTable = new dynamodb.Table(this, TABLE_ID, TABLE_PROPS);

    const createInquiryLambda = new nodeLambda.NodejsFunction(
      this,
      CREATE_INQUIRY_LAMBDA_ID,
      CREATE_INQUIRY_LAMBDA_PROPS,
    );

    const getInquiriesLambda = new nodeLambda.NodejsFunction(
      this,
      GET_INQUIRIES_LAMBDA_ID,
      GET_INQUIRIES_LAMBDA_PROPS,
    );

    const updateInquiriesLambda = new nodeLambda.NodejsFunction(
      this,
      UPDATE_INQUIRY_LAMBDA_ID,
      UPDATE_INQUIRY_LAMBDA_PROPS,
    );

    this.inquiriesTable.grantWriteData(createInquiryLambda);
    this.inquiriesTable.grantReadData(getInquiriesLambda);
    this.inquiriesTable.grantWriteData(updateInquiriesLambda);

    const api = new apigateway.RestApi(this, API_ID, API_PROPS);

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });

    new cdk.CfnOutput(this, "AdminBucketName", {
      value: adminBucket.bucketName,
    });

    new cdk.CfnOutput(this, "AdminDistributionId", {
      value: adminDistribution.distributionId,
    });

    new cdk.CfnOutput(this, "AdminDistributionDomainName", {
      value: adminDistribution.distributionDomainName,
    });

    const inquiries = api.root.addResource("inquiries");
    const inquiry = inquiries.addResource("{inquiryId}");

    inquiries.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createInquiryLambda),
    );

    inquiries.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getInquiriesLambda),
    );

    inquiry.addMethod(
      "PATCH",
      new apigateway.LambdaIntegration(updateInquiriesLambda),
    );
  }
}
