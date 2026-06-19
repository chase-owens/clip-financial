import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import jsonResponse from "../util/jsonResponse";

const s3 = new S3Client({});

const BUCKET_NAME = process.env.CONTENT_BUCKET_NAME;
const CONTENT_KEY = process.env.CONTENT_KEY ?? "data/root-content.json";

export const handler = async () => {
  if (!BUCKET_NAME) {
    return jsonResponse(500, {
      message: "CONTENT_BUCKET_NAME is required",
    });
  }

  try {
    const result = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: CONTENT_KEY,
      }),
    );

    const body = await result.Body?.transformToString();

    if (!body) {
      return jsonResponse(404, {
        message: "Content file not found",
      });
    }

    return jsonResponse(200, body, true);
  } catch (error) {
    console.error("GET_CONTENT_ERROR", error);

    return jsonResponse(500, {
      message: "Failed to get content",
    });
  }
};
