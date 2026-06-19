import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

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

export const handler = async () => {
  if (!TABLE_NAME) {
    return responseJson(500, "no table name found");
  }

  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLE_NAME }),
    );

    const inquiries = (result.Items ?? []).sort((a, b) =>
      String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")),
    );

    return responseJson(200, { inquiries });
  } catch (err) {
    console.error("GET INQUIRIES ERROR");

    return responseJson(500, { message: "Failed to fech inquiries" });
  }
};
