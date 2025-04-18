// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListarContenido from '../../components/ListaContenido/ListarContenido';

const Home = () => {
  // Inicializa contenido desde localStorage o con array vacío
  //intenta recuperar el contenido de localStorage, si no existe, inicializa con un array vacío
  const [contenido, setContenido] = useState(() => {
    const saved = localStorage.getItem('contenido');
    return saved ? JSON.parse(saved) : [];
  });

  // Sincroniza contenido con localStorage cada vez que cambie
  //cada vez que cambia el contenido, se guarda en localStorage (esto es lo que vimos del useEffect)
  useEffect(() => {
    localStorage.setItem('contenido', JSON.stringify(contenido));
  }, [contenido]);

  // Agrega un nuevo ítem (viene desde Formulario)
  //agrega un nuevo item al contenido, el item es el objeto que se pasa desde el formulario
  const agregarItem = (item) => {
    setContenido(prev => [...prev, item]);   //prev es el contenido anterior, se agrega el nuevo item al array
  };

  // Alterna el estado visto/no visto
  // id del objeto que se pasa desde el formulario (por eso hice lo de id: Date.now())
  const toggleVista = (id) => {
    setContenido(prev =>
      prev.map(i => i.id === id ? { ...i, visto: !i.visto } : i)   //si el id coincide, cambia el estado visto/no visto
    );
  };

  // Elimina un ítem con confirmación
  // mas o menos lo mismo...buscamos por id y lo de window.confirm es para preguntar si realmente quiere eliminar el item
  const eliminarItem = (id) => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setContenido(prev => prev.filter(i => i.id !== id));
    }
  };

  // ahora no hace nada, pero es para editar el item
  const editarItem = (id) => {
    console.log('Editar', id);
  };

  return (
    <div className={styles.home}>
      <Header />

      <Formulario onSubmit={agregarItem} />

      <ListarContenido
        lista={contenido}
        onEditar={editarItem}
        onEliminar={eliminarItem}
        onToggleVista={toggleVista}
      />

      <Footer />
    </div>
  );
};

export default Home;
