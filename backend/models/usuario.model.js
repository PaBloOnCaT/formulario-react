const db = require("../config/db");

// Convierte el objeto del formulario en la lista de valores para SQL
function valores(p) {
  return [
    p.tipo,
    p.codigoChip,
    p.nombre,
    p.raza,
    p.dueno,
    p.ciudad,
    p.fechaNacimiento === "" ? null : p.fechaNacimiento,
    p.correo,
    p.telefono
  ];
}

exports.getAll = (callback) => {
  db.query("SELECT * FROM usuarios", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM usuarios WHERE id = ?", [id], callback);
};

exports.create = (usuario, callback) => {
  db.query(
    "INSERT INTO usuarios (tipo, codigoChip, nombre, raza, dueno, ciudad, fechaNacimiento, correo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    valores(usuario),
    callback
  );
};

exports.update = (id, usuario, callback) => {
  db.query(
    "UPDATE usuarios SET tipo=?, codigoChip=?, nombre=?, raza=?, dueno=?, ciudad=?, fechaNacimiento=?, correo=?, telefono=? WHERE id=?",
    [...valores(usuario), id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM usuarios WHERE id = ?", [id], callback);
};
