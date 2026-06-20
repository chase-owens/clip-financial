import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event: any) => {
  const inquiry = event.detail;

  await ses.send(
    new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: { ToAddresses: [process.env.TO_EMAIL!] },
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
