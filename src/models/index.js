import { readdirSync } from "fs";
import { resolve } from "path";
import configDatabase from "../config/database";
import { Sequelize } from "sequelize";
import { config } from "dotenv";
const models = {};
let sequelize;
const node_env = process.env.NODE_ENV;
if (node_env) sequelize = new Sequelize(configDatabase[node_env]);
else {
  config();
  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DRIVER,
    timezone: process.env.TZ,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dialectOptions: {
      ssl: false,
    },
  });
}

readdirSync(__dirname)
  .filter((file) => {
    let fileSplit = file.split(".");
    return fileSplit.length === 3 && fileSplit[1] === "models";
  })
  .forEach((file) => {
    const nameModel = file.split(".")[0];
    const importModel = require(resolve(__dirname, file));
    models[nameModel] = importModel.default.initModel(sequelize);
  });

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const object = {
  ...models,
  sequelize,
  Sequelize,
};
export default object;
