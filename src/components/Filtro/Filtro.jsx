import React from 'react';
import styles from './Filtro.module.css';

const Filtro = ({ genero, tipo, onChangeGenero, onChangeTipo }) => {
  return (
    <div className={styles.filtro}>
      <div className={styles.campo}>
        <label htmlFor="filtro-genero">Género:</label>
        <select
          id="filtro-genero"
          value={genero}
          onChange={e => onChangeGenero(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
        </select>
      </div>
      <div className={styles.campo}>
        <label htmlFor="filtro-tipo">Tipo:</label>
        <select
          id="filtro-tipo"
          value={tipo}
          onChange={e => onChangeTipo(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="película">Película</option>
          <option value="serie">Serie</option>
        </select>
      </div>
    </div>
  );
};

export default Filtro;
