import styles from './Header.module.css';
import Titulo from '../Titulo/Titulo';
import Boton from '../Boton/Boton';
import { Film, Eye, EyeOff } from 'lucide-react';
import { Buscador } from '../Buscador/Buscador';

const Header = ({ mostrarVistos, mostrarPorVer, mostrarTodo, buscarContenido }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Film size={32} onClick={mostrarTodo} /> {/* puse para que el logo sea el "mostrar todo"*/}
        <Titulo text="Gestor de Películas y Series" />
      </div>
      <div className={styles.center}>
        <Buscador buscarContenido={ buscarContenido}></Buscador>
      </div>
      <div className={styles.right}>
        <Boton text={<><Eye size={18} /> Visto</>} onClick={mostrarVistos} />
        <Boton text={<><EyeOff size={18} /> Por ver</>} onClick={mostrarPorVer} />
      </div>
    </header>
  );
};

export default Header;





