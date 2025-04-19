//idea de componente

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
        buscarContenido(inputBuscador);
        

    }

  return (
    <>
      <input 
      type="search" 
      name='buscador'
      placeholder='Ingrese el titulo de la pelicula o serie que desea buscar'
      value={inputBuscador.buscador}
      onChange={manejarCambios}
      />

      <Boton text= "Buscar" onClick ={manejarEnvio}></Boton>
    </>
  )
}
