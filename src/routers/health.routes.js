import { Router } from "express";
import HealthController from "../controllers/health.controller";

class HealthRouter {
  constructor() {
    this.router = Router();
    console.log("");
  }
  init() {
    return this.router.get("/", this.success);
  }
  success(req, res) {
    const controller = new HealthController();
    controller.check(req, res);
  }
}
export default new HealthRouter();
