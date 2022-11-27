const nodemailer = require('nodemailer');
const config = require('config');

class Email {
  constructor() {
    this.from = config.get('mail').from;
  }

  newTransport() {
    // SendGrid sends email
    return nodemailer.createTransport({
      service: config.get('mail').service,
      auth: {
        user: config.get('mail').auth.user,
        pass: config.get('mail').auth.pass
      }
    });
  }

  // Send the actual mail
  async send(to, subject, message) {
    // 2) Define mailOptions
    const mailOptions = {
      from: this.from,
      to,
      subject,
      text: message
    };

    // 3) Create a Transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
}

module.exports = Email;
