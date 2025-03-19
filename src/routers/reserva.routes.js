import { Router } from "express";
import ReservaController from "../controllers/reserva.controller";
/* import generalValidations from "../validations/general.validations"; */
import Validation from "../validations/reserva.validations";
class ReservaRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router.get(
      "/availableHours",
      Validation.getAvailableHours(),
      this.getAvailableHours
    );
  }
  getAvailableHours(req, res) {
    const controller = new ReservaController();
    controller.getAvailableHours(req, res);
  }
}
export default new ReservaRouter();
