import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandbox9debd328bdfd4acba115bb3031607dad.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'magervlad@yandex.ru',
    to: 'magervlad@yandex.ru',
    subject,
    html
  };

  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="https://muber-client.herokuapp.com/verification/${key}">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
