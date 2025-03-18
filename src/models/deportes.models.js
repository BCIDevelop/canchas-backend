import { Model, DataTypes } from 'sequelize';

class DeporteModel extends Model {

  static associate(models) {
    this.belongsToMany(models.canchas, {
      through: 'cancha_deporte', // Tabla intermedia
      foreignKey: 'id_deporte',
      otherKey: 'id_cancha',
      as: 'canchas',
    });    
  }
  
  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        sequelize,
        tableName: 'deportes',
        modelName: 'deportes',
      }
    );
  }
}

export default DeporteModel;