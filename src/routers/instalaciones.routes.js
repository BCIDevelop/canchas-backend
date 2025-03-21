import { Router } from "express";
import InstalacionController from "../controllers/instalacion.controller";
import Validations from "../validations/instalacion.validations";
import ImageUploader from "../middlewares/images.middlewares";

class InstalacionRouter {
  constructor() {
    this.router = Router();
    this.uploader_create = new ImageUploader(
      process.env.FOTOS_INSTALACIONES,
      5,
      200,
      true
    );
    this.uploader_update = new ImageUploader(
      process.env.FOTOS_INSTALACIONES,
      5,
      200
    );
  }

  init() {
    return this.router
      .get("/", Validations.getInstalaciones(), this.getInstalaciones)
      .get("/:id", Validations.getInstalacionById(), this.getInstalacionById)
      .post(
        "/",
        this.uploader_create.uploadImage,
        this.uploader_update.multerError,
        this.uploader_create.validateTotalImages,
        Validations.createInstalacion(),
        this.createInstalacion
        /* this.uploader_create.cleanupOnValidationError */
      )
      .patch(
        "/:id",
        this.uploader_update.uploadImage,
        this.uploader_update.multerError,
        this.uploader_update.validateTotalImages,
        Validations.updateInstalacion(),
        this.uploader_update.cleanupFiles,
        this.updateInstalacion
      )
      .delete("/:id", Validations.getInstalacionById(), this.deleteInstalacion)
      .get(
        "/:id/canchas",
        Validations.getInstalacionById(),
        this.getInstalacionByIdAndCanchas
      )
      .patch(
        "/admin/",
        Validations.changeAdminInstalacion(),
        this.changeAdminInstalacion
      );
  }

  getInstalacionById(req, res) {
    const controller = new InstalacionController();
    controller.getInstalacionById(req, res);
  }

  getInstalaciones(req, res) {
    const controller = new InstalacionController();
    controller.getInstalaciones(req, res);
  }

  createInstalacion(req, res) {
    const controller = new InstalacionController();
    controller.createInstalacion(req, res);
  }

  updateInstalacion(req, res) {
    const controller = new InstalacionController();
    controller.updateInstalacion(req, res);
  }

  deleteInstalacion(req, res) {
    const controller = new InstalacionController();
    controller.deleteInstalacion(req, res);
  }

  changeAdminInstalacion(req, res) {
    const controller = new InstalacionController();
    controller.changeAdminInstalacion(req, res);
  }
  getInstalacionByIdAndCanchas(req, res) {
    const controller = new InstalacionController();
    controller.getInstalacionByIdAndCanchas(req, res);
  }
}

export default new InstalacionRouter();
