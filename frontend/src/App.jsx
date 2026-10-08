import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000/personas'

const formularioInicial = {
  documento: 'Seleccione',
  numeroDocumento: '',
  name: '',
  lastName: '',
  address: '',
  ciudad: 'Seleccione',
  birthday: '',
  correo: '',
  celular: ''
}

function App() {
  const [personas, setPersonas] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [idEditar, setIdEditar] = useState(null)

  useEffect(() => {
    obtenerPersonas()
  }, [])

  async function obtenerPersonas() {
    try {
      const respuesta = await fetch(API_URL)
      const datos = await respuesta.json()
      setPersonas(datos)
    } catch (error) {
      alert('No se pudo conectar con el backend. Revisa que este corriendo (npm start) y que MySQL este encendido.')
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
    if (formulario.documento === 'Seleccione' || formulario.numeroDocumento === '') {
      alert('Debe seleccionar el tipo de documento y escribir el numero de documento')
      return false
    }
    return true
  }

  async function handleGuardar() {
    if (!validar()) return

    const existe = personas.some(
      (p) => p.documento === formulario.documento && p.numeroDocumento === formulario.numeroDocumento
    )

    if (existe) {
      alert('Ya existe una persona con ese documento')
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

    await obtenerPersonas()
    limpiarFormulario()
  }

  function handleEditar(persona) {
    setFormulario({
      documento: persona.documento,
      numeroDocumento: persona.numeroDocumento,
      name: persona.name || '',
      lastName: persona.lastName || '',
      address: persona.address || '',
      ciudad: persona.ciudad || 'Seleccione',
      birthday: persona.birthday || '',
      correo: persona.correo || '',
      celular: persona.celular || ''
    })
    setIdEditar(persona.id)
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

    await obtenerPersonas()
    limpiarFormulario()
  }

  async function handleEliminar(persona) {
    const confirmar = window.confirm(`¿Seguro que desea eliminar a ${persona.name} ${persona.lastName}?`)
    if (!confirmar) return

    const respuesta = await fetch(`${API_URL}/${persona.id}`, {
      method: 'DELETE'
    })

    if (!respuesta.ok) {
      const error = await respuesta.json()
      alert(error.mensaje)
      return
    }

    await obtenerPersonas()
    if (idEditar === persona.id) {
      limpiarFormulario()
    }
  }

  return (
    <>
      <div className="contenedor">
        <img src="/tdea.png" width="150" height="150" alt="Logo TDEA" />
        <div className="titulos">
          <h1>Tecnológico de Antioquia - Institución Universitaria</h1>
          <h1>Primer formulario</h1>
        </div>
      </div>

      <form id="formulario" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="documento">
          Tipo de documento
          <select
            id="documento"
            className="campo-documento"
            value={formulario.documento}
            onChange={handleChange}
          >
            <option>Seleccione</option>
            <option>Tarjeta de identidad</option>
            <option>Cédula de ciudadanía</option>
            <option>Cédula de extranjería</option>
          </select>
        </label>

        <br /><br />

        <label htmlFor="numeroDocumento">Número de documento</label>
        <input
          type="text"
          id="numeroDocumento"
          className="campo-numero"
          value={formulario.numeroDocumento}
          onChange={handleChange}
          onKeyPress={soloNumeros}
        />

        <br /><br />

        <label htmlFor="name">Nombres</label>
        <input
          type="text"
          id="name"
          className="campo-nombre"
          value={formulario.name}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          className="campo-apellido"
          value={formulario.lastName}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          className="campo-direccion"
          value={formulario.address}
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
          <option>Bogotá</option>
          <option>Cali</option>
          <option>Cúcuta</option>
        </select>

        <br /><br />

        <label htmlFor="birthday">Fecha de nacimiento</label>
        <input
          type="date"
          id="birthday"
          className="campo-nacimiento"
          value={formulario.birthday}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          className="campo-correo"
          value={formulario.correo}
          onChange={handleChange}
        />

        <br /><br />

        <label htmlFor="celular">Celular</label>
        <input
          type="text"
          id="celular"
          className="campo-celular"
          value={formulario.celular}
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
            <th>Tipo Documento</th>
            <th>Número de Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Fecha de nacimiento</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaBody">
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.documento}</td>
              <td>{persona.numeroDocumento}</td>
              <td>{persona.name}</td>
              <td>{persona.lastName}</td>
              <td>{persona.address}</td>
              <td>{persona.ciudad}</td>
              <td>{persona.birthday}</td>
              <td>{persona.correo}</td>
              <td>{persona.celular}</td>
              <td className="acciones">
                <button type="button" onClick={() => handleEditar(persona)}>
                  Actualizar
                </button>
                <button type="button" onClick={() => handleEliminar(persona)}>
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
