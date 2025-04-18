import React from 'react';
import styles from './ListarContenido.module.css';
import Detalle from '../Detalle/Detalle';
/**
 * lista--> es un array de objetos que contiene la informacion de los elementos a mostrar
 * onEditar--> es una funcion que se ejecuta al hacer click en el boton editar
 * onEliminar -->es una funcion que se ejecuta al hacer click en el boton eliminar
 * onToggleVista--> es una funcion que se ejecuta al hacer click en el boton de marcar como visto/no visto
 */
const ListarContenido = ({ lista, onEditar, onEliminar, onToggleVista }) => {

  /*este if es por si no hay nada */
  if (!lista || lista.length === 0) {
    return <p className={styles.vacio}>No hay contenido para mostrar.</p>;
  }


  /*si hay algo va a salir por este return*/
  return (
    <div className={styles.lista}>

      {/*uso el .map para agarrar cada item de la lista*/}
      {lista.map(item => (
        <Detalle
          key={item.id}                   // key es el id del objeto para que react no se vuelva loco (lo vi en un video y no me dio problema asi que lo deje) 
          item={item}                     // item es el objeto que contiene la info del elemento a mostrar  
          onEditar={onEditar}             // onEditar es la funcion que se ejecuta al hacer click en el boton editar
          onEliminar={onEliminar}         // onEliminar es la funcion que se ejecuta al hacer click en el boton eliminar  
          onToggleVista={onToggleVista}   // onToggleVista es la funcion que se ejecuta al hacer click en el boton de marcar como visto/no visto
        />
      ))}
    </div>
  );
};

export default ListarContenido;

