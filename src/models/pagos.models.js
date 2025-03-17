import { Model, DataTypes } from "sequelize";

class PagoModel extends Model {
  static associate(models) {}
  static initModel(sequelize) {
    return super.init(
      {
        security_token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "pagos",
        modelName: "pagos",
      }
    );
  }
}
export default PagoModel;
