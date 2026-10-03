const usuarioModel = require("../models/usuario.model");

// Devuelve un mensaje de error si algo esta mal, o null si todo esta bien
function validar(p) {
  if (!p || !p.tipo || p.tipo === "Seleccione") {
    return "Debe seleccionar el tipo de mascota";
  }
  if (!p.codigoChip || !/^\d+$/.test(String(p.codigoChip))) {
    return "El numero de chip es obligatorio y solo admite numeros";
  }
  if (p.telefono && !/^\d+$/.test(String(p.telefono))) {
    return "El telefono solo admite numeros";
  }
  return null;
}

function errorValidacion(mensaje) {
  const e = new Error(mensaje);
  e.status = 400;
  return e;
}

exports.getAll = (cb) => usuarioModel.getAll(cb);
exports.getById = (id, cb) => usuarioModel.getById(id, cb);

exports.create = (usuario, cb) => {
  const mensaje = validar(usuario);
  if (mensaje) return cb(errorValidacion(mensaje));
  usuarioModel.create(usuario, cb);
};

exports.update = (id, usuario, cb) => {
  const mensaje = validar(usuario);
  if (mensaje) return cb(errorValidacion(mensaje));
  usuarioModel.update(id, usuario, cb);
};

exports.delete = (id, cb) => usuarioModel.delete(id, cb);
