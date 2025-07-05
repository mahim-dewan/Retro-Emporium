const { transporter } = require("@/services/mail.service");

// Email send
export const sendOtpToEmail = async ({ userEmail, otp }) => {
  const info = await transporter.sendMail({
    from: `"Retro Emporium" <${process.env.author_email}>`,
    to: userEmail,
    subject: "Verify your email",
    html: `<h1>
    Your verification code is 
    <span style="color: white; font-weight: bold; font-size: 20px; background-color:#D26C31;padding:4px">
      ${otp}
    </span>
  </h1>`,
  });

  return info;
};
