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
          className={styles.select}
        >
          <option value="" className={styles.option}>Todos</option>
          <option value="Accion"className={styles.option}>Acción</option>
          <option value="Comedia"className={styles.option}>Comedia</option>
          <option value="Drama"className={styles.option}>Drama</option>
          <option value="Terror"className={styles.option}>Terror</option>
          <option value="Ciencia Ficcion"className={styles.option}>Ciencia Ficción</option>
          <option value="Crimen"className={styles.option}>Crimen</option>
          <option value="Misterio"className={styles.option}>Misterio</option>
          <option value="Romance"className={styles.option}>Romance</option>
          <option value="Fantasia"className={styles.option}>Fantasía</option>
          <option value="Historico"className={styles.option}>Histórico</option>
          <option value="Suspenso"className={styles.option}>Suspenso</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="filtro-tipo">Tipo:</label>
        <select
          id="filtro-tipo"
          value={tipo}
          onChange={e => onChangeTipo(e.target.value)}
          className={styles.select}

        >
          <option value=""className={styles.option}>Todos</option>
          <option value="película"className={styles.option}>Película</option>
          <option value="serie"className={styles.option}>Serie</option>
        </select>
      </div>

      {/* Nuevo select de ordenamiento */}
      <div className={styles.campo}>
        <label htmlFor="filtro-orden">Ordenar por:</label>
        <select
          id="filtro-orden"
          value={ordenSeleccionado}
          onChange={e => onChangeOrden(e.target.value)}
                    className={styles.select}

        >
          <option value=""className={styles.option}>Ninguno</option>
          <option value="anio-asc"className={styles.option}>Año ↑</option>
          <option value="anio-desc"className={styles.option}>Año ↓</option>
          <option value="rating-asc"className={styles.option}>Rating ↑</option>
          <option value="rating-desc"className={styles.option}>Rating ↓</option>
        </select>
      </div>
    </div>
  );
};

export default Filtro;
