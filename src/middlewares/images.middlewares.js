import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ImageUploader {
  constructor(uploadPath, maxFiles = 1, maxSize = 1, requireAll = false) {
    this.uploadPath = uploadPath;
    this.maxFiles = maxFiles;
    this.maxSize = maxSize;
    this.requireAll = requireAll;

    // Configuración de almacenamiento con Multer :
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.uploadPath)) {
          fs.mkdirSync(this.uploadPath, { recursive: true });
          console.log("Directorio creado:", this.uploadPath);
        }
        cb(null, this.uploadPath);
      },

      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${this.getFileExtension(file.originalname)}`;
        cb(null, uniqueName);
      },
    });

    // Configuración de filtros de archivos :
    this.fileFilter = (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error(
          "Formato de archivo no permitido. Solo se aceptan imágenes en formato JPEG, JPG o PNG."
        );
        error.code = "INVALID_FORMAT";
        return cb(error);
      }
      cb(null, true);
    };

    // Middleware para subir imágenes :
    this.uploadImage = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: {
        fileSize: this.maxSize * 1024 * 1024,
        files: this.maxFiles,
      },
    }).array("photos", this.maxFiles);
  }

  // Método para obtener la extensión del archivo :
  getFileExtension(filename) {
    const ext = filename.substring(filename.lastIndexOf("."));
    return ext ? ext.toLowerCase() : "";
  }

  // Middleware para manejar errores de Multer :
  multerError(err, req, res, next) {
    if (err instanceof multer.MulterError || err.code === "INVALID_FORMAT") {
      const errores = [];
      switch (err.code) {
        case "INVALID_FORMAT":
          errores.push(err.message);
          break;
        case "LIMIT_FILE_SIZE":
          errores.push(
            `El archivo excede el tamaño permitido. Máximo permitido: ${this.maxSize} MB.`
          );
          break;
        case "LIMIT_FILE_COUNT":
          errores.push("Se ha excedido el límite de archivos permitidos.");
          break;
        default:
          errores.push("Ocurrió un error con la carga de archivos.");
          break;
      }

      return res.status(400).json({
        message: "Se encontraron los siguientes errores",
        data: errores,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Error inesperado",
        data: [err.message],
      });
    }
    next();
  }

  // Middleware para validar que se envíen imágenes :
  validateTotalImages = (req, res, next) => {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({
        success: false,
        message: "Debes enviar al menos un archivo.",
        error: "Bad Request",
      });

    if (this.requireAll && req.files.length !== 5) {
      this.cleanupFiles(req);
      return res.status(400).json({
        success: false,
        message: "Debes enviar exactamente 5 imágenes.",
        error: "Bad Request",
      });
    }

    next();
  };

  // Método para eliminar archivos subidos
  cleanupFiles = (req) => {
    if (!req.files || req.files.length === 0) return;
    req.files.forEach((file) => {
      try {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        else
          console.warn(
            `Advertencia: Archivo no encontrado, no se pudo eliminar: ${file.path}`
          );
      } catch (error) {
        console.error(`Error al eliminar archivo: ${file.path}`, error);
      }
    });
  };

  // Middleware para manejar errores y eliminar archivos si hay un fallo en las validaciones :
  cleanupOnValidationError = (err, req, res, next) => {
    this.cleanupFiles(req);
    next(err);
  };

  // Middleware para manejar errores y eliminar archivos si hay un fallo en la creación o actualización :
  cleanupOnError = (err, req, res, next) => {
    this.cleanupFiles(req);
    if (!res.headersSent)
      return res.status(err?.code || 500).json({
        success: false,
        message: err.message || "Ocurrió un error interno.",
      });

    next(err);
  };

  // Método para eliminar una imagen específica :
  deleteImage(file) {
    const filePath = path.join(this.uploadPath, file);
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(filePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlink(absolutePath, (err) => {
          if (err)
            return reject(
              new Error(`Error al eliminar el archivo: ${err.message}`)
            );
          resolve(`Archivo eliminado correctamente: ${absolutePath}`);
        });
      } else resolve(`Archivo no encontrado: ${absolutePath}`);
    });
  }
}

export default ImageUploader;
