const Persona = require("../models/persona.model");

// Devuelve un mensaje de error si algo está mal, o null si todo está bien
function validar(p) {
  if (!p || !p.documento || p.documento === "Seleccione") {
    return "Debe seleccionar el tipo de documento";
  }
  if (!p.numeroDocumento || !/^\d+$/.test(String(p.numeroDocumento))) {
    return "El número de documento es obligatorio y solo admite números";
  }
  if (p.celular && !/^\d+$/.test(String(p.celular))) {
    return "El celular solo admite números";
  }
  return null;
}

function errorValidacion(mensaje) {
  const e = new Error(mensaje);
  e.status = 400;
  return e;
}

// La fecha vacía del formulario se guarda como NULL
function limpiar(p) {
  return { ...p, birthday: p.birthday === "" ? null : p.birthday };
}

exports.getAll = async () => {
  return await Persona.findAll();
};

exports.getById = async (id) => {
  return await Persona.findByPk(id);
};

exports.create = async (data) => {
  const mensaje = validar(data);
  if (mensaje) throw errorValidacion(mensaje);
  return await Persona.create(limpiar(data));
};

exports.update = async (id, data) => {
  const mensaje = validar(data);
  if (mensaje) throw errorValidacion(mensaje);
  const persona = await Persona.findByPk(id);
  if (!persona) return null;
  return await persona.update(limpiar(data));
};

exports.delete = async (id) => {
  const persona = await Persona.findByPk(id);
  if (!persona) return null;
  await persona.destroy();
  return true;
};
