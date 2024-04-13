import { Email } from "./email/Email";
import { render } from "@react-email/render";

import nodemailer from "nodemailer";

const getSESCredentials = () => {
  const sesUser = process.env.SES_USER;
  const sesPass = process.env.SES_PASSWORD;
  if (!sesUser) {
    throw new Error("could not find SES_USER in env");
  }
  if (!sesPass) {
    throw new Error("could not find SES_PASSWORD in env");
  }

  return { sesUser, sesPass };
};

const sendVerificationEmail = async (to: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 465,
      secure: true,
      auth: {
        user: getSESCredentials().sesUser,
        pass: getSESCredentials().sesPass,
      },
    });

    const emailHtml = render(<Email token={token} />);

    const options = {
      from: "moon.nawaz1@gmail.com  ",
      to: to,
      subject: "hello world",
      html: emailHtml,
    };

    const result = await transporter.sendMail(options);
    console.log(result);
    return result;
  } catch (e) {
    console.error("could not send email in sendVerificationEmail");
    console.error(e);
    throw new Error("could not send email: " + JSON.stringify(e));
  }
};

export { sendVerificationEmail };
