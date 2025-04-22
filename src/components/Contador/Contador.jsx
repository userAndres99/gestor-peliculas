import React from 'react';
import styles from './Contador.module.css';

/**
 *  Cantidad total de ítems "Por Ver" y "Vistos"
 *  Cantidad de ítems por cada género (todas las listas)
 */
const Contador = ({ vistos, porVer }) => {
  
  const totalVistos = vistos.length;    // cantidad de elementos en la lista vistos
  const totalPorVer = porVer.length;    // cantidad de elementos en la lista porVer

  
  //Conteo por género de ambas listas concatenadas
  //creamos una sola lista con los elementos de ambas listas
  //y luego reducimos esa lista a un objeto con la cantidad de elementos por género
  const conteoGeneros = [...vistos, ...porVer].reduce((acumulador, item) => {

    //si no existía la clave, arranca en 0, luego suma 1
    acumulador[item.genero] = (acumulador[item.genero] || 0) + 1;   

    return acumulador;
  }, {});  //objeto vacio como valor inicial

  // Sacamos las claves del objeto conteoGeneros para crear una lista de géneros (las claves son los generos como accion, drama, etc)
  const listaGeneros = Object.keys(conteoGeneros);  

  return (
    <div className={styles.contador}>
      <div className={styles.totales}>
        {/*mostramos la cantidad total de elementos por ver y vistos*/}
        <span>Por Ver: {totalPorVer}</span>
        <span>Vistos: {totalVistos}</span>
      </div>

      <div className={styles.generos}>
        {/*recorremos Lista y para cada elemento hacemos lo siguiente....*/}
        {listaGeneros.map(genero => (
          <span key={genero}>
            {genero}: {conteoGeneros[genero]}    {/*mostramos el nombre del genero y su conteo*/}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Contador;