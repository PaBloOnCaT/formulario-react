require("dotenv").config();
const { Sequelize } = require("sequelize");

// Conexión con Sequelize (ORM). Los datos salen del archivo .env
const sequelize = new Sequelize(
  process.env.DB_NAME || "formulario",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Haru2015.",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;
