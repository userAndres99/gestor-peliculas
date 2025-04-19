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
 
  const [vistos, setVistos] = useState(() => {
    const saved = localStorage.getItem('vistos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [porVer, setPorVer] = useState(() => {
    const saved = localStorage.getItem('porVer');
    return saved ? JSON.parse(saved) : [];
  });

  // Sincroniza contenido con localStorage cada vez que cambie
  //cada vez que cambia el contenido, se guarda en localStorage (esto es lo que vimos del useEffect)
  useEffect(() => {
    localStorage.setItem('vistos', JSON.stringify(vistos));
  }, [vistos]);
  
  useEffect(() => {
    localStorage.setItem('porVer', JSON.stringify(porVer));
  }, [porVer]);
  

  // Agrega un nuevo ítem (viene desde Formulario)
  //agrega un nuevo item al contenido, el item es el objeto que se pasa desde el formulario
  const agregarItem = (item) => {
    if (item.visto) {
      setVistos(prev => [...prev, item]);
    } else {
      setPorVer(prev => [...prev, item]);
    }
  };
  

  // Alterna el estado visto/no visto
  // id del objeto que se pasa desde el formulario (por eso hice lo de id: Date.now())
  const toggleVista = (id) => {
    // Buscar en Por Ver
    const itemPorVer = porVer.find(i => i.id === id);
    if (itemPorVer) {
      setPorVer(prev => prev.filter(i => i.id !== id));
      setVistos(prev => [...prev, { ...itemPorVer, visto: true }]);
      return;
    }
  
    // Buscar en Vistos
    const itemVisto = vistos.find(i => i.id === id);
    if (itemVisto) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => [...prev, { ...itemVisto, visto: false }]);
    }
  };

  // Elimina un ítem con confirmación
  // mas o menos lo mismo...buscamos por id y lo de window.confirm es para preguntar si realmente quiere eliminar el item
  const eliminarItem = (id) => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => prev.filter(i => i.id !== id));
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


      {/*aca listo el contenido para ver como se ve pero no va a estar aca*/}
      <h2 className={styles.tituloSeccion}>Por Ver</h2>
      <ListarContenido
      lista={porVer}
      onEditar={editarItem}
      onEliminar={eliminarItem}
      onToggleVista={toggleVista}
      />
      <h2 className={styles.tituloSeccion}>Vistos</h2>
      <ListarContenido
      lista={vistos}
      onEditar={editarItem}
      onEliminar={eliminarItem}
      onToggleVista={toggleVista}
      />

      <Footer />
    </div>
  );
};

export default Home;
