const nodemailer = require('nodemailer');
const eml = process.env.CONTACT_EMAIL || 'hazemailer@gmail.com';
const pw = process.env.CONTACT_KEY || '@pP3Ma!ler';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: eml,
    pass: pw,
    clientId: '1087006477667-70c1lu1i7d3lc949qkc5k8r2i5risv75.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04uW40XWGLtQ9CgYIARAAGAQSNwF-L9Ir6BpFNz3OR4QZWXx5DmYkMOsyKF9cb6arCa0jqKHeDhuscJW3AyIWJB2K0uGQyvDyeHs',
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendMail = (from, name, subject, message) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: from,
      to: process.env.TO_EML || 'ehazell95@gmail.com',
      subject: `New Contact Message From ${name} - ${subject}`,
      text: message,
      html: `<h2>${message}</h2>`,
      date: new Date(),
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