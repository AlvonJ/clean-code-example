import * as AWS from 'aws-sdk';

export async function sendRegistrationEmailPersistence({
  email,
  subject,
  text,
}: {
  email: string;
  subject: string;
  text: string;
}): Promise<void> {
  const ses = new AWS.SES({
    region: 'us-east-1',
  });

  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: text,
          },
        },
      },
      Source: 'alvon@gmail.com',
    })
    .promise();
}
