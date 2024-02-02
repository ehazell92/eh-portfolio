const nodemailer = require('nodemailer');
const eml = process.env.CONTACT_EMAIL;
const pw = process.env.CONTACT_KEY;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: eml,
    pass: pw
  }
});

const sendMail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: eml,
      to,
      subject,
      text
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('Contact email sent successfully: ' + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = { sendMail };