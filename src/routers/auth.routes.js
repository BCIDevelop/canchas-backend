import { Router } from "express";
import Validation from "../validations/auth.validations.js";
import AuthController from "../controllers/auth.controller";

class AuthRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router
      .post("/signIn", Validation.signIn(), this.signIn)
      .post("/reset_password", Validation.resetPassword(), this.resetPassword)
      .post("/signUp", Validation.signUp(), this.signUp)
      .patch("/confirm", Validation.confirmAccount(), this.confirmAccount);
  }

  async confirmAccount(req, res) {
    const controller = new AuthController();
    controller.confirmAccount(req, res);
  }
  async signIn(req, res) {
    const controller = new AuthController();
    controller.signIn(req, res);
  }
  async signUp(req, res) {
    const controller = new AuthController();
    controller.signUp(req, res);
  }

  async resetPassword(req, res) {
    const controller = new AuthController();
    controller.resetPassword(req, res);
  }
}
export default new AuthRouter();
