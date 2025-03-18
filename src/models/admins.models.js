import { Model, DataTypes } from 'sequelize';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import auth from '../config/auth';

class AdminModel extends Model {

  static associate(models) {}
  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING
        },
        last_name: {
          type: DataTypes.STRING
        },
        dni: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          type: DataTypes.STRING
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        celphone: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true
        },
        comment: {
          type: DataTypes.STRING,

        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        sequelize,
        tableName: 'admins',
        modelName: 'admins',
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

export default AdminModel;