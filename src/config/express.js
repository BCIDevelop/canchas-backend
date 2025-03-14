import express from "express";
import cors from "cors";
import routes from "../routers";
import { errors } from "celebrate";
import morgan from "morgan";
import { createServer } from "http";
/* import http from "http"; */

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: "*", credentials: true }));
  }
  routers() {
    routes(this.app);
    this.app.use(errors());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Express running on ${this.port}`);
    });
  }

  core() {
    this.middleware();
    this.routers();
    this.listen();
    /* this.socketioInit() */
  }
  /*  socketioInit(){
        const socket=new SocketIO(this.server)
        socket.init()
    } */
}

export default new Server();
