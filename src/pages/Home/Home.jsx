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
// array de contenido predefinido para probar filtros sin agregar manualmente items
// const contenidoPorDefecto = [
//   {
//     id: 1,
//     titulo: "The Matrix",
//     director: "Lana Wachowski, Lilly Wachowski",
//     anio: 1999,
//     genero: "Ciencia Ficción",
//     tipo: "Película",
//     rating: 9,
//     visto: true,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
//   },
//   {
//     id: 2,
//     titulo: "Stranger Things",
//     director: "The Duffer Brothers",
//     anio: 2016,
//     genero: "Suspenso",
//     tipo: "Serie",
//     rating: 8,
//     visto: false,
//     imagenUrl: "https://theculturednerd.org/wp-content/uploads/2020/03/stranger-1-cover.jpg"
//   },
//   {
//     id: 3,
//     titulo: "Interstellar",
//     director: "Christopher Nolan",
//     anio: 2014,
//     genero: "Ciencia Ficción",
//     tipo: "Película",
//     rating: 9,
//     visto: true,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
//   },
//   {
//     id: 4,
//     titulo: "Breaking Bad",
//     director: "Vince Gilligan",
//     anio: 2008,
//     genero: "Drama",
//     tipo: "Serie",
//     rating: 10,
//     visto: true,
//     imagenUrl: "data:image/jpeg;base64,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"
//   },
//   {
//     id: 5,
//     titulo: "La La Land",
//     director: "Damien Chazelle",
//     anio: 2016,
//     genero: "Romance",
//     tipo: "Película",
//     rating: 8,
//     visto: false,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png"
//   },
//   {
//     id: 6,
//     titulo: "The Crown",
//     director: "Peter Morgan",
//     anio: 2016,
//     genero: "Histórico",
//     tipo: "Serie",
//     rating: 7,
//     visto: false,
//     imagenUrl: "https://i.ebayimg.com/images/g/FgAAAOSwLxZhZOzG/s-l1200.jpg"
//   },
//   {
//     id: 7,
//     titulo: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     anio: 1994,
//     genero: "Crimen",
//     tipo: "Película",
//     rating: 9,
//     visto: true,
//     imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaefdLvPspoEfw0ZPP6iicoo1dFzUOgs35Qw&s"
//   },
//   {
//     id: 8,
//     titulo: "The Office",
//     director: "Greg Daniels",
//     anio: 2005,
//     genero: "Comedia",
//     tipo: "Serie",
//     rating: 8,
//     visto: false,
//     imagenUrl: "https://www.aestheticwalldecor.com/cdn/shop/files/the-office-tv-series-wall-art-classic-poster-aesthetic-wall-decor.jpg?v=1692555564"
//   },
//   {
//     id: 9,
//     titulo: "Parasite",
//     director: "Bong Joon-ho",
//     anio: 2019,
//     genero: "Drama",
//     tipo: "Película",
//     rating: 10,
//     visto: true,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png"
//   },
//   {
//     id: 10,
//     titulo: "Game of Thrones",
//     director: "David Benioff, D. B. Weiss",
//     anio: 2011,
//     genero: "Fantasía",
//     tipo: "Serie",
//     rating: 9,
//     visto: false,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/d/d8/Game_of_Thrones_title_card.jpg"
//   },
//   {
//     id: 11,
//     titulo: "The Godfather",
//     director: "Francis Ford Coppola",
//     anio: 1972,
//     genero: "Crimen",
//     tipo: "Película",
//     rating: 10,
//     visto: true,
//     imagenUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
//   },
//   {
//     id: 12,
//     titulo: "Dark",
//     director: "Baran bo Odar, Jantje Friese",
//     anio: 2017,
//     genero: "Misterio",
//     tipo: "Serie",
//     rating: 9,
//     visto: true,
//     imagenUrl: "https://ih1.redbubble.net/image.1582254751.3287/fposter,medium,wall_texture,product,750x1000.jpg"
//   },
//   {
//     id: 13,
//     titulo: "The Social Network",
//     director: "David Fincher",
//     anio: 2010,
//     genero: "Drama",
//     tipo: "Película",
//     rating: 8,
//     visto: false,
//     imagenUrl: "https://i.etsystatic.com/6285100/r/il/49d503/2435521859/il_570xN.2435521859_jupb.jpg"
//   },
//   {
//     id: 14,
//     titulo: "Friends",
//     director: "David Crane, Marta Kauffman",
//     anio: 1994,
//     genero: "Comedia",
//     tipo: "Serie",
//     rating: 8,
//     visto: true,
//     imagenUrl: "https://i.ebayimg.com/images/g/MI4AAOSwOmBeZ5Yr/s-l1200.jpg"
//   },
//   {
//     id: 15,
//     titulo: "The Grand Budapest Hotel",
//     director: "Wes Anderson",
//     anio: 2014,
//     genero: "Comedia",
//     tipo: "Película",
//     rating: 8,
//     visto: false,
//     imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNByZngN9fDYK7QzJsgu1qMhK3pFMw1GMOA&s"
//   }
// ];

// const vistos = contenidoPorDefecto.filter(item => item.visto);
// const porVer = contenidoPorDefecto.filter(item => !item.visto);

// localStorage.setItem('vistos', JSON.stringify(vistos));
// localStorage.setItem('porVer', JSON.stringify(porVer));

// console.log("Contenido por defecto cargado en localStorage ✅");
