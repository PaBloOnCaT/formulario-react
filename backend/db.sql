CREATE DATABASE IF NOT EXISTS formulario;
USE formulario;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  codigoChip VARCHAR(50) NOT NULL,
  nombre VARCHAR(100),
  raza VARCHAR(100),
  dueno VARCHAR(100),
  ciudad VARCHAR(50),
  fechaNacimiento DATE NULL,
  correo VARCHAR(100),
  telefono VARCHAR(20),
  UNIQUE KEY mascota_unica (tipo, codigoChip)
);
