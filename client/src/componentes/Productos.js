import React, {  useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./Productos.css";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import { CarritoContext } from "../context/CarritoContext";

function Productos() {

/* ------------- context ------------ */

  const {FETCHURL, admin,CargarUsuario} = useContext(CarritoContext);

/* ------------- states ------------- */

  const [productosDB, setProductosDB] = useState(null);
  const [orden, setOrden] = useState(0);

/* ------------- effect ------------- */

  /*useEffect(() => {
    console.log('login');
    fetch(`${FETCHURL}/signin`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      console.log('carga');
      CargarUsuario(data);
    });
  }, [FETCHURL]);*/
  
  useEffect(() => {

    fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosDB(data);
        fetch(`${FETCHURL}/signin`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          CargarUsuario(data);
        });
      });
  }, [FETCHURL]);

  useEffect(() => {

    fetch(`${FETCHURL}/api/productos/precio/${orden}`)
      .then((res) => res.json())
      .then((data) => {
        setProductosDB(data);
      });

  }, [orden])
  

  /* ------------- methods ------------ */

  // borra 1 producto
  const handleDelete = (id) => {

    let confirmar = window.confirm(`Desea borrar el articulo ${id} ?`);

    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({administrador:admin})
      };
      fetch(`${FETCHURL}/api/productos/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error){
            console.log(data);
          }else{
            cargarDatos();
          }
        });
    }
  };

  // recarga el state ProductosDB
  const cargarDatos = () => {
    fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosDB(data);
      });
  };

  const handleOrden = (event) => {
    setOrden(event.target.value);

    //console.log(event.target.value);

  }

  /* ------------- return ------------- */

  return (
    <div className="Productos">
      <h1>PRODUCTOS</h1>
      {!productosDB ? (
        <Loader />
      ) : (
        <>
          {admin && (
            <div className="Productos_admin">
              <NavLink className="Productos__btn" to={"/Productos/form"}>
                Cargar un Producto +
              </NavLink>
            </div>
          )}
          <div className='productos_orden_cont'>
            <div className='productos_orden'>
              <span>{productosDB.length} Resultados</span>
              <select className='articulo-lista__cont-select' onChange={handleOrden} value={orden}>
                  <option value="0">Mas Relevante</option>
                  <option value="-1">Menor Precio</option>
                  <option value="1">Mayor Precio</option>
              </select>
            </div>
          </div>

          <div className="Cards__container">
            {productosDB.map((producto) => (
              <Card
                admin={admin}
                key={producto.id}
                producto={producto}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Productos;
