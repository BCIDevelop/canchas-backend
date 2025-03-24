import { Router } from "express";
import SportController from "../controllers/deporte.controller";
import Validations from "../validations/deporte.validations";

class SportRouter {
  constructor() {
    this.router = Router();
  }

  init() {
    return this.router
      .get("/", Validations.getSports(), this.getSports)
      .get("/:id", Validations.getSportById(), this.getSportById)
      .post("/", Validations.createSport(), this.createSport);
  }

  getSportById(req, res) {
    const controller = new SportController();
    controller.getSportById(req, res);
  }

  getSports(req, res) {
    const controller = new SportController();
    controller.getSports(req, res);
  }

  createSport(req, res) {
    const controller = new SportController();
    controller.createSport(req, res);
  }
}

export default new SportRouter();
