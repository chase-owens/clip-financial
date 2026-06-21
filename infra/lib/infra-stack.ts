import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

import { Construct } from "constructs";

import { API_ID, API_PROPS } from "./config/api";
import { TABLE_ID, TABLE_PROPS } from "./config/dynamodb";
import {
  AUDIT_INQUIRY_LAMBDA_ID,
  AUDIT_INQUIRY_LAMBDA_PROPS,
  CREATE_INQUIRY_LAMBDA_ID,
  CREATE_INQUIRY_LAMBDA_PROPS,
  EMAIL_INQUIRY_LAMBDA_ID,
  EMAIL_INQUIRY_LAMBDA_PROPS,
  GET_CONTENT_LAMBDA_ID,
  GET_CONTENT_LAMBDA_PROPS,
  GET_INQUIRIES_LAMBDA_ID,
  GET_INQUIRIES_LAMBDA_PROPS,
  GET_INQUIRY_LAMBDA_ID,
  GET_INQUIRY_LAMBDA_PROPS,
  UPDATE_CONTENT_LAMBDA_ID,
  UPDATE_CONTENT_LAMBDA_PROPS,
  UPDATE_INQUIRY_LAMBDA_ID,
  UPDATE_INQUIRY_LAMBDA_PROPS,
} from "./config/lambda";
import { ADMIN_USERNAME } from "./config/cloudfront";

import "dotenv/config";
import { createBasicAuthFunctionCode } from "./functions/basic-auth";

const AUDIT_TABLE_NAME = "clip-audit-prod";

export class InfraStack extends cdk.Stack {
  public readonly inquiriesTable: dynamodb.Table;
  public readonly auditTable: dynamodb.Table;

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

    const contentBucket = s3.Bucket.fromBucketName(
      this,
      "ContentBucket",
      "clip-content-prod",
    );

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

    // Add secrets
    const fromEmailSecret = new secretsmanager.Secret(this, "FromEmailSecret", {
      secretName: "clip/FROM_EMAIL",
    });
    const toEmailSecret = new secretsmanager.Secret(this, "toEmailSecret", {
      secretName: "clip/TO_EMAIL",
    });
    // Create Event Bus
    const eventBus = new events.EventBus(this, "ClipsEventBus", {
      eventBusName: "clip-events-prod",
    });

    // Create event rule - create inquiry
    const inquiryCreatedRule = new events.Rule(this, "InquiryCreatedRule", {
      eventBus,
      eventPattern: {
        source: ["clip.inquiries"],
        detailType: ["InquiryCreated"],
      },
    });

    const auditQueue = new sqs.Queue(this, "AuditQueue", {
      queueName: "clip-audit-queue-prod",
    });

    //build tables
    this.inquiriesTable = new dynamodb.Table(this, TABLE_ID, TABLE_PROPS);

    this.inquiriesTable.addGlobalSecondaryIndex({
      indexName: "statis-createdAt-index",
      partitionKey: {
        name: "status",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "createdAt",
        type: dynamodb.AttributeType.STRING,
      },
    });
    this.auditTable = new dynamodb.Table(this, "ClipsAuditTable", {
      tableName: AUDIT_TABLE_NAME,
      partitionKey: {
        name: "auditId",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

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

    const getInquiryLambda = new nodeLambda.NodejsFunction(
      this,
      GET_INQUIRY_LAMBDA_ID,
      GET_INQUIRY_LAMBDA_PROPS,
    );

    const updateInquiriesLambda = new nodeLambda.NodejsFunction(
      this,
      UPDATE_INQUIRY_LAMBDA_ID,
      UPDATE_INQUIRY_LAMBDA_PROPS,
    );

    const getContentLambda = new nodeLambda.NodejsFunction(
      this,
      GET_CONTENT_LAMBDA_ID,
      GET_CONTENT_LAMBDA_PROPS,
    );

    const updateContentLambda = new nodeLambda.NodejsFunction(
      this,
      UPDATE_CONTENT_LAMBDA_ID,
      UPDATE_CONTENT_LAMBDA_PROPS,
    );

    const auditInquiryLambda = new nodeLambda.NodejsFunction(
      this,
      AUDIT_INQUIRY_LAMBDA_ID,
      AUDIT_INQUIRY_LAMBDA_PROPS,
    );

    const emailInquiryLambda = new nodeLambda.NodejsFunction(
      this,
      EMAIL_INQUIRY_LAMBDA_ID,
      EMAIL_INQUIRY_LAMBDA_PROPS,
    );

    emailInquiryLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      }),
    );

    contentBucket.grantRead(getContentLambda);
    contentBucket.grantWrite(updateContentLambda);

    this.inquiriesTable.grantWriteData(createInquiryLambda);
    this.inquiriesTable.grantReadData(getInquiriesLambda);
    this.inquiriesTable.grantReadData(getInquiryLambda);
    this.inquiriesTable.grantWriteData(updateInquiriesLambda);

    this.auditTable.grantWriteData(auditInquiryLambda);

    eventBus.grantPutEventsTo(createInquiryLambda);

    // Attach target consumers
    inquiryCreatedRule.addTarget(new targets.SqsQueue(auditQueue));
    inquiryCreatedRule.addTarget(
      new targets.LambdaFunction(emailInquiryLambda),
    );

    auditInquiryLambda.addEventSource(
      new lambdaEventSources.SqsEventSource(auditQueue, { batchSize: 10 }),
    );

    // Grant secret access
    fromEmailSecret.grantRead(emailInquiryLambda);
    toEmailSecret.grantRead(emailInquiryLambda);

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

    //inquiries
    const inquiries = api.root.addResource("inquiries");
    inquiries.addMethod(
      "POST",
      new apigateway.LambdaIntegration(createInquiryLambda),
    );

    inquiries.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getInquiriesLambda),
    );

    //inquiry
    const inquiry = inquiries.addResource("{inquiryId}");
    inquiry.addMethod(
      "PATCH",
      new apigateway.LambdaIntegration(updateInquiriesLambda),
    );

    inquiry.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getInquiryLambda),
    );

    // content
    const content = api.root.addResource("content");
    content.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getContentLambda),
    );

    content.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(updateContentLambda),
    );
  }
}
