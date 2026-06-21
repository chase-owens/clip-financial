import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import jsonResponse from "../util/jsonResponse";
import type { RootContent } from "../../shared/types/RootContent";
import { verify } from "node:crypto";
import { version } from "node:os";

const s3 = new S3Client({});
const cloudfront = new CloudFrontClient({});

const BUCKET_NAME = process.env.CONTENT_BUCKET_NAME;
const CONTENT_KEY = process.env.CONTENT_KEY ?? "data/root-content.json";

type UpdateContentPayload = { expectedVersion: number; content: RootContent };

export const handler = async (event: any) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  if (!BUCKET_NAME) {
    return jsonResponse(500, { message: "CONTENT_BUCKET_NAME is required" });
  }

  try {
    const payload = JSON.parse(event.body || "{}") as UpdateContentPayload;
    const currentContent = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: CONTENT_KEY,
      }),
    );

    const currentContentString = await currentContent.Body?.transformToString();

    if (!currentContentString) {
      return jsonResponse(500, { message: "Current content file is empty" });
    }

    const rootContent = JSON.parse(currentContentString) as RootContent;
    const expectedVersion = payload.expectedVersion;

    if (expectedVersion !== rootContent.version) {
      return jsonResponse(409, {
        message: "Content version is different - refresh and start over",
      });
    }

    const nextContent: RootContent = {
      ...payload.content,
      version: rootContent.version + 1,
      updatedAt: new Date().toISOString(),
    };

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: CONTENT_KEY,
        Body: JSON.stringify(nextContent, null, 2),
        ContentType: "application/json",
      }),
    );

    await cloudfront.send(
      new CreateInvalidationCommand({
        DistributionId: process.env.DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: Date.now().toString(),
          Paths: {
            Quantity: 1,
            Items: ["/data/root-content.json"],
          },
        },
      }),
    );

    return jsonResponse(200, { content: payload });
  } catch (err) {
    console.error("GET_CONTENT_ERROR", err);

    return jsonResponse(500, {
      message: "Failed to get content",
    });
  }
};
