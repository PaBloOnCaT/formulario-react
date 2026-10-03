import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000/usuarios'

const formularioInicial = {
  tipo: 'Seleccione',
  codigoChip: '',
  nombre: '',
  raza: '',
  dueno: '',
  ciudad: 'Seleccione',
  fechaNacimiento: '',
  correo: '',
  telefono: ''
}

function App() {
  const [mascotas, setMascotas] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [idEditar, setIdEditar] = useState(null)

  useEffect(() => {
    obtenerMascotas()
  }, [])

  async function obtenerMascotas() {
    try {
      const respuesta = await fetch(API_URL)
      const datos = await respuesta.json()
      setMascotas(datos)
    } catch (error) {
      alert("No se pudo conectar con el backend. Revisa que este corriendo (npm start) y que MySQL este encendido.")
    }
  }

  function handleChange(e) {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value
    })
  }

  function soloNumeros(e) {
    if (e.charCode < 48 || e.charCode > 57) {
      alert('Solo se permiten numeros')
      e.preventDefault()
    }
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial)
    setIdEditar(null)
  }

  function validar() {
    if (formulario.tipo === 'Seleccione' || formulario.codigoChip === '') {
      alert('Debe seleccionar el tipo y escribir el codigo')
      return false
    }
    return true
  }

  async function handleGuardar() {
    if (!validar()) return

    const existe = mascotas.some(
      (m) => m.tipo === formulario.tipo && m.codigoChip === formulario.codigoChip
    )

    if (existe) {
      alert('Esta mascota ya se encuentra registrada')
      return
    }

    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formulario)
    })

    if (!respuesta.ok) {
      const error = await respuesta.json()
      alert(error.mensaje)
      return
    }

    await obtenerMascotas()
    limpiarFormulario()
  }

  function handleEditar(mascota) {
    setFormulario({
      tipo: mascota.tipo,
      codigoChip: mascota.codigoChip,
      nombre: mascota.nombre,
      raza: mascota.raza,
      dueno: mascota.dueno,
      ciudad: mascota.ciudad,
      fechaNacimiento: mascota.fechaNacimiento,
      correo: mascota.correo,
      telefono: mascota.telefono
    })
    setIdEditar(mascota.id)
  }

  async function handleActualizar() {
    if (idEditar === null) return
    if (!validar()) return

    const respuesta = await fetch(`${API_URL}/${idEditar}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formulario)
    })

    if (!respuesta.ok) {
      const error = await respuesta.json()
      alert(error.mensaje)
      return
    }

    await obtenerMascotas()
    limpiarFormulario()
  }

  async function handleEliminar(mascota) {
    const confirmar = window.confirm(`¿Seguro que desea eliminar a ${mascota.nombre}?`)
    if (!confirmar) return

    const respuesta = await fetch(`${API_URL}/${mascota.id}`, {
      method: 'DELETE'
    })

    if (!respuesta.ok) {
      const error = await respuesta.json()
      alert(error.mensaje)
      return
    }

    await obtenerMascotas()
    if (idEditar === mascota.id) {
      limpiarFormulario()
    }
  }

  return (
    <>
      <div className="contenedor">
        <img src="/tdea.png" width="150" height="150" alt="Logo TDEA" />
        <div className="titulos">
          <h1>Tecnológico de Antioquia I.U.</h1>
          <h1>Clínica Veterinaria - Registro de Mascotas</h1>
        </div>
      </div>

      <form id="formulario" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="tipo">
          Tipo de mascota
          <select
            id="tipo"
            className="campo-tipo"
            value={formulario.tipo}
            onChange={handleChange}
          >
            <option>Seleccione</option>
            <option>Canino</option>
            <option>Felino</option>
            <option>Ave</option>
            <option>Otro</option>
          </select>
        </label>

        <br /><br />

        <label htmlFor="codigoChip">Número de Chip</label>
        <input
          type="text"
          id="codigoChip"
          className="campo-codigo"
          value={formulario.codigoChip}
          onChange={handleChange}
          onKeyPress={soloNumeros}
        />

        <br /><br />

        <label htmlFor="nombre">Nombre de la mascota</label>
        <input
          type="text"
          id="nombre"
          className="campo-nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="raza">Raza</label>
        <input
          type="text"
          id="raza"
          className="campo-raza"
          value={formulario.raza}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="dueno">Nombre del dueño</label>
        <input
          type="text"
          id="dueno"
          className="campo-dueno"
          value={formulario.dueno}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="ciudad">Ciudad</label>
        <select
          id="ciudad"
          className="campo-ciudad"
          value={formulario.ciudad}
          onChange={handleChange}
        >
          <option>Seleccione</option>
          <option>Medellín</option>
          <option>Bello</option>
          <option>Itagüí</option>
          <option>Envigado</option>
        </select>

        <br /><br />

        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          id="fechaNacimiento"
          className="campo-fecha"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="correo">Correo de contacto</label>
        <input
          type="email"
          id="correo"
          className="campo-correo"
          value={formulario.correo}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="telefono">Teléfono</label>
        <input
          type="text"
          id="telefono"
          className="campo-telefono"
          value={formulario.telefono}
          onChange={handleChange}
          onKeyPress={soloNumeros}
        />

        <br /><br />

        <button type="button" id="save" disabled={idEditar !== null} onClick={handleGuardar}>
          Guardar
        </button>

        <button type="button" id="update" disabled={idEditar === null} onClick={handleActualizar}>
          Actualizar
        </button>

        {idEditar !== null && (
          <button type="button" onClick={limpiarFormulario}>
            Cancelar edición
          </button>
        )}
      </form>

      <table id="tablaDatos" border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Número Chip</th>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Dueño</th>
            <th>Ciudad</th>
            <th>Fecha Nacimiento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaBody">
          {mascotas.map((item) => (
            <tr key={item.id}>
              <td>{item.tipo}</td>
              <td>{item.codigoChip}</td>
              <td>{item.nombre}</td>
              <td>{item.raza}</td>
              <td>{item.dueno}</td>
              <td>{item.ciudad}</td>
              <td>{item.fechaNacimiento}</td>
              <td>{item.correo}</td>
              <td>{item.telefono}</td>
              <td className="acciones">
                <button type="button" onClick={() => handleEditar(item)}>
                  Actualizar
                </button>
                <button type="button" onClick={() => handleEliminar(item)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
