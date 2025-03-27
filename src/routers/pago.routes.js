import { Router } from "express";
import PagoContoller from "../controllers/pago.controller";
import generalValidations from "../validations/general.validations";
import Validations from "../validations/pago.validations";
class PagoRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router
      .post(
        "/sessionToken",
        Validations.getSessionToken(),
        this.getSessionToken
      )
      .get("/:id", generalValidations.getById(), this.getPago)
      .post("/transactionToken", this.getTransactionToken);
  }
  getPago(req, res) {
    const controller = new PagoContoller();
    controller.getPagoById(req, res);
  }
  getSessionToken(req, res) {
    const controller = new PagoContoller();
    controller.getSessionToken(req, res);
  }
  getTransactionToken(req, res) {
    const controller = new PagoContoller();
    controller.getTransactionToken(req, res);
  }
}
export default new PagoRouter();
