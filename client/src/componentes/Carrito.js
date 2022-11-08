import React, { useContext, useEffect, useState } from "react";
import "./Carrito.css";
import CarritoFila from "./CarritoFila";
import { CarritoContext } from "../context/CarritoContext";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

function Carrito() {
  /* ------------- context ------------ */
  const { FETCHURL, usuario, setCarritoCant, NoAutenticado } =
    useContext(CarritoContext);

  /* ------------- states ------------- */
  const [carritoDB, setCarritoDB] = useState([]);
  const [total, setTotal] = useState(0);
  const [idCarrito, setIdCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const [final, setFinal] = useState(false);

  /* ------------- effect ------------- */
  //carga los datos del carrito
  useEffect(() => {
    setLoading(true);
    let id_carrito = null;

    if(!usuario["_id"]){
      NoAutenticado();
    }else{

    fetch(`${FETCHURL}/api/carrito/` + usuario["_id"], {
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          id_carrito = data.id_carrito;
          setIdCarrito(id_carrito);

          fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`)
            .then((response) => response.json())
            .then((data) => {
              setLoading(false);
              setCarritoDB(data);
            });
        }else{
          setLoading(false);
        }
      })
      .catch((error) => {
        NoAutenticado();
      });
    }



  }, [usuario, FETCHURL, NoAutenticado]);

  // calcula el total
  useEffect(() => {
    let newTotal = 0;
    carritoDB.forEach((el) => {
      newTotal += parseInt(el.precio);
    });
    setTotal(newTotal);
  }, [carritoDB]);

  /* ------------- methods ------------ */
  //borra una fila
  const handleDeleteRow = (id) => {
    let confirmar = window.confirm(`Desea borrar el articulo ${id} ?`);
    setLoading(true);
    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch(
        `${FETCHURL}/api/carrito/${idCarrito}/productos/${id}`,
        requestOptions
      )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
        .then((data) => cargarDatos())
        .catch((error) => {
          NoAutenticado();
        });
    }
  };

  //borra todo el carrito
  const handleDeleteCart = () => {
    
    let confirmar = window.confirm(`Desea borrar todos los articulos ?`);
    setLoading(true);
    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch(`${FETCHURL}/api/carrito/${idCarrito}`, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
        .then((data) => {
          setLoading(false);
          setCarritoCant(null);
          setCarritoDB([]);
        })
        .catch((error) => {
          NoAutenticado();
        });
    }
  };

  //carga los datos al estado
  const cargarDatos = () => {
    setLoading(true);
    fetch(`${FETCHURL}/api/carrito/${idCarrito}/productos`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCarritoDB(data);
        setCarritoCant(data.length);
      });
  };

  const handleTerminarCart = () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: usuario.username,
        nombre: usuario.nombre,
        id_carrito: idCarrito,
      }),
    };
    fetch(`${FETCHURL}/api/carrito/terminar`, requestOptions)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status);
      } else {
        return res.json();
      }
    })
      .then((data) => {
        setLoading(false);
        setCarritoDB([]);
        setCarritoCant(null);
        setFinal(true);
      })
      .catch((error) => {
        NoAutenticado();
      });
  };

  /* ------------- return ------------- */

  if (!usuario.username) {
    return <Navigate to="/Login" />;
  }

  if (final) {
    return (
      <div className="Carrito">
        <h1>CARRITO</h1>
        <div className="carrito_final">
          <div className="carrito_final_cont">
            <p className="final_texto_ayuda">Felicitaciones 🎉🎉</p>
            <h3 className="register_ok">PEDIDO RECIBIDO Y REGISTRADO</h3>
            <p className="final_texto">
              📦 Su pedido ya se encuentra recibido y esta siendo procesado por
              nuestros personal.
            </p>
            <p className="final_texto">
              📞 En breve nos pondremos en contacto con usted.
            </p>
            <p className="final_texto">
              📥 Por lo pronto, recibira un mensaje de texto, con la informacion
              de su pedido.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Carrito">
      <h1>CARRITO</h1>

      {loading ? (
        <>
          <Loader />
          <div className="No_hay">Procesando Solicitud...</div>
        </>
      ) : !carritoDB.length ? (
        <div className="No_hay">El carrito se encuentra vacio</div>
      ) : (
        <div className="Carrito__tabla">
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {carritoDB.map((el, index) => (
                <CarritoFila
                  key={index}
                  el={el}
                  handleDeleteRow={handleDeleteRow}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}></td>
                <td>TOTAL</td>
                <td>$ {total}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="Carrito__controls">
            <button
              onClick={() => handleDeleteCart(idCarrito)}
              className="tabla__eliminar"
            >
              Eliminar Todo
            </button>

            <button
              onClick={() => handleTerminarCart(idCarrito)}
              className="carrito__terminar"
            >
              Terminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
