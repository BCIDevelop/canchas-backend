import express from "express";
import cors from "cors";
import routes from "../routers";
import { errors } from "celebrate";
import morgan from "morgan";
import { createServer } from "http";
import models from "../models";
import path from 'path';

const { sequelize } = models;
/* import http from "http"; */

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.client = process.env.CLIENT_URL;
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: this.client, credentials: true }));
  }
  routers() {
    routes(this.app);
    this.app.use(errors());
    this.app.use('/uploads/fotos', express.static(path.resolve(process.env.FOTOS_INSTALACIONES)));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Express running on ${this.port}`);
      sequelize
        .sync({ alter: true })
        .then(() => console.log("Database is connected"))
        .catch((err) =>
          console.error("Error connecting to the database:", err)
        );
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
