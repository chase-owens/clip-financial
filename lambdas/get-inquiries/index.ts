import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;
const STATUS_INDEX_NAME = "statis-createdAt-index";

const responseJson = (statusCode: number, body: any) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Access-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(body),
  };
};

export const handler = async (event: any) => {
  if (!TABLE_NAME) {
    return responseJson(500, "no table name found");
  }

  const status = event.queryStringParameters?.status;

  try {
    const result = status
      ? await docClient.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            IndexName: STATUS_INDEX_NAME,
            KeyConditionExpression: "#status = :status",
            ExpressionAttributeNames: { "#status": "status" },
            ExpressionAttributeValues: { ":status": status },
            ScanIndexForward: false,
          }),
        )
      : await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));

    const inquiries = (result.Items ?? []).sort((a, b) =>
      String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")),
    );

    return responseJson(200, { inquiries });
  } catch (err) {
    console.error("GET INQUIRIES ERROR", JSON.stringify(err, null, 2));

    return responseJson(500, { message: "Failed to fech inquiries" });
  }
};
