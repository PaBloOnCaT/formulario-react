const personaService = require("../services/persona.service");

function responderError(res, err) {
  if (err.status) return res.status(err.status).json({ mensaje: err.message });
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ mensaje: "Ya existe una persona con ese documento" });
  }
  res.status(500).json({ mensaje: "Error en el servidor: " + err.message });
}

exports.getAll = async (req, res) => {
  try {
    res.json(await personaService.getAll());
  } catch (err) {
    responderError(res, err);
  }
};

exports.getById = async (req, res) => {
  try {
    const persona = await personaService.getById(req.params.id);
    if (!persona) return res.status(404).json({ mensaje: "Persona no encontrada" });
    res.json(persona);
  } catch (err) {
    responderError(res, err);
  }
};

exports.create = async (req, res) => {
  try {
    const persona = await personaService.create(req.body);
    res.status(201).json(persona);
  } catch (err) {
    responderError(res, err);
  }
};

exports.update = async (req, res) => {
  try {
    const persona = await personaService.update(req.params.id, req.body);
    if (!persona) return res.status(404).json({ mensaje: "Persona no encontrada" });
    res.json({ mensaje: "Persona actualizada" });
  } catch (err) {
    responderError(res, err);
  }
};

exports.delete = async (req, res) => {
  try {
    const resultado = await personaService.delete(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: "Persona no encontrada" });
    res.json({ mensaje: "Persona eliminada" });
  } catch (err) {
    responderError(res, err);
  }
};
