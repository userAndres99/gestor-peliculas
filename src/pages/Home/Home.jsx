// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListarContenido from '../../components/ListaContenido/ListarContenido';

const Home = () => {
  // Estados para almacenar los ítems separados: vistos y por ver
  const [vistos, setVistos] = useState(() => {
    const saved = localStorage.getItem('vistos');
    return saved ? JSON.parse(saved) : [];
  });
  const [porVer, setPorVer] = useState(() => {
    const saved = localStorage.getItem('porVer');
    return saved ? JSON.parse(saved) : [];
  });

  // Estado para determinar qué vista mostrar: 'todo', 'porVer' o 'vistos'
  // 'todo' muestra ambas listas y el formulario
  // 'porVer' muestra solo la lista de "Por Ver"
  // 'vistos' muestra solo la lista de "Vistos"
  const [vistaActual, setVistaActual] = useState('todo');

  // Estado para almacenar el término de búsqueda y resultados
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);

  // Sincroniza cada lista con localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('vistos', JSON.stringify(vistos));
  }, [vistos]);
  useEffect(() => {
    localStorage.setItem('porVer', JSON.stringify(porVer));
  }, [porVer]);

  // Agrega un nuevo ítem a la lista que corresponda según su estado (visto/no visto)
  const agregarItem = (item) => {
    if (item.visto) {
      setVistos(prev => [...prev, item]);
    } else {
      setPorVer(prev => [...prev, item]);
    }
  };

  // Función de búsqueda: guarda término y filtra ambas listas
  const buscarContenido = (val) => {
    setTerminoBusqueda(val);
    if (!val.trim()) {
      setResultado(null);
      return;
    }
    const todas = [...porVer, ...vistos];
    const encontrados = todas.filter(item =>
      item.titulo.toLowerCase().includes(val.toLowerCase())
    );
    setResultado(encontrados.length ? encontrados : 'No encontrado');
  };

  // Alterna el estado visto/no visto moviendo el ítem entre listas
  // y refresca resultados si hay búsqueda activa
  const toggleVista = (id) => {
    const itemPorVer = porVer.find(i => i.id === id);
    if (itemPorVer) {
      setPorVer(prev => prev.filter(i => i.id !== id));
      setVistos(prev => [...prev, { ...itemPorVer, visto: true }]);

      // Si hay un término de búsqueda activo, actualiza los resultados
      // para que se refleje el cambio en la lista de resultados
      if (terminoBusqueda) buscarContenido(terminoBusqueda);
      return;
    }
    const itemVisto = vistos.find(i => i.id === id);
    if (itemVisto) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => [...prev, { ...itemVisto, visto: false }]);

      // Si hay un término de búsqueda activo, actualiza los resultados
      if (terminoBusqueda) buscarContenido(terminoBusqueda);
    }
  };

  // Elimina un ítem de ambas listas y refresca búsqueda si hay término activo
  const eliminarItem = (id) => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => prev.filter(i => i.id !== id));
      if (terminoBusqueda) buscarContenido(terminoBusqueda);
    }
  };

  // este falta por implementar, pero es para editar un ítem
  const editarItem = (id) => {
    console.log('Editar', id);
  };

  return (
    <div className={styles.home}>

      {/* Header con el logo y los botones de vista + búsqueda */}
      <Header
        mostrarTodo={() => setVistaActual('todo')}
        mostrarPorVer={() => setVistaActual('porVer')}
        mostrarVistos={() => setVistaActual('vistos')}
        buscarContenido={buscarContenido}
      />

      {/* Vista completa: formulario y ambas listas */}
      {vistaActual === 'todo' && (
        <>
          <Formulario onSubmit={agregarItem} />

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
        </>
      )}

      {/* Solo lista "Por Ver" */}
      {vistaActual === 'porVer' && (
        <>
          <h2 className={styles.tituloSeccion}>Por Ver</h2>
          <ListarContenido
            lista={porVer}
            onEditar={editarItem}
            onEliminar={eliminarItem}
            onToggleVista={toggleVista}
          />
        </>
      )}

      {/* Solo lista "Vistos" */}
      {vistaActual === 'vistos' && (
        <>
          <h2 className={styles.tituloSeccion}>Vistos</h2>
          <ListarContenido
            lista={vistos}
            onEditar={editarItem}
            onEliminar={eliminarItem}
            onToggleVista={toggleVista}
          />
        </>
      )}

      {/* Resultados de búsqueda */}
      {resultado && (
        Array.isArray(resultado) ? (
          <>
            <h2 className={styles.tituloSeccion}>Resultados de búsqueda</h2>
            <ListarContenido
              lista={resultado}
              onEditar={editarItem}
              onEliminar={eliminarItem}
              onToggleVista={toggleVista}
            />
          </>
        ) : (
          <p className={styles.noEncontrado}>No se encontró ningún resultado.</p>
        )
      )}

      {/* Footer con información de contacto */}
      <Footer />
    </div>
  );
};

export default Home;