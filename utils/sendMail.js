const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: "'Venta de autos' <ventadeautos@test.com>",
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
