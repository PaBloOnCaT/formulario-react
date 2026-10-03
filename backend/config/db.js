const mysql = require("mysql2");

// Cambia la clave por la de tu MySQL (o define la variable DB_PASSWORD)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Haru2015.",
  database: process.env.DB_NAME || "formulario",
  dateStrings: true // las fechas llegan como texto AAAA-MM-DD (lo que espera el input date)
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexion:", err.message);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = connection;
