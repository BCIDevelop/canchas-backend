import models from "../models";
import {
  UserNotFound,
  UserInactive,
  UserIncorretPassword,
  UserPasswordIncorrectSchema,
  UserActive,
  UserBadToken,
  UserPassworsDontMatch,
} from "../exceptions/users.exceptions";
import { createTokens, verifyToken } from "../helpers/jwt.js";
import { generate } from "generate-password";
import EmailServer from "../providers/mail.provider";
import { OAuth2Client } from "google-auth-library";
import { validateEmail, validatePassword } from "../helpers/validateRequest";

class AuthController {
  constructor() {
    this.model = models.users;
  }

  async loginGmailOAuth(req, res) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_APP_ID,
      });
      const payload = ticket.getPayload();
      const record = await this.model.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!record) throw new UserNotFound();
      if (!record.status) throw new UserInactive();
      const { last_name, name } = record;
      return res.status(200).json({
        ...createTokens({ id: record.id }),
        last_name,
        name,
        id: record.id,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const record = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!record) throw new UserNotFound();
      if (!record.status) throw new UserInactive();
      const validatePassword = await record.validatePassword(password);
      if (!validatePassword) throw new UserIncorretPassword();
      const { last_name, name } = record;
      return res.status(200).json({
        ...createTokens({ id: record.id }),
        last_name,
        name,
        id: record.id,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
  async signUp(req, res) {
    try {
      const { body } = req;
      const { email, password, confirmPassword } = body;
      //Validate
      const { valid, text } = validatePassword(password);
      if (!valid) throw new UserPasswordIncorrectSchema(text);
      const { valid: validEmail, text: textEmail } = validateEmail(email);
      if (!validEmail) throw new UserPasswordIncorrectSchema(textEmail);
      /* Validamos Contraseñas */
      if (confirmPassword !== password) throw new UserPassworsDontMatch();
      const record = this.model.build(body);
      await record.hashPassword();
      const token = createTokens({ email });
      await record.save();
      const client_url = `${process.env.CLIENT_URL}/confirm-email`;
      await EmailServer.send(
        email,
        "Please confirm you account",
        `Confirm you account : <button> <a href='${client_url}?token=${token.accessToken}'>Confirm account</a> </button>`
      );
      return res.status(201).json({ record });
    } catch (error) {
      console.log(error);
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const record = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!record) throw new UserNotFound();
      if (!record.status) throw new UserInactive();
      const newPassword = generate({ length: 15, numbers: true });
      record.password = newPassword;
      await record.hashPassword();
      await EmailServer.resetPassword(email, newPassword);

      record.save();
      return res.status(200).json({ message: "Reset password" });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
  async confirmAccount(req, res) {
    try {
      const { token } = req.body;
      console.log(token);
      const { email } = verifyToken(token);
      if (!email) throw new UserBadToken();
      const record = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!record) throw new UserNotFound();
      if (record.status) throw new UserActive();
      record.status = true;
      record.save();
      return res
        .status(200)
        .json({ message: "Confirmed account successfully" });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
}
export default AuthController;
