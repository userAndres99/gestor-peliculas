// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Formulario from '../../components/Formulario/Formulario';
import ListarContenido from '../../components/ListaContenido/ListarContenido';
import Filtro from '../../components/Filtro/Filtro';

const Home = () => {
  // Estado inicial de las listas: 'vistos' y 'porVer'
  // Se inicializan desde localStorage o como listas vacías
  const [vistos, setVistos] = useState(() => JSON.parse(localStorage.getItem('vistos')) || []);
  const [porVer, setPorVer] = useState(() => JSON.parse(localStorage.getItem('porVer')) || []);

  // Vista actual: 'todo', 'porVer' o 'vistos'
  // 'todo' muestra solo el formulario
  // 'porVer' muestra solo los no vistos
  // 'vistos' muestra solo los vistos
  const [vistaActual, setVistaActual] = useState('todo');

  // Estados para búsqueda
  // terminoBusqueda almacena el valor buscado
  // resultado guarda los ítems encontrados o null
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);

  // Estados para filtros de género y tipo
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  // Guardar listas en localStorage al cambiar
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

  // Actualizar resultados si cambian listas durante búsqueda activa
  useEffect(() => {
    if (terminoBusqueda) buscarContenido(terminoBusqueda);
  }, [porVer, vistos]);

  // Funcion para aplicar filtros de género y tipo a cualquier lista
  // lista es la lista a filtrar (porVer o vistos)
  // .filter lo puse para que fultre los resultados según el género y tipo 
  const aplicarFiltros = (lista) => {
    return lista
      .filter(item => !filtroGenero || item.genero === filtroGenero)
      .filter(item => !filtroTipo    || item.tipo   === filtroTipo);
  };

  // Alterna el estado visto/no visto moviendo el ítem entre listas
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

  // TODAVIA FALTA HACER LA FUNCION DE EDITAR ITEM
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
      {resultado ? (
        Array.isArray(resultado) ? (
          <>
            <h2 className={styles.tituloSeccion}>Resultados de búsqueda</h2>
            <ListarContenido
              lista={aplicarFiltros(resultado)}
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
          {/* Filtros de género y tipo */}
          <Filtro
            genero={filtroGenero}
            tipo={filtroTipo}
            onChangeGenero={setFiltroGenero}
            onChangeTipo={setFiltroTipo}
          />

          {vistaActual === 'todo' && (
            <>
              <Formulario onSubmit={agregarItem} />
            </>
          )}

          {vistaActual === 'porVer' && (
            <>
              <h2 className={styles.tituloSeccion}>Por Ver</h2>
              <ListarContenido
                lista={aplicarFiltros(porVer)}
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
                lista={aplicarFiltros(vistos)}
                onEditar={editarItem}
                onEliminar={eliminarItem}
                onToggleVista={toggleVista}
              />
            </>
          )}
        </>
      ) }

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
