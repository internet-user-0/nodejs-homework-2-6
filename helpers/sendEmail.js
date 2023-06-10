// const Mailjet = require('node-mailjet');
// const dotenv = require('dotenv');

// dotenv.config();

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//    apiKey: MJ_APIKEY_PUBLIC,
//    apiSecret: MJ_APIKEY_PRIVATE,
// });

// const sendEmail = async data => {
//    await mailjet.post('send', { version: 'v3.1' }).request({
//       Messages: [
//          {
//             From: {
//                Email: MJ_SENDER_EMAIL,
//                // Name: 'Mailjet Pilot',
//             },
//             To: [
//                {
//                   Email: data.To,
//                   Name: 'cekap41331',
//                },
//             ],
//             Subject: data.Subject,
//             // TextPart:
//             //    'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
//             HTMLPart: data.HTMLPart,
//          },
//       ],
//    });
//    return true;
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
   host: 'smtp.ukr.net',
   port: 465,
   secure: true,
   auth: {
      user: UKR_NET_EMAIL,
      pass: UKR_NET_PASSWORD,
   },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
   const email = {...data, from: UKR_NET_EMAIL};
   await transport.sendMail(email);
   return true;
}

module.exports = sendEmail;