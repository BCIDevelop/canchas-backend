import models from "../models";
import admin from "firebase-admin";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

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
import { validateEmail, validatePassword } from "../helpers/validateRequest";

// Inicializar Firebase con las credenciales :
const serviceAccount = require("../../firebase-config.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
dotenv.config();

class AuthController {

  constructor() {
    this.model = models.users;
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
      if (!record.active_status) throw new UserInactive();
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
      console.log(email);
      const token = createTokens({ email });
      console.log(token);
      await record.save();
      const client_url = process.env.CLIENT_URL;
      await EmailServer.send(
        email,
        "Please confirm you account",
        `Confirm you account : <button> <a href='${client_url}/confirm?email=${email}&token=${token.accessToken}'>Confirm account</a> </button>`
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
      if (!record.active_status) throw new UserInactive();
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
      const { email } = verifyToken(token);
      const record = await this.model.findOne({
        where: {
          email,
        },
      });
      if (!record) throw new UserNotFound();
      if (record.status) throw new UserActive();
      if (token !== record.token) {
        throw new UserBadToken(); /* TODO: Cambiar logica */
      }
      record.status = true;
      record.save();
      return res
        .status(200)
        .json({ message: "Confirmed account successfully" });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  // Enviar código OTP por SMS :
  async sendOtpSMS(req, res) {

    try {
      const { celphone } = req.body;
      const user = await this.model.findOne({ where: { celphone } });
      if (!user) throw new UserNotFound();
      if (!user.active_status) throw new UserInactive();

      // Crear un token personalizado con Firebase :
      const customToken = await admin.auth().createCustomToken(celphone);

      return res
        .status(200)
        .json({
          message: 'Código OTP enviado correctamente',
          customToken
        });

    } catch (error) {
      console.error({
        message: 'Error interno al enviar el OPD por SMS',
        error: error.message
      });

      return res
        .status(error?.code || 500)
        .json({
          message: 'Error interno al enviar el OTP por SMS',
          error: error.message
        });
    }
  }

  // Verificar el código OTP y permitir la recuperación de contraseña :
  async verifyOtpSMS(req, res) {

    try {
      const { celphone, customToken } = req.body;
      const decoded = await admin.auth().verifyIdToken(customToken);

      if (decoded.phone_number !== celphone) return res
        .status(400)
        .json({ message: 'Código inválido' });

      // Crear un token de sesión para cambiar la contraseña :
      const token = createTokens({ phone });

      return res
        .status(200)
        .json({
          message: "Código OTP verificado con éxito",
          token
        });

    } catch (error) {
      return res
        .status(400)
        .json({
          message: "Código inválido o expirado"
        });
    }
  }

  // Reestablecer contraseña con el token generado :
  async resetPasswordSMS(req, res) {

    try {
      const { token, newPassword } = req.body;
      const decoded = verifyToken(token);
      const user = await this.model.findOne({ where: { phone: decoded.phone } });
      if (!user) throw new UserNotFound();
      if (!user.active_status) throw new UserInactive();

      // Encriptar la nueva contraseña :
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res
        .status(200)
        .json({
          message: 'Contraseña actualizada con éxito'
        });

    } catch (error) {
      console.error({
        message: 'Error restableciendo contraseña:',
        error: error.message
      });

      return res
        .status(error?.code || 500)
        .json({ message: 'Token inválido o expirado' });
    }
  }
}

export default AuthController;
