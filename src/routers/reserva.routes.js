import { Router } from "express";
import ReservaController from "../controllers/reserva.controller";
/* import generalValidations from "../validations/general.validations"; */
import Validation from "../validations/reserva.validations";
class ReservaRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router
      .post(
        "/availableHours",
        Validation.getAvailableHours(),
        this.getAvailableHours
      )
      .post(
        "/availableFacilities",
        Validation.getFacilityByHours(),
        this.getFacilityByHours
      )
      .post("/", Validation.create(), this.createReservation);
  }
  getAvailableHours(req, res) {
    const controller = new ReservaController();
    controller.getAvailableHours(req, res);
  }
  createReservation(req, res) {
    const controller = new ReservaController();
    controller.makeReservation(req, res);
  }
  getFacilityByHours(req, res) {
    const controller = new ReservaController();
    controller.getInstalacionesByHour(req, res);
  }
}
export default new ReservaRouter();
