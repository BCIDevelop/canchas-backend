import { Router } from "express";
import PagoContoller from "../controllers/pago.controller";

class PagoRouter {
  constructor() {
    this.router = Router();
  }
  init() {
    return this.router
      .get("/sessionToken", this.getSessionToken)
      .post("/transactionToken", this.getTransactionToken);
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
