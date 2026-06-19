import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";

export const TABLE_NAME = "clip-inquiries-prod";
export const TABLE_ID = "ClipInquiriesTable";

export const TABLE_PROPS: dynamodb.TableProps = {
  tableName: TABLE_NAME,
  partitionKey: {
    name: "inquiryId",
    type: dynamodb.AttributeType.STRING,
  },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.RETAIN,
};
