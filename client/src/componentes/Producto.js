import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { NavLink } from "react-router-dom";
import "./Producto.css";
import Loader from "./Loader";

function Producto() {

/* ------------- context ------------ */

  const {FETCHURL,usuario,actualizarCarritoCant, NoAutenticado } = useContext(CarritoContext);

/* ------------- states ------------- */

  const [productoById, setProductoById] = useState(null);
  //const [cantidad, setCantidad] = useState(1);
  const [agregarLoad, setAgregarLoad] = useState(false);
  const [agregado, setAgregado] = useState(false);
  const { id } = useParams();

/* ------------- effect ------------- */

  useEffect(() => {
    fetch(`${FETCHURL}/api/productos/` + id)
      .then((res) => res.json())
      .then((data) => {
        setProductoById(data);
      });
  }, [id,FETCHURL]);

  /*const handleCantidad = (valor) =>{
        let newCantidad = cantidad + valor;

        if (newCantidad < 1){
            newCantidad = 1;
        }else if(newCantidad > 20){
            newCantidad = 20;
        }

        setCantidad(newCantidad);
    }*/

/* ------------- methods ------------ */

  // agrega el producto al carrito
  const handleAgregar = async () => {

    let id_carrito = null;

    await fetch(`${FETCHURL}/api/carrito/` + usuario['_id'],{ credentials: 'include' })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data){
        id_carrito=data.id_carrito;
      }
    }).catch((error) => {
      NoAutenticado();
    });
    

    // si no existe un carrito lo crea
    if (!id_carrito) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id_usuario:usuario['_id']}),
        credentials: "include",
      };
      fetch(`${FETCHURL}/api/carrito`, requestOptions)
        .then((response) => response.json())
        .then((data) => {

          guardarProducto(data.id);
        });
    } else {
    // si existe el carrito, solo guarda
      guardarProducto(id_carrito);
    }
  };

  // guarda el producto en el carrito
  const guardarProducto = (id_carrito) => {
    //console.log(id_carrito);
    setAgregarLoad(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id_prod: id }),
    };
    fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAgregarLoad(false);
        setAgregado(true);
        actualizarCarritoCant(id_carrito);
      });
  };

/* ------------- return ------------- */

  if(!productoById){
    return (<div className="Producto"><Loader/></div>)
  }else{ 


  return (
    <div className="Producto">
      {productoById && (
        <>
          <h1>{productoById.nombre}</h1>
          <div className="Producto__grid">
            <div className="Producto__grid__img">
              <img src={productoById.foto} alt="producto"></img>
            </div>
            <div className="Producto__grid__text">
              <p className="grid__codigo">Cod. {productoById.codigo}</p>
              <p className="grid__nombre">{productoById.nombre}</p>
              <p className="grid__descripcion">{productoById.descripcion}</p>
              <p className="grid__stock">{productoById.stock} unidades</p>
              <p className="grid__precio">
                ${parseInt(productoById.precio).toLocaleString("es")}
              </p>
              <div className="grid__controls">
                {/*<div className='grid__cantidad'>
                        <button onClick={()=>{handleCantidad(-1)}}>-</button>
                        <div>{cantidad}</div>
                        <button onClick={()=>{handleCantidad(1)}}>+</button>
                    </div>*/}
                    
                { agregarLoad ? <>Procesando...</> :
                  agregado ? (
                  <>
                    <p className="Producto__ok">Producto Agregado!</p>
                    <NavLink to={"/Carrito"} className="Producto__btn">
                      Ir al Carrito
                    </NavLink>
                  </>
                ) : (
                  usuario.username ?
                  <button className="Producto__btn" onClick={handleAgregar}>
                    Agregar al Carrito
                  </button>
                  :
                  <div>Ingresa para realizar compras <Link to={"/Login"}>Login!</Link></div>
                )
                }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

}

export default Producto;
