'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Veterinario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Veterinario.hasMany(models.Appointment, { foreignKey: 'Veterinario_id', as: 'appointments' });
    }
  }
  Veterinario.init({
    name: DataTypes.STRING,
    especialidad:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Veterinario',
    tableName: 'veterinarios'
  });
  return Veterinario;
};

