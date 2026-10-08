CREATE DATABASE IF NOT EXISTS formulario;
USE formulario;

-- Sequelize crea esta tabla solo (sync), este script es opcional
CREATE TABLE IF NOT EXISTS personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  documento VARCHAR(50) NOT NULL,
  numeroDocumento VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  lastName VARCHAR(100),
  address VARCHAR(150),
  ciudad VARCHAR(50),
  birthday DATE NULL,
  correo VARCHAR(100),
  celular VARCHAR(20),
  UNIQUE KEY persona_unica (documento, numeroDocumento)
);
