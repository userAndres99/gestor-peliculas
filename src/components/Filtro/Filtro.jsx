import React from 'react';
import styles from './Filtro.module.css';

const Filtro = ({
  genero,
  tipo,
  onChangeGenero,
  onChangeTipo,
  ordenSeleccionado,
  onChangeOrden
}) => {
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

      {/* Nuevo select de ordenamiento */}
      <div className={styles.campo}>
        <label htmlFor="filtro-orden">Ordenar por:</label>
        <select
          id="filtro-orden"
          value={ordenSeleccionado}
          onChange={e => onChangeOrden(e.target.value)}
        >
          <option value="">Ninguno</option>
          <option value="anio-asc">Año ↑</option>
          <option value="anio-desc">Año ↓</option>
          <option value="rating-asc">Rating ↑</option>
          <option value="rating-desc">Rating ↓</option>
        </select>
      </div>
    </div>
  );
};

export default Filtro;
