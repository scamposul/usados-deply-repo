const sendEmail = require("./sendMail");
const plantilla = require ("./plantilla")

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  try{
  const verifyEmail = `${origin}/users/verify?token=${verificationToken}&email=${email}`;

  return sendEmail({
    to: email,
    subject: "Verificar email",
    html: plantilla(name,verifyEmail),
  });
  }catch(error){
    console.log(error)
  }
};

module.exports = sendVerificationEmail;
