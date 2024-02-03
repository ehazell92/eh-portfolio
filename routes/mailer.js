const nodemailer = require('nodemailer');
const eml = process.env.CONTACT_EMAIL;
const pw = process.env.CONTACT_KEY;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: eml,
    pass: pw,
    clientId: process.env.CID,
    clientSecret: process.env.CS,
    refreshToken: process.env.RT,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendMail = (from, name, subject, message) => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('LOCAL DEV');
      reject('ERROR');
    }
    const nwDt = new Date();
    const mailOptions = {
      from: from,
      to: process.env.TO_EML,
      subject: `New Contact Message - ${subject}`,
      text: message,
      html: `
        <h3>Users Name:</h3><h2>${name}</h2>
        <h3>Users Email:</h3><h2>${from}</h2>
        <h3>Sent On:</h3><h2>${nwDt}</h2>
        <h3>${message}</h3>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = { sendMail };