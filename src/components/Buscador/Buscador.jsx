// src/components/Buscador/Buscador.jsx

import React from 'react'
import { useState } from 'react'
import Boton from '../Boton/Boton.jsx'
import styles from './Buscador.module.css'

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
    <form className={styles.buscador} onSubmit={manejarEnvio}>
  <input 
    type="search" 
    name="buscador"
    placeholder="Ingrese el título de la película o serie que desea buscar"
    value={inputBuscador}
    onChange={manejarCambios}
  />
  <Boton text="Buscar" type="submit" />
</form>

    </>
  )
}
