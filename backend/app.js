require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const personaRoutes = require("./routes/persona.routes");
app.use("/personas", personaRoutes);

const PORT = process.env.PORT || 3000;

// sync() crea la tabla "personas" si todavía no existe
sequelize
  .sync()
  .then(() => {
    console.log("Conectado a MySQL con Sequelize");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de conexion:", err.message);
  });
