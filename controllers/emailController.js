const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = async options => {
  // 1) Create a Transporter

  // const transporter = nodemailer.createTransport({
  //  service: 'Gmail',
  //  auth: {
  //    user: process.env.EMAIL_USER,
  //    pass: process.env.EMAIL_PASS
  //  }
  // Activate in Gmail "less secure app" option,
  // Limitation With Gmail : can only send 500 mails / day with personal account, SPAM marked
  //});

  const transporter = nodemailer.createTransport({
    host: config.get('mail').host,
    port: config.get('mail').port,
    auth: {
      user: config.get('mail').auth.user,
      pass: config.get('mail').auth.pass
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: config.get('mail').from,
    to: options.emailTo,
    subject: options.subject,
    text: options.message
  };

  // 3) Actually send Email
  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
