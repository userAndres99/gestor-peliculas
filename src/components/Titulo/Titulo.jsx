import styles from './Titulo.module.css'; 

const Titulo = ({ text }) => {
    return <h1 className={styles.titulo}>{text}</h1>;
};

export default Titulo;
