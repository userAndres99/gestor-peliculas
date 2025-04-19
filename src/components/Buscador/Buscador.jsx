// src/components/Buscador/Buscador.jsx

import React from 'react'
import { useState } from 'react'
import Boton from '../Boton/Boton.jsx'


export  function Buscador({buscarContenido}) {

    const [inputBuscador, setInputBuscador] = useState("");


    const manejarCambios = (event) => {
        setInputBuscador(event.target.value);
    }


    const manejarEnvio = (event) => {
        event.preventDefault();
        buscarContenido(inputBuscador.trim()); //trim() porque elimina los espacios en blanco al principio y al final del string
        setInputBuscador(""); // Limpiar el input después de enviar la búsqueda
        

    }

  return (
    <>
    <form onSubmit={manejarEnvio} style={{ display: 'flex', gap: '0.5rem' }}>
      <input 
      type="search" 
      name='buscador'
      placeholder='Ingrese el titulo de la pelicula o serie que desea buscar'
      value={inputBuscador}
      onChange={manejarCambios}
      />

      <Boton text= "Buscar" type="submit" />
    </form>
    </>
  )
}
