import * as AWS from 'aws-sdk';

interface EmailInfo {
  email: string;
  subject: string;
  text: string;
}

// export async function sendRegistrationEmailPersistence(
//   info: EmailInfo
// ): Promise<void> {
//   const ses = new AWS.SES({
//     region: 'us-east-1',
//   });

//   await ses
//     .sendEmail({
//       Destination: {
//         ToAddresses: [info.email],
//       },
//       Message: {
//         Subject: {
//           Data: info.subject,
//         },
//         Body: {
//           Text: {
//             Data: info.text,
//           },
//         },
//       },
//       Source: 'alvon@gmail.com',
//     })
//     .promise();
// }

export async function sendRegistrationEmailPersistence(
  info: EmailInfo
): Promise<void> {
  console.log('Email has been sent');
}
