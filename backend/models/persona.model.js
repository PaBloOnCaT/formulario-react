const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Modelo Persona: Sequelize lo mapea a la tabla "personas"
const Persona = sequelize.define(
  "Persona",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    documento: { type: DataTypes.STRING(50), allowNull: false },
    numeroDocumento: { type: DataTypes.STRING(50), allowNull: false },
    name: { type: DataTypes.STRING(100) },
    lastName: { type: DataTypes.STRING(100) },
    address: { type: DataTypes.STRING(150) },
    ciudad: { type: DataTypes.STRING(50) },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
    correo: { type: DataTypes.STRING(100) },
    celular: { type: DataTypes.STRING(20) }
  },
  {
    tableName: "personas",
    timestamps: false,
    indexes: [
      {
        unique: true,
        name: "persona_unica",
        fields: ["documento", "numeroDocumento"]
      }
    ]
  }
);

module.exports = Persona;
