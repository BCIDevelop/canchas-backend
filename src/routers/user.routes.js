import { Router } from "express";
import UserController from "../controllers/user.controller";
import generalValidations from "../validations/general.validations";
import { isAuthenticated } from "../middlewares/auth.middlewares";
import Validation from "../validations/user.validations";
class UserRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router
      .get("/profile", isAuthenticated, this.getProfile)
      .patch(
        "/profile",
        isAuthenticated,
        Validation.updateProfile(),
        this.updateProfile
      );
  }
  getProfile(req, res) {
    const controller = new UserController();
    controller.getMyProfile(req, res);
  }
  updateProfile(req, res) {
    const controller = new UserController();
    controller.updateProfile(req, res);
  }
}
export default new UserRouter();
