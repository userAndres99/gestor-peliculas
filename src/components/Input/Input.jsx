import styles from './Input.module.css';
//Value es el valor del input
//onChange es la funcion que se ejecuta cuando cambia el valor del input
const Input = ({onChange,value}) => {

  const ManejadorCambio = (evento) => {
    //console.log(evento.target.value);
    onChange(evento.target.value);
  }

  return <input className={styles.input} value={value} onChange={ManejadorCambio} />
}

export default Input;