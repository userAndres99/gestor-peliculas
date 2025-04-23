// src/components/ContenidoEditar/ContenidoEditar.jsx
import React, { useState } from 'react'
import styles from './ContenidoEditar.module.css'
import Boton from '../Boton/Boton'

export default function ContenidoEditar({ item, onGuardar, onCancelar }) {
  const [titulo, setTitulo] = useState(item.titulo)
  const [director, setDirector] = useState(item.director)
  const [anio, setAnio] = useState(item.anio)
  const [genero, setGenero] = useState(item.genero)
  const [tipo, setTipo] = useState(item.tipo)
  const [rating, setRating] = useState(item.rating) 

  const handleSave = () => {
    const itemEditado = {
      ...item,
      titulo,
      director,
      anio,
      genero,
      tipo,
      rating,
    }
    onGuardar(itemEditado)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Editar: {titulo}</h1>

        <label>Título:</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />

        <label>Director:</label>
        <input type="text" value={director} onChange={e => setDirector(e.target.value)} />

        <label>Año:</label>
        <input type="text" value={anio} onChange={e => setAnio(e.target.value)} />

        <label>Género:</label>
        <select value={genero} onChange={e => setGenero(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="Accion">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficcion">Ciencia Ficción</option>
          <option value="Crimen">Crimen</option>
          <option value="Misterio">Misterio</option>
          <option value="Romance">Romance</option>
          <option value="Fantasia">Fantasía</option>
          <option value="Historico">Histórico</option>
          <option value="Suspenso">Suspenso</option>
        </select>

        <label>Tipo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="pelicula">Película</option>
          <option value="serie">Serie</option>
        </select>

        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

       
        <div className={styles.actions}>
          <Boton text="Guardar" onClick={handleSave} variante={"secundario"}></Boton>
          <Boton text="Cancelar" onClick={onCancelar}variante={"primario"} ></Boton>
        </div>
      </div>
    </div>
  )
}
