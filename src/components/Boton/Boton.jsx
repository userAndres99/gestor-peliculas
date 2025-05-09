import React from "react";
import styles from "./Boton.module.css";

const Boton = ({ text, onClick, variante, type = "button" }) => {
    //Hermoso uso de variant aca
    const estilosDisponibles = ["buscar","agregar","editar", "eliminar", "marcar", "desmarcar","primario", "secundario","home"];
    const claseVariante = estilosDisponibles.includes(variante) ? styles[variante] : styles.secundario;

    return (
        <button
            type={type}
            className={`${styles.boton} ${claseVariante}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
export default Boton;