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

  // Elimina un ítem de ambas listas
  const eliminarItem = (id) => {
    if (window.confirm('¿Eliminar este contenido?')) {
      setVistos(prev => prev.filter(i => i.id !== id));
      setPorVer(prev => prev.filter(i => i.id !== id));
    }
  };

  // este falta por implementar, pero es para editar un ítem
  const editarItem = (id) => {
    console.log('Editar', id);
  };


  const [resultado, setResultado] = useState(null);

  const buscarContenido = (val) =>{
    const encontrado = vistos.find(item => item.titulo === val);
    if(encontrado){
      setResultado(encontrado || 'no encontrado')
    }

  

    

  }



 

  return (
    <div className={styles.home}>

      {/* Header con el logo y los botones de vista...(esta fue la forma que me salio para cambiar entre listados) */}
      <Header
        mostrarTodo={() => setVistaActual('todo')}
        mostrarPorVer={() => setVistaActual('porVer')}
        mostrarVistos={() => setVistaActual('vistos')}
        buscarContenido={buscarContenido}
      />

      {/* Vista completa: formulario y ambas listas (en verdad voy a sacar ambas listas de aca para dejar solo el formulario...pero es para ir probando)*/}
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

      {resultado ? (
        resultado === 'No encontrado' ? (
          <p>No se encontro resultado</p>
        ): (
          <div> 
            <h3>Titulo encontrado:</h3>
            <p>{resultado.titulo}</p>

          </div>
        )
      ):null}



    

      <Footer />
    </div>
  );
  

  

};

export default Home;
