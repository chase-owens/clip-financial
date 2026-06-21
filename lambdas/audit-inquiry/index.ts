import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  console.log("event", JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    const eventBridgeEvent = JSON.parse(record.body);
    const detail = eventBridgeEvent.detail;

    await dynamo.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          auditId: randomUUID(),
          eventType: eventBridgeEvent["detail-type"],
          entityType: "Inquiry",
          entityId: detail.inquiryId,
          createdAt: new Date().toISOString(),
          detail,
        },
      }),
    );
  }

  return {
    statusCode: 200,
  };
};
