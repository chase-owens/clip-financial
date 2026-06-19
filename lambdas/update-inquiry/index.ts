import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Inquiry } from "../../shared/types/Inquiry";
import jsonResponse from "../util/jsonResponse";

const dynamoClient = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(dynamoClient);

type UpdateInquiryPayload = {} & Inquiry;

export const handler = async (event: any) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  const tableName = process.env.TABLE_NAME;
  const inquiryId = event.pathParameters?.inquiryId;

  if (!tableName || !inquiryId) {
    if (inquiryId) {
      return jsonResponse(400, { message: "No inquiryId to key inquiry" });
    }

    return jsonResponse(500, {
      message: "Missing TABLE_NAME environment variable",
    });
  }

  try {
    const payload = JSON.parse(event.body || {}) as UpdateInquiryPayload;
    const now = new Date().toISOString();

    const result = await documentClient.send(
      new UpdateCommand({
        TableName: tableName,
        Key: {
          inquiryId,
        },
        UpdateExpression:
          "SET #status = :status, notes = :notes, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": payload.status,
          ":notes": "",
          ":updatedAt": now,
        },
        ReturnValues: "ALL_NEW",
      }),
    );

    return jsonResponse(200, { inquiry: result.Attributes });
  } catch (err) {
    console.error("UPDATE_INQUIRY_ERROR", err);

    return jsonResponse(500, { message: "Failed to update inquiry" });
  }
};
