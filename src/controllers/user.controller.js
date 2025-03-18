import models from "../models";
import {
  UserNotFound,
  UserInactive,
  UserPasswordIncorrectSchema,
} from "../exceptions/users.exceptions";

import EmailServer from "../providers/mail.provider";
import { createTokens } from "../helpers/jwt.js";
import { validateEmail } from "../helpers/validateRequest";

class UserController {
  constructor() {
    this.model = models.users;
  }
  async getMyProfile(req, res) {
    const id = req.current_user;
    console.log(id);
    if (!id) return res.status(401).json({ message: "Unauthorized" });
    try {
      const user = await this.model.findOne({
        where: { id },
        attributes: ["name", "email", "last_name", "celphone", "dni", "status"],
      });
      if (!user) throw new UserNotFound();
      if (!user.status) throw new UserInactive();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async updateProfile(req, res) {
    const id = req.current_user;
    if (!id) return res.status(401).json({ message: "Unauthorized" });
    try {
      const { name, last_name, celphone, dni, email, address } = req.body;
      const { valid: validEmail, text: textEmail } = validateEmail(email);
      const user = await this.model.findOne({ where: { id } });
      if (!user) throw new UserNotFound();
      if (!user.status) throw new UserInactive();

      if (email && email !== user.email) {
        if (!validEmail) throw new UserPasswordIncorrectSchema(textEmail);
        const token = createTokens({ email });
        const client_url = `${process.env.CLIENT_URL}/confirm-email`;
        await EmailServer.send(
          email,
          "Please confirm you account",
          `Confirm you account : <button> <a href='${client_url}?token=${token.accessToken}'>Confirm account</a> </button>`
        );
        await user.update({
          name,
          last_name,
          celphone,
          dni,
          email,
          address,
          status: false,
        });
      } else {
        await user.update({ name, last_name, celphone, dni, email, address });
      }
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
}
export default UserController;
