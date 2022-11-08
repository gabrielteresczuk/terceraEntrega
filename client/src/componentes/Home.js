import React, { useContext, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Navigate } from "react-router-dom";
import "./Home.css";

function Home() {
  /* ------------- context ------------ */
  const {FETCHURL, usuario,CargarUsuario} = useContext(CarritoContext);

  useEffect(() => {
    fetch(`${FETCHURL}/signin`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      CargarUsuario(data);
    });
  }, [FETCHURL]);


  // si NO hay usuario, al login
  if (!usuario.username) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="Home">
      <h1>Home</h1>
      <hr className="hr_titulo"></hr>
      <div className="home_grid">
        <div className="home_grid_col1">
          <img
            className="home_avatar"
            alt="avatar"
            src={`${FETCHURL}/uploads/${usuario.avatar}`}
          ></img>
          <h3>{usuario.username}</h3>
        </div>
        <div className="home_grid_col2">
          <h3>Datos</h3>
          <hr></hr>
          <p>
            <b>Nombre:</b> {usuario.nombre}
          </p>
          <p>
            <b>Direccion:</b> {usuario.direccion}
          </p>
          <p>
            <b>Edad:</b> {usuario.edad} años
          </p>
          <p>
            <b>Telefono:</b> {usuario.telefono}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
