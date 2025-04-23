import styles from './Header.module.css';
import Titulo from '../Titulo/Titulo';
import Boton from '../Boton/Boton';
import { Film, Eye, EyeOff, Home } from 'lucide-react';
import { Buscador } from '../Buscador/Buscador';

const Header = ({ mostrarVistos, mostrarPorVer, mostrarTodo, buscarContenido }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Boton  text={<div className={styles.film}><Film/></div>} onClick={mostrarTodo} variante={"home"}></Boton>

        <Titulo text="Gestor de Películas y Series" />
      </div>
      <div className={styles.center}>
        <Buscador buscarContenido={ buscarContenido}></Buscador>
      </div>
      <div className={styles.right}>
        <Boton text={<div className={styles.eye}><Eye size={18} /> Visto</div>} onClick={mostrarVistos} variante={"primario"} />
        <Boton text={<div className={styles.eyeOff}><EyeOff size={18} /> Por ver</div>} onClick={mostrarPorVer} variante={"primario"}/>
      </div>
    </header>
  );
};

export default Header;





