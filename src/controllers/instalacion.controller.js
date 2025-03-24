import models from "../models";
import path from "path";
import ImageUploader from "../middlewares/images.middlewares";

import {
  InstalacionNotFound,
  InstalacionInactive,
  InstalacionesPageNotFound,
} from "../exceptions/instalaciones.exceptions";

import { AdminNotFound, AdminInactive } from "../exceptions/admins.exceptions";

class InstalacionController {
  constructor() {
    this.model = models.instalaciones;
    this.uploader_create = new ImageUploader(process.env.FOTOS_INSTALACIONES);
  }

  // Controlador para obtener una instalación por ID :
  async getInstalacionById(req, res) {

    const { id } = req.params;

    try {
      const response = await this.model.findOne({
        where: { status: true, id },
        include: [{
          model: models.canchas,
          as: 'canchas',
          attributes: ['id'],
          include: [
            {
            model: models.deportes,
            as: 'deportes',
            attributes: ['id', 'name']
            }
          ]
        }]
      });

      if (!response) throw new InstalacionNotFound();
      if (!response.status) throw new InstalacionInactive();
      return res.status(200).json({
        message: "Instalación obtenida exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
        data: error?.data || null,
      });
    }
  }

  // Controlador para obtener las instalaciones con paginación :
  async getInstalaciones(req, res) {
    const { page = 1, limit = 20, search } = req.query;
    const offset = page == 0 ? null : (page - 1) * limit;
    const safeLimit = page == 0 ? null : parseInt(limit, 10);

    try {
      const whereCondition = {
        status: true,
        ...(search && {
          [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
        }),
      };

      const response = await this.model.findAndCountAll({
        where: whereCondition,
        distinct: true,
        attributes: {
          exclude: ["created_at", "updated_at", "status"],
        },
        include: [
          {
            model: models.canchas,
            as: "canchas",
            attributes: ["id"],
            include: [
              {
                model: models.deportes,
                as: "deportes",
                attributes: ["id", "name"],
                through: { attributes: [] },
              },
              {
                model: models.tipos,
                as: "tipo",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        limit: safeLimit,
        offset,
        order: [["name", "ASC"]],
      });

      const totalPages = Math.ceil(response.count / limit);
      if (page > totalPages)
        throw new InstalacionesPageNotFound(
          page,
          response.rows.length,
          response.count,
          totalPages
        );

      const result = response.rows.map((instalacion) => {
        const tiposSet = new Map();
        const canchas = [];
        instalacion.canchas.forEach((cancha, index) => {
          if (cancha.tipo && !tiposSet.has(cancha.tipo.id)) {
            tiposSet.set(cancha.tipo.id, {
              id: cancha.tipo.id,
              name: cancha.tipo.name,
            });

            canchas.push({ id: cancha.id, deportes: cancha.deportes });
          }

          console.log(instalacion.canchas[index].tipo);
        });
        return {
          id: instalacion.id,
          name: instalacion.name,
          latitude: instalacion.latitude,
          longitude: instalacion.longitude,
          images: instalacion.images,
          rating: instalacion.rating,
          description: instalacion.description,
          id_admin: instalacion.id_admin,
          canchas,
          tipos: Array.from(tiposSet.values()),
          sports: instalacion.sports,
        };
      });

      return res.status(200).json({
        message: "Instalaciones obtenidas exitosamente",
        data: {
          data: result,
          currentPage: page,
          pageCount: response.rows.length,
          totalCount: response.count,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
        data: error?.data || null,
      });
    }
  }

  // Controlador para crear una instalación :
  async createInstalacion(req, res, next) {
    const { id_admin, name, latitude, longitude, description } = req.body;

    try {
      const validate = await models.admins.findOne({
        where: { id: id_admin },
      });
      if (!validate) throw new AdminNotFound();
      if (!validate.status) throw new AdminInactive();

      const images = [];
      for (const file of req.files)
        images.push(
          path.join("uploads", "fotos", file.filename).replace(/\\/g, "/")
        );

      const response = await this.model.create({
        id_admin,
        name,
        latitude,
        longitude,
        description,
        images,
      });

      return res.status(200).json({
        message: "Instalación creada exitosamente",
        data: response,
      });
    } catch (error) {
      if (req.files && req.files.length > 0)
        return this.uploader_create.cleanupOnError(error, req, res, next);
    }
  }

  // Controlador para actualizar una instalación :
  async updateInstalacion(req, res) {
    const { id } = req.params;
    const { name, latitude, longitude, description } = req.body;

    try {
      const response = await this.model.findByPk(id);
      if (!response) throw new InstalacionNotFound();
      if (!response.status) throw new InstalacionInactive();

      if (name) response.name = name;
      if (latitude) response.latitude = latitude;
      if (longitude) response.longitude = longitude;
      if (description) response.description = description;
      await response.save();

      return res.status(200).json({
        message: "Instalación actualizada exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
        data: error?.data || null,
      });
    }
  }

  // Controlador para eliminar una instalación :
  async deleteInstalacion(req, res) {
    const { id } = req.params;

    try {
      const response = await this.model.findByPk(id);
      if (!response) throw new InstalacionNotFound();
      if (!response.status) throw new InstalacionInactive();

      response.status = false;
      await response.save();

      return res.status(200).json({
        message: "Instalación eliminada exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
        data: error?.data || null,
      });
    }
  }

  // Controlador para cambiar al administrador de una instalación :
  async changeAdminInstalacion(req, res) {
    const { id, id_admin } = req.body;

    try {
      const validate = await models.admins.findOne({
        where: { id: id_admin },
      });
      if (!validate) throw new AdminNotFound();
      if (!validate.status) throw new AdminInactive();

      const response = await this.model.findByPk(id);
      if (!response) throw new InstalacionNotFound();
      if (!response.status) throw new InstalacionInactive();

      response.id_admin = id_admin;
      await response.save();

      return res.status(200).json({
        message: "Administrador cambiado exitosamente",
        data: response,
      });
    } catch (error) {
      return res.status(error?.code || 500).json({
        message: error.message,
        data: error?.data || null,
      });
    }
  }
}

export default InstalacionController;
