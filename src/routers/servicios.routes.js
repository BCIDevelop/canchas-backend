import { Router } from "express";
import ServicioController from "../controllers/servicio.controller";
import Validations from "../validations/servicio.validations";

class ServicioRouter {

  constructor() {
    this.router = Router();
  }

  init() {
    return this.router
      .get("/", this.getServicios)
      .get("/:id", Validations.getServicioById(), this.getServicioById)
  }

  getServicioById(req, res) {
    const controller = new ServicioController();
    controller.getServicioById(req, res);
  }
  getServicios(req, res) {
    const controller = new ServicioController();
    controller.getServicios(req, res);
  }
}

export default new ServicioRouter();
