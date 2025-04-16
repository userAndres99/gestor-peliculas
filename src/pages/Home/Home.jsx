import React from 'react';
import './Home.module.css'; 
import Boton from '../../components/Boton/Boton';
import Titulo from '../../components/Titulo/Titulo';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
 

function Home() {

  //texto es un estado que se inicializa con el valor "hola"
  //setTexto es una función que permite actualizar el estado "texto"
  const [texto, setTexto] = useState("hola");

  return (
    <div className="home">

      <Header />

      {/*ejemplo de titulo(este titulo iria dentro del componente header)*/}
      {/*<Titulo text="Gestor de Películas y Series" />*/}

      {/*ejemplo de boton(este es boton un ejemplo mas general para poder reutilizarlo mas facilmente)*/}
      {/*<Boton text="Ver Películas" onClick={() => alert('Ver Películas')} />*/}

      {/*ejemplo de input(este input lo podemos usar para el filtrado es el que hizo el profe)*/}
      {/*<Input value={texto} onChange={setTexto}/>*/}

      <Footer />

  
    </div>
  );
}

export default Home;