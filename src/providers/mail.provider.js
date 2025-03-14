import { createTransport } from "nodemailer";

class EmailServer {
  constructor() {
    this.host = process.env.MAIL_SERVER || "";
    this.port = Number(process.env.MAIL_PORT) || 587;
    this.username = process.env.MAIL_USERNAME || "";
    this.password = process.env.MAIL_PASSWORD || "";

    const smtpConfig = {
      host: this.host,
      port: this.port,
      auth: {
        user: this.username,
        pass: this.password,
      },
    };
    this.client = createTransport(smtpConfig);
  }
  async send(to, subject, html) {
    return this.client.sendMail({
      from: this.username,
      to,
      subject,
      html,
    });
  }
  async resetPassword(email, password) {
    await this.send(
      email,
      "New Password",
      `Your new Password is : <b>${password} </b>`
    );
  }
}
export default new EmailServer();
