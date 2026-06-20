import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import type { InquiryBase } from "../../shared/types/Inquiry";
import jsonResponse from "../util/jsonResponse";

const dynamoClient = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(dynamoClient);
const eventBridge = new EventBridgeClient({});

type CreateInquiryPayload = {} & InquiryBase;

export const handler = async (event: any) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  const tableName = process.env.TABLE_NAME;

  if (!tableName) {
    return jsonResponse(500, {
      message: "Missing TABLE_NAME environment variable",
    });
  }

  try {
    const payload = JSON.parse(event.body || "{}") as CreateInquiryPayload;

    if (!payload.name || !payload.email || !payload.message) {
      return jsonResponse(400, {
        message: "Name, email, and message are required",
      });
    }

    const now = new Date().toISOString();

    const inquiry = {
      inquiryId: crypto.randomUUID(),
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.company?.trim() || null,
      software: payload.software?.trim() || null,
      message: payload.message.trim(),
      status: "new",
      notes: "",
      createdAt: now,
      updatedAt: now,
    };

    await documentClient.send(
      new PutCommand({
        TableName: tableName,
        Item: inquiry,
      }),
    );

    await eventBridge.send(
      new PutEventsCommand({
        Entries: [
          {
            EventBusName: process.env.EVENT_BUS_NAME,
            Source: "clip.inquiries",
            DetailType: "InquiryCreated",
            Detail: JSON.stringify(inquiry),
          },
        ],
      }),
    );

    return jsonResponse(201, {
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error("CREATE_INQUIRY_ERROR", error);

    return jsonResponse(500, {
      message: "Failed to create inquiry",
    });
  }
};
