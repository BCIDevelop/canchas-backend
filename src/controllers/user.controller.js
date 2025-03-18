import models from "../models";
import { UserNotFound, UserInactive } from "../exceptions/users.exceptions";
import { createTokens, verifyToken } from "../helpers/jwt.js";

import EmailServer from "../providers/mail.provider";

import { validateEmail, validatePassword } from "../helpers/validateRequest";

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
}
export default UserController;
