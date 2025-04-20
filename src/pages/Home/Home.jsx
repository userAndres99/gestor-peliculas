// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListarContenido from '../../components/ListaContenido/ListarContenido';

const Home = () => {
  
  // Estado inicial de las listas: 'vistos' y 'porVer'
  // Se inicializan desde localStorage o como listas vacías
  const [vistos, setVistos] = useState(() => JSON.parse(localStorage.getItem('vistos')) || []);
  const [porVer, setPorVer] = useState(() => JSON.parse(localStorage.getItem('porVer')) || []);

  // Vista actual: 'todo', 'porVer' o 'vistos'
  //todo ahora solo muestra el formulario
  //porVer muestra solo los no vistos
  //vistos muestra solo los vistos
  const [vistaActual, setVistaActual] = useState('todo');

  // Estado para almacenar el término de búsqueda y resultados
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);

  // Guardar listas en localStorage al cambiar
  // Se ejecuta cada vez que cambia la lista de vistos o porVer
  useEffect(() => {
    localStorage.setItem('vistos', JSON.stringify(vistos));
  }, [vistos]);
  useEffect(() => {
    localStorage.setItem('porVer', JSON.stringify(porVer));
  }, [porVer]);

  // Agregar nuevo ítem según estado visto o no visto
  const agregarItem = (item) => {
    if (item.visto) setVistos(prev => [...prev, item]);
    else setPorVer(prev => [...prev, item]);
  };

  // esto lo que hace es buscar en la lista de porVer y vistos
  //val es el valor de búsqueda
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

  // Actualizar resultados si cambian listas durante búsqueda activa
  //esto me estaba dando porque cuando buscaba algo y lo cambiaba a porVer o visto no se actualizaba la lista
  //por eso lo que hice fue que si hay un valor en la busqueda se actualiza la lista
  useEffect(() => {
    if (terminoBusqueda) buscarContenido(terminoBusqueda);
  }, [porVer, vistos]);

  // toggleVista cambia el estado de un ítem entre visto y por ver
  // el id es lo que es.... el id del ítem que se quiere cambiar
  const toggleVista = (id) => {
    const itemPorVer = porVer.find(i => i.id === id);
    if (itemPorVer) {
      setPorVer(prev => prev.filter(i => i.id !== id));
      setVistos(prev => [...prev, { ...itemPorVer, visto: true }]);
      return;
    }
    const itemVisto = vistos.find(i => i.id === id);
    if (itemVisto) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => [...prev, { ...itemVisto, visto: false }]);
    }
  };

  // Eliminar ítem
  const eliminarItem = (id) => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => prev.filter(i => i.id !== id));
    }
  };

  // Placeholder de editar
  const editarItem = (id) => console.log('Editar', id);

  return (
    <div className={styles.home}>

      <Header
        mostrarTodo={() => { setVistaActual('todo'); setResultado(null); setTerminoBusqueda(''); }}
        mostrarPorVer={() => { setVistaActual('porVer'); setResultado(null); setTerminoBusqueda(''); }}
        mostrarVistos={() => { setVistaActual('vistos'); setResultado(null); setTerminoBusqueda(''); }}
        buscarContenido={buscarContenido}
      />

      {/*--------------------------------------- Si hay búsqueda activa, mostrar solo resultados---------------- */}
      {/* supongo que debe hacer una mejor manera de hacerlo */}
      { resultado ? (
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
      ) : (
        /*---------------------------- Vista normal ---------------------------------------*/
        <>
          {vistaActual === 'todo' && (
            <>
              <Formulario onSubmit={agregarItem} />
            </>
          )}

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
        </>
      ) }

      <Footer />
    </div>
  );
};

export default Home;