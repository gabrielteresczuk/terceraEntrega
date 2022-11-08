import React from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";

function Card({ admin, producto, handleDelete }) {
  //devolvemos una card
  return (
    <div className="Card">
      <p className="Card__id"># {producto.id.toString().padStart(3, 0)}</p>
      <img
        className="Card__img"
        src={producto.foto}
        alt="img"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://daemondroid.com/posts/error-this-picture-is.png";
        }}
      ></img>
      <p className="Card__nombre">{producto.nombre}</p>
      <p className="Card__desc">{producto.descripcion}</p>
      <p className="Card__precio">{producto.precio}$</p>
      <div className="Card__Controls">
        <NavLink to={"/Producto/" + producto.id} className="Card__btn">
          Detalle
        </NavLink>
      </div>
      {admin && (
        <div className="Card__Admin__Controls">
          <button
            onClick={() => handleDelete(producto.id)}
            className="Card__btn Card__red"
          >
            Eliminar
          </button>
          <NavLink
            to={"/Productos/form/" + producto.id}
            className="Card__btn Card__green"
          >
            Modificar
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Card;
