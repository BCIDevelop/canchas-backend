import { readdirSync } from "fs";
import { resolve } from "path";

export default async (socket, io) => {
  try {
    const eventFiles = readdirSync(__dirname).filter((file) => {
      const fileSplit = file.split(".");
      return fileSplit.length === 3 && fileSplit[1] === "events";
    });

    // Carga todos los eventos en paralelo con import()
    await Promise.all(
      eventFiles.map(async (file) => {
        try {
          const event = await import(resolve(__dirname, file));
          if (event.default) {
            await event.default(socket, io);
          } else {
            console.warn(
              `⚠️ El archivo ${file} no tiene una exportación por defecto.`
            );
          }
        } catch (error) {
          console.error(`🚨 Error al cargar el evento ${file}:`, error);
        }
      })
    );

    console.log(
      `✅ ${eventFiles.length} eventos cargados en el socket ${socket.id}`
    );
  } catch (error) {
    console.error("🚨 Error al leer la carpeta de eventos:", error);
  }
};
