import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
console.log("LOADED RESEND KEY:", process.env.RESEND_API_KEY); // debug

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendLoginEmail = async (email) => {
  try {
    console.log("Resend loaded:", !!process.env.RESEND_API_KEY);

    const htmlContent = `
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

            <p style="text-align:center; font-size: 16px; color: #333;">
              You logged in successfully on <strong>${new Date().toLocaleString()}</strong>.
            </p>

            <p style="text-align:center; font-size: 14px; color: #777;">
              If this was not you, please reset your password immediately.
            </p>

          </td>
        </tr>
      </table>
    `;

    const data = await resend.emails.send({
      from: "Talaria <onboarding@resend.dev>",
      to: email,
      subject: "Login Successful – Talaria Dashboard",
      html: htmlContent
    });

    console.log("Email Sent:", data);
  } catch (err) {
    console.error("Resend Error:", err);
  }
};
