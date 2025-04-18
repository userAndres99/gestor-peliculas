// src/components/Detalle/Detalle.jsx
import React from 'react';
import styles from './Detalle.module.css';
import Boton from '../Boton/Boton';

/**
 * item          --> objeto con { id, titulo, director, anio, genero, tipo, rating, visto, imagenUrl }
 * onEditar      --> función para editar
 * onEliminar    --> función para eliminar
 * onToggleVista --> función para alternar visto/no visto
 */
const Detalle = ({ item, onEditar, onEliminar, onToggleVista }) => {
  return (
    <div className={styles.detalle}>
      {/* Muestra la imagen si existe URL */}
      {item.imagenUrl && (
        <img
          src={item.imagenUrl}
          alt={item.titulo}
          className={styles.imagen}
        />
      )}
      {/* Muestra un texto alternativo si no hay imagen */}
      {!item.imagenUrl && <p className={styles.sinImagen}>Sin imagen</p>}

      {/*detalles del item */}
      <h3 className={styles.titulo}>{item.titulo}</h3>
      <p><strong>Director:</strong> {item.director}</p>
      <p><strong>Año:</strong> {item.anio}</p>
      <p><strong>Género:</strong> {item.genero}</p>
      <p><strong>Tipo:</strong> {item.tipo}</p>
      <p><strong>Rating:</strong> {item.rating}</p>
      <p className={styles.estado}>
        {item.visto ? '✅ Visto' : '🔜 Por ver'}
      </p>

      {/* Botones para editar, eliminar y marcar como visto y no visto */}
      <div className={styles.botones}>
        <Boton
          text={item.visto ? 'Marcar como no visto' : 'Marcar como visto'}
          onClick={() => onToggleVista(item.id)}
        />
        <Boton text="Editar" onClick={() => onEditar(item.id)} />
        <Boton text="Eliminar" onClick={() => onEliminar(item.id)} />
      </div>
    </div>
  );
};

export default Detalle;
