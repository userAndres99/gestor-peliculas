import React from 'react';
import styles from './Detalle.module.css';
import Boton from '../Boton/Boton';

/**
 * el item--> es el objeto con (titulo,director,anio,genero,tipo,rating,visto,id)
 * onEditar--> es una funcion que se ejecuta al hacer click en el boton editar
 * onEliminar -->es una funcion que se ejecuta al hacer click en el boton eliminar
 * onToggleVista--> es una funcion que se ejecuta al hacer click en el boton de marcar como visto/no visto
 */
const Detalle = ({ item, onEditar, onEliminar, onToggleVista }) => {
  return (

    /*el contenedor del objeto seria este*/
    <div className={styles.detalle}>

      {/*cosas del objeto */}
      <h3 className={styles.titulo}>{item.titulo}</h3>
      <p><strong>Director:</strong> {item.director}</p>
      <p><strong>Año:</strong> {item.anio}</p>
      <p><strong>Género:</strong> {item.genero}</p>
      <p><strong>Tipo:</strong> {item.tipo}</p>
      <p><strong>Rating:</strong> {item.rating}</p>
      <p className={styles.estado}>
        {item.visto ? '✅ Visto' : '🔜 Por ver'}
      </p>


      {/* Botones para editar, eliminar y marcar como visto/no visto */}
      <div className={styles.botones}>
        <Boton text={item.visto ? 'Marcar como no visto' : 'Marcar como visto'} onClick={() => onToggleVista(item.id)} />
        <Boton text="Editar" onClick={() => onEditar(item.id)} />
        <Boton text="Eliminar" onClick={() => onEliminar(item.id)} />
      </div>
    </div>
  );
};

export default Detalle;
