import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });
const secrets = new SecretsManagerClient({});

const getSecret = async (secretId: string) => {
  const result = await secrets.send(
    new GetSecretValueCommand({ SecretId: secretId }),
  );

  if (!result.SecretString) {
    throw new Error(`Secret ${secretId} has no SecretString`);
  }

  return result.SecretString;
};

export const handler = async (event: any) => {
  const inquiry = event.detail;

  const fromEmail = await getSecret("clip/FROM_EMAIL");
  const toEmail = await getSecret("clip/TO_EMAIL");

  await ses.send(
    new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail!] },
      Message: {
        Subject: {
          Data: `New Clip Financial Inquiry from ${inquiry.name}`,
        },
        Body: {
          Text: {
            Data: `
New Clip Financial inquiry received.

Name: ${inquiry.name || ""}
Company: ${inquiry.company || ""}
Email: ${inquiry.email || ""}
Phone: ${inquiry.phone || ""}
Preferred Contact: ${inquiry.preferredContact || ""}

Message:
${inquiry.message || ""}

Inquiry ID: ${inquiry.inquiryId}
Created At: ${inquiry.createdAt}
            `.trim(),
          },
        },
      },
    }),
  );

  return {
    statusCode: 200,
  };
};
