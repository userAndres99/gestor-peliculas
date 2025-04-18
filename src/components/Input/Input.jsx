// src/components/Input/Input.jsx
import styles from './Input.module.css';

// name --> nombre del input (y tamb para id)
// value --> valor del input
// onChange --> función para manejar el cambio en el input
// type --> tipo de input (por defecto 'text')

const Input = ({ name, value, onChange, type = 'text' }) => {
  return (
    <input
      className={styles.input}
      name={name}
      id={name}
      type={type}
      value={value}
      onChange={onChange}        // lo que hay dentro del onChange es ------> ()=> onChange(event.target.value)
    />
  );
};

export default Input;
