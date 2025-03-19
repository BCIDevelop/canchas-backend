import { Server } from "socket.io";
import eventModules from "../events";

class SocketIO {
  constructor(express) {
    this.express = express;
    this.server = new Server(this.express, {
      cors: {
        origin: "*",
      },
    });
  }
  init() {
    this.events();
  }
  events() {
    this.server.on("connection", async (socket) => {
      try {
        console.log(`Conexión con el socket --> ${socket.id}`);

        const instanciaId = socket.handshake.query.instanciaId;
        if (instanciaId && typeof instanciaId === "string") {
          socket.join(instanciaId);
          socket.data.timerId = setTimeout(() => {
            socket.disconnect(true);
          }, 300000); // 5 minutos
        } else socket.disconnect(true);

        await eventModules(socket, this.server);
      } catch (error) {
        console.error(`Error en el socket ${socket.id}:`, error);
      }
    });
  }
}
export default SocketIO;
