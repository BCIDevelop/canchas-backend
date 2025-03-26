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
        const deporte = socket.handshake.query.deporte;
        console.log("Instancia ID" + instanciaId);
        if (
          instanciaId &&
          typeof instanciaId === "string" &&
          deporte &&
          typeof deporte === "string"
        ) {
          console.log("Joinee");
          socket.join(`${instanciaId}${deporte}`);
          socket.data.reservedSlots = [];
          socket.data.remainLocked = false;
          socket.data.timerId = setTimeout(() => {
            console.log("Desconectate");
            socket.emit("userDisconnected");
            socket.disconnect(true);
          }, 60000); // 5 minutos
        } else {
          console.log("Desconte en el join");
          socket.disconnect(true);
        }

        await eventModules(socket, this.server);
      } catch (error) {
        console.error(`Error en el socket ${socket.id}:`, error);
      }
    });
  }
}
export default SocketIO;
