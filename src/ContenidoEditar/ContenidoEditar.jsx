import React, { useState } from 'react'

export default function ContenidoEditar({item,onGuardar,onCancelar}) {

    const [titulo, setTitulo] = useState(item.titulo);
    const [director, setDirector] = useState(item.director)
    const [año, setAño] = useState(item.años)
    const [genero, setGenero] = useState(item.genero)
    const [tipo, setTipo] = useState(item.tipo)
    const [rating, setRating] = useState(item.rating)

    const handleSave = () => {
        const itemEditado = {
            ...item,
            titulo,
            director,
            año,
            genero,
            tipo,
            rating,


        };
        onGuardar(itemEditado);
    }






    

  return (
    <>
      <h1>Editar: {titulo}</h1>
      <label>Título:</label>
      <input
      type='text'
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      ></input>

      <label>Director:</label>
      <input 
      type="text"
      value={director}
      onChange={(e) => setDirector(e.target.value)} 
      
      />

      <label>Año:</label>
      <input 
      type="text" 
      value={año}
      onChange={(e) => setAño(e.target.value)}
      />


      <label>Género:</label>
      <select value={genero}
      onChange={(e) => setGenero(e.target.value)}
      >
        <option value="">Seleccionar</option>
        <option value="Accion">Acción</option>
        <option value="Comedia">Comedia</option>
        <option value="Drama">Drama</option>
        <option value="Terror">Terror</option>
        <option value="Ciencia Ficcion">Ciencia Ficción</option>


      </select>

      <select value={tipo}
      onChange={(e) => setTipo(e.target.value)}>

        <option value="Pelicula">Pelicula</option>
        <option value="Serie">Serie</option>
      </select>
      <input type="number" min ="1" max= "10"  value={rating}  onChange={(e) => setRating(e.target.value)}/>


      <button onClick={handleSave}>Guardad</button>
      <button onClick={onCancelar}>Cancelar</button>
    </>
  )
}
