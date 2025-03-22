import { Model, DataTypes } from "sequelize";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import auth from "../config/auth";

class UserModel extends Model {
  static associate(models) {}
  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
        },
        celphone: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
        },
        dni: {
          type: DataTypes.STRING,
          unique: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "users",
      }
    );
  }

  async hashPassword() {
    let passwordHash = hashSync(this.password, genSaltSync(auth.rounds));
    this.password = passwordHash;
  }

  async validatePassword(password) {
    return compareSync(password, this.password);
  }
}

export default UserModel;
