import styles from './Header.module.css';
import Titulo from '../Titulo/Titulo';
import Boton from '../Boton/Boton';
import { Film, Eye, EyeOff } from 'lucide-react';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Film size={32} />
        <Titulo text="Gestor de Películas y Series" />
      </div>
      <div className={styles.right}>
        <Boton text={<><Eye size={18} /> Visto</>} onClick={() => console.log('Mostrar vistos')} />
        <Boton text={<><EyeOff size={18} /> Por ver</>} onClick={() => console.log('Mostrar por ver')} />
      </div>
    </header>
  );
};

export default Header;




