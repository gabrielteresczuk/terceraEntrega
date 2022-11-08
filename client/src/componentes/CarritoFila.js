import React from "react";

function CarritoFila({ el, handleDeleteRow }) {
  //retornamos una linea de tabla
  return (
    <tr className="CarritoFila">
      <td>
        <img src={el.foto} alt="foto" />
      </td>
      <td>{el.nombre}</td>
      <td>$ {el.precio}</td>
      <td>1</td>
      <td>$ {el.precio}</td>
      <td>
        <button
          onClick={() => {
            handleDeleteRow(el.id);
          }}
          className="tabla__eliminar"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default CarritoFila;
