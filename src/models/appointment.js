'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Pet, { foreignKey: 'Pet_id', as: 'pet' });
      Appointment.belongsTo(models.Service, { foreignKey: 'Service_id', as: 'service' });
      Appointment.belongsTo(models.Veterinario, { foreignKey: 'Veterinario_id', as: 'veterinario' });
    }
  }
  Appointment.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    Service_id: DataTypes.INTEGER,
    Pet_id: DataTypes.INTEGER,
    Veterinario_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments'
  });
  return Appointment;
};