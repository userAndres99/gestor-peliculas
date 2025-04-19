import styles from './Boton.module.css'; // Importa el archivo CSS para los estilos

//el boton es un componente que recibe un texto y una funcion onClick
//el text hace referencia al texto que se mostrara en el boton
//la funcion onClick es la que se ejecutara al hacer clic en el boton

const Boton = ({ text, onClick }) => {
    return <button className={styles.boton} onClick={onClick} >{text}</button>;
};

export default Boton;