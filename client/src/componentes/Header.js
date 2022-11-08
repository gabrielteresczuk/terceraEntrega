import React, { useContext } from "react";
import "./Header.css";
import { Link,Navigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

function Header() {
  /* ------------- context ------------ */

  const { FETCHURL, admin, handleAdmin, usuario, CargarUsuario, carritoCant } =
    useContext(CarritoContext);

  /* ------------- metodo ------------- */

  // al presionar logout, borra la session y luego el user
  const handleLogout = () => {
    fetch(`${FETCHURL}/logout`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        CargarUsuario({});
        return <Navigate to="/Login" />;
      });
  };

  /*const handlePrueba = () =>{ 

  fetch(`${FETCHURL}/login`, { credentials: 'include' })
  .then((response) => response.json())
  .then((data) => console.log(data));

}*/

  /* ------------- return ------------- */

  return (
    <div className="Header">
      <h1 className="Header__logo">
        <strong>Virtual</strong>
        <span>STORE</span>
      </h1>
      <ul className="Header__ul">
        <li>
          <Link to={"/"}>
            <span className="material-symbols-outlined">shopping_bag</span>
            Productos
          </Link>
        </li>
      </ul>

      <ul className="Header__ul">
        <li>
          {usuario.username ? (
            <Link to={"/Home"}>
              <span className="material-symbols-outlined">account_circle</span>
              Perfil
            </Link>
          ) : (
            <Link to={"/Login"}>
              <span className="material-symbols-outlined">login</span>
              Login
            </Link>
          )}
        </li>
        <li>
          {usuario.username && (
            <Link to={"/Carrito"}>
              {carritoCant ? (
                <span className="header_cart">{carritoCant}</span>
              ) : (
                ""
              )}
              <span className="material-symbols-outlined">shopping_cart</span>
              Carrito
            </Link>
          )}
        </li>
        <li>
          {usuario.username && (
            <button className="header_logout" onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span> Logout
            </button>
          )}
        </li>
      </ul>

      {/*}<button onClick={handlePrueba}>Pruebaa</button>{*/}
      {usuario.username && (
        <div className="Header__admin">
          ADMIN
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleAdmin}
              defaultChecked={admin}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Header;
