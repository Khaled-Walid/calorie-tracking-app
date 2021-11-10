import nodemailer from 'nodemailer';
import { promisify } from 'util';

export default async function sendMail(recipient: string, content: string) {
  const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
  const sendMail = promisify(transporter.sendMail.bind(transporter));

  await sendMail({
    from: process.env.EMAIL_FROM,
    subject: 'calorie counter app',
    to: recipient,
    text: content,
    html: `<body>${content.replace(/\n/g, '<br>')}</body>`,
  });
}
