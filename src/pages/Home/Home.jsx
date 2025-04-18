import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListarContenido from '../../components/ListaContenido/ListarContenido';

const Home = () => {
  // Estado para almacenar el contenido
  // Se inicializa con el contenido guardado en localStorage o un array vacío si no hay nada guardado
  const [contenido, setContenido] = useState(() => {
    const saved = localStorage.getItem('contenido');
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect para guardar el contenido en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('contenido', JSON.stringify(contenido));
  }, [contenido]);


  //--------------------------esto no me convence del todo hay que ver si hay una mejor manera de hacerlo -----------------------
  // Funciones para manejar el contenido
  const agregarItem = item => setContenido(prev => [...prev, item]);

  // Función para alternar el estado de visto/no visto
  const toggleVista   = id   => setContenido(prev =>
    prev.map(i => i.id === id ? { ...i, visto: !i.visto } : i)
  );

  // Función para eliminar un item
  const eliminarItem  = id   => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setContenido(prev => prev.filter(i => i.id !== id));
    }
  };

  // Función para editar un item (todavia no lo hago)
  const editarItem    = id   => console.log('Editar', id);

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
