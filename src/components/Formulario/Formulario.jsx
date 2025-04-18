import React, { useState } from 'react';
import styles from './Formulario.module.css';
import Titulo from '../Titulo/Titulo';
import Input from '../Input/Input';
import Boton from '../Boton/Boton';

const Formulario = ({ onSubmit }) => {
  // son los estados de los inputs al iniciar el formulario
  // se inicializan como vacios para que no haya nada al principio
  const [titulo, setTitulo]       = useState('');
  const [director, setDirector]   = useState('');
  const [anio, setAnio]           = useState('');
  const [genero, setGenero]       = useState('');
  const [tipo, setTipo]           = useState('película');
  const [rating, setRating]       = useState('');

  // el handleSubmit es la funcion que se ejecuta cuando se envia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();   // Evitar el comportamiento por defecto del formulario

    // Validar que todos los campos estén completos
    // faltaria validar que el año sea un numero y que el rating sea un numero entre 1 y 10 etc
    if (!titulo || !director || !anio || !genero || !rating) return; 

    // Crear un nuevo objeto con los datos del formulario
    // vi que lo hacian de esta manera en un video(capaz hay una mejor manera de hacerlo)
    onSubmit({
      id: Date.now(),           // Generar un ID único basado en la fecha y hora actual
      titulo,
      director,
      anio: Number(anio),       //number para anio porque es un numero
      genero,
      tipo,
      rating: Number(rating),   // number para rating porque es un numero
      visto: false              // Inicializar como no visto
    });

    // Limpiar formulario
    setTitulo('');
    setDirector('');
    setAnio('');
    setGenero('');
    setTipo('película');
    setRating('');
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <Titulo text="Agregar Película o Serie" />

      <div className={styles.campo}>
        <label htmlFor="titulo">Título:</label>
        <Input id="titulo" value={titulo} onChange={setTitulo} />
      </div>

      <div className={styles.campo}>
        <label htmlFor="director">Director:</label>
        <Input id="director" value={director} onChange={setDirector} />
      </div>

      <div className={styles.campo}>
        <label htmlFor="anio">Año:</label>
        <Input id="anio" value={anio} onChange={setAnio} />
      </div>

      <div className={styles.campo}>
        <label htmlFor="genero">Género:</label>
        <select
          id="genero"
          className={styles.select}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          className={styles.select}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="película">Película</option>
          <option value="serie">Serie</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="rating">Rating:</label>
        <Input id="rating" value={rating} onChange={setRating} />
      </div>

      <Boton text="Agregar" onClick={handleSubmit} />
    </form>
  );
};

export default Formulario;
