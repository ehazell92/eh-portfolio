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
    const sty = "style='"
    const dispInline = "display:inline-block"
    const bldLtr = `${sty}font-weight:bold; ${dispInline};'`;
    const dispI = `${sty}${dispInline}'`;
    const mailOptions = {
      from: from,
      to: process.env.TO_EML,
      subject: `New Contact Message - ${subject}`,
      text: message,
      html: `
        <span
          ${bldLtr}
        >Users Name:</span><span
          ${dispI}
        >${name}</span>
        <span
          ${bldLtr}
        >Users Email:</span><span
          ${dispI}
        >${from}</span>
        <span
          ${bldLtr}
        >Sent On:</span><span
          ${dispI}
        >${nwDt}</span>
        <span
          ${bldLtr}
        >${message}</span>
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