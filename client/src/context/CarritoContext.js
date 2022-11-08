import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {Navigate } from "react-router-dom";

export const CarritoContext = createContext();



function CarritoContextContenedor({ children }) {
  /* ------ constante de conexion ----- */

  const FETCHURL = "http://localhost:8080";
  //const FETCHURL = "https://gabriel-ecommerce.herokuapp.com";

  /* -------------- state ------------- */
  //const [carritoId, setCarritoId] = useState(JSON.parse(localStorage.getItem("CarritoId")) || null);
  const [usuario, setUsuario] = useState({});
  const [carritoCant, setCarritoCant] = useState(null);
  const [admin, setAdmin] = useState(false);

/* ------------- methods ------------ */
  useEffect(() => {

    // al cargar, trae los datos del usuario
    fetch(`${FETCHURL}/signin`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
      setUsuario(data);
    });

  }, []);

  useEffect(() => {


    if(usuario['_id']){
      // si hay usuario, trae el carrito
      fetch(`${FETCHURL}/api/carrito/${usuario['_id']}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        // si hay carrito, trae los productos
        if(data){
          fetch(`${FETCHURL}/api/carrito/${data.id_carrito}/productos`, { credentials: 'include' })
          .then((res) => res.json())
          .then((data) => {
            
            setCarritoCant(data.length);
          });
        }else{
          setCarritoCant(null);
        }
      });
    }

  }, [usuario]);
  
  

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const actualizarCarritoCant = async (id_carrito) =>{

    try {

      let res3 = await fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`, { credentials: 'include' });
      let data3 = await res3.json();
      
      setCarritoCant(data3.length);
      
    } catch (error) {
      console.log(error);
    }

  }


  const CargarUsuario = (data) =>{
    setUsuario(data);
  }

  const NoAutenticado = () =>{
    CargarUsuario({});
    return <Navigate to="/Login" />
  }


/* ------------- return ------------- */
  return (
    <CarritoContext.Provider
      value={{
        FETCHURL,
        admin,
        usuario,
        carritoCant,
        handleAdmin,
        CargarUsuario,
        actualizarCarritoCant,
        setCarritoCant,
        NoAutenticado,
        setUsuario
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoContextContenedor;
