import { Router } from "express";
import TipoController from "../controllers/tipo.controller";
import Validations from "../validations/tipo.validations";

class TipoRouter {

  constructor() {
    this.router = Router();
  }

  init() {
    return this.router
      .get("/", Validations.getTipos(), this.getTipos)
      .get("/:id", Validations.getTipoById(), this.getTipoById)
      .post("/", Validations.createTipo(), this.createTipo)
  }

  getTipoById(req, res) {
    const controller = new TipoController();
    controller.getTipoById(req, res);
  }

  getTipos(req, res) {
    const controller = new TipoController();
    controller.getTipos(req, res);
  }

  createTipo(req, res) {
    const controller = new TipoController();
    controller.createTipo(req, res);
  }
}

export default new TipoRouter();
