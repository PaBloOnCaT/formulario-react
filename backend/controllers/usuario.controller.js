const usuarioService = require("../services/usuario.service");

function responderError(res, err) {
  if (err.status) return res.status(err.status).json({ mensaje: err.message });
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ mensaje: "Esta mascota ya se encuentra registrada" });
  }
  res.status(500).json({ mensaje: "Error en el servidor: " + err.message });
}

exports.getAll = (req, res) => {
  usuarioService.getAll((err, results) => {
    if (err) return responderError(res, err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  usuarioService.getById(req.params.id, (err, results) => {
    if (err) return responderError(res, err);
    if (results.length === 0) return res.status(404).json({ mensaje: "Registro no encontrado" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  usuarioService.create(req.body, (err, result) => {
    if (err) return responderError(res, err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  usuarioService.update(req.params.id, req.body, (err, result) => {
    if (err) return responderError(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Registro no encontrado" });
    res.json({ mensaje: "Registro actualizado" });
  });
};

exports.delete = (req, res) => {
  usuarioService.delete(req.params.id, (err, result) => {
    if (err) return responderError(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Registro no encontrado" });
    res.json({ mensaje: "Registro eliminado" });
  });
};
