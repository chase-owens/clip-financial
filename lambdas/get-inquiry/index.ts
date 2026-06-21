import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import jsonResponse from "../util/jsonResponse";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event: any) => {
  if (!TABLE_NAME) {
    return jsonResponse(500, { message: "no table found" });
  }

  const inquiryId = event.pathParameters?.inquiryId;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { inquiryId },
      }),
    );

    if (!result.Item) {
      return jsonResponse(400, { message: "Inquiry not found" });
    }

    return jsonResponse(200, { inquiry: result.Item });
  } catch (err) {
    console.log({ err });
    return jsonResponse(500, { message: "Failed to fetch inquiry" });
  }
};
