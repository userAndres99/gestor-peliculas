// src/components/Formulario/Formulario.jsx
import React, { useState } from 'react';
import styles from './Formulario.module.css';
import Titulo from '../Titulo/Titulo';
import Input from '../Input/Input';
import Boton from '../Boton/Boton';


/**
 * onSubmit --> función para manejar el envío del formulario
 */
const Formulario = ({ onSubmit }) => {

  // Estado para almacenar los datos del nuevo elemento
  const [nuevoDato, setNuevoDato] = useState({
    titulo: '',
    director: '',
    anio: '',
    genero: '',
    tipo: 'película',
    estado: 'por-ver',
    rating: '',
    imagenUrl: ''
  });

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoDato(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // el handleSubmit se encarga de manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();              // Evita el comportamiento por defecto del formulario (recargar la página)

    // Validación de los campos del formulario
    // ---------------------- HAY QUE ARREGLAR ESTO, PORQUE HAY MUCHOS IF Y NO SE VE BIEN (son ideas de validaciones) ---------------------
    const { titulo, director, anio, genero, rating, imagenUrl } = nuevoDato;
    if (!titulo || !director || !anio || !genero || !rating || !imagenUrl) return;  // Si falta algún campo, no se envía el formulario
    if (isNaN(anio) || isNaN(rating)) return; // Si anio o rating no son números, no se envía el formulario
    if (anio < 1900 || anio > new Date().getFullYear()) return; // Si el año no es válido, no se envía el formulario
    if (rating < 0 || rating > 10) return; // Si el rating no es válido, no se envía el formulario
    if (nuevoDato.tipo !== 'película' && nuevoDato.tipo !== 'serie') return; // Si el tipo no es válido, no se envía el formulario
    if (nuevoDato.estado !== 'por-ver' && nuevoDato.estado !== 'visto') return; // Si el estado no es válido, no se envía el formulario
    if (!imagenUrl.startsWith('http')) return; // Si la URL de la imagen no es válida, no se envía el formulario

    //el onsubmit se encarga de enviar los datos al componente padre
    // y el id se genera automáticamente con Date.now()
    onSubmit({
      ...nuevoDato,
      id: Date.now(),
      anio: Number(anio),
      rating: Number(rating),
      visto: nuevoDato.estado === 'visto'
    });

    // se reinicia el formulario después de enviar los datos
    setNuevoDato({
      titulo: '',
      director: '',
      anio: '',
      genero: '',
      tipo: 'película',
      estado: 'por-ver',
      rating: '',
      imagenUrl: ''
    });
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <Titulo text="Agregar Película o Serie" />

      {/* Campos del Titulo */}
      <div className={styles.campo}>
        <label htmlFor="titulo">Título:</label>
        <Input
          name="titulo"
          value={nuevoDato.titulo}
          onChange={handleChange}
        />
      </div>

      {/* Campos del Director */}
      <div className={styles.campo}>
        <label htmlFor="director">Director:</label>
        <Input
          name="director"
          value={nuevoDato.director}
          onChange={handleChange}
        />
      </div>

      {/* Campos del Año */}
      <div className={styles.campo}>
        <label htmlFor="anio">Año:</label>
        <Input
          name="anio"
          value={nuevoDato.anio}
          onChange={handleChange}
        />
      </div>

      {/* Campos del Género */}
      <div className={styles.campo}>
        <label htmlFor="genero">Género:</label>
        <select
          name="genero"
          id="genero"
          className={styles.select}
          value={nuevoDato.genero}
          onChange={handleChange}
        >
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
      </div>

      {/* Campos del Tipo */}
      <div className={styles.campo}>
        <label htmlFor="tipo">Tipo:</label>
        <select
          name="tipo"
          id="tipo"
          className={styles.select}
          value={nuevoDato.tipo}
          onChange={handleChange}
        >
          <option value="película">Película</option>
          <option value="serie">Serie</option>
        </select>
      </div>

      {/* Campos del Estado */}
      <div className={styles.campo}>
        <label htmlFor="estado">Estado:</label>
        <select
          name="estado"
          id="estado"
          className={styles.select}
          value={nuevoDato.estado}
          onChange={handleChange}
        >
          <option value="por-ver">Por ver</option>
          <option value="visto">Visto</option>
        </select>
      </div>

      {/* Campos del Rating */}
      <div className={styles.campo}>
        <label htmlFor="rating">Rating:</label>
        <Input
          name="rating"
          type="number"
          value={nuevoDato.rating}
          onChange={handleChange}
        />
      </div>

      {/* Campos de la URL de la Imagen */}
      <div className={styles.campo}>
        <label htmlFor="imagenUrl">URL Imagen:</label>
        <Input
          name="imagenUrl"
          value={nuevoDato.imagenUrl}
          onChange={handleChange}
        />
      </div>

      {/* Botón para enviar el formulario */}
      <Boton text="Agregar" onClick={() => {}} variante="agregar" type="submit" />
    </form>
  );
};

export default Formulario;
