const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 *
 * @param {String} subject mail subject
 * @param {String} html mail body as html notation
 * @param {String} text mail body as text
 */
const sendNodeMail = async (
  subject = 'Message from BackEnd',
  htmlBody,
  textBody = ''
) => {
  const mailOptions = {
    from: 'MLT Manage Team <no-reply@mlt-team.com>',
    to: 'jeremaios@gmail.com',
    subject: subject,
    text: textBody,
    html: htmlBody,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = { sendNodeMail };
