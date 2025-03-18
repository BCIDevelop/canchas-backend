import { Router } from "express";
import UserController from "../controllers/user.controller";
import generalValidations from "../validations/general.validations";
import { isAuthenticated } from "../middlewares/auth.middlewares";
class UserRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router.get("/profile", isAuthenticated, this.getProfile);
  }
  getProfile(req, res) {
    const controller = new UserController();
    controller.getMyProfile(req, res);
  }
}
export default new UserRouter();
