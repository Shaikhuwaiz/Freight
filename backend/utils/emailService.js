import nodemailer from "nodemailer";

export const sendLoginEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Talaria Security <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Login Confirmation – Talaria Dashboard",
    html: `
  <table width="100%" style="border-collapse: collapse;">
    <tr>
      <td align="center">

      <table width="100%" style="border-collapse: collapse;">
  <tr>
    <td align="center">

      <table style="border-collapse: collapse; text-align: center;">
        <tr>
          <td style="font-size: 28px; font-weight: bold; padding: 10px 0;">
            Welcome to Talaria
          </td>

          <td style="padding-left: 8px; padding-top: 0px;">
            <img src="https://raw.githubusercontent.com/Shaikhuwaiz/talaria-assets/main/logo.png"
                 alt="Talaria Logo"
                 width="26"
                 style="display: block; margin-top: -6px;" />
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
  <p style="text-align:center;">You logged in successfully on ${new Date().toLocaleString()}.</p>
  <p style="text-align:center;">If this was not you, please reset your password immediately.</p>
`

    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
};
