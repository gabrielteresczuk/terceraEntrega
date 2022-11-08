import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import Forbidden from "./Forbidden";
import "./Form.css";

// valor inicial para el documento
let initailForm = {
  id: null,
  nombre: "",
  descripcion: "",
  codigo: "",
  foto: "",
  precio: "",
  stock: "",
};

function Form() {
  /* ------------- context ------------ */
  const { FETCHURL, admin } = useContext(CarritoContext);

  /* ------------- params ------------- */
  const { id } = useParams();

  /* ------------- states ------------- */
  const [form, setForm] = useState(initailForm);
  const [cargado, setCargado] = useState(null);

  /* ------------- effect ------------- */
  useEffect(() => {
    setCargado(null);
    if (id) {
      fetch(`${FETCHURL}/api/productos/` + id)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id, FETCHURL]);

  /* ------------- methods ------------ */
  // cada vez que se modifica un campo
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //al enviar el form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };

  //reinicia el form
  const handleReset = () => {
    setForm(initailForm);
  };

  //envia el registro POST
  const createData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, administrador: admin }),
    };
    fetch(`${FETCHURL}/api/productos`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setCargado(data.id);
        }
      });
  };

  //envia el registro PUT
  const updateData = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, administrador: admin }),
    };
    fetch(`${FETCHURL}/api/productos/` + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setCargado(data.id);
        }
      });
  };

  //Editamos el archivo recien cargado
  const handleEdit = (id) => {
    console.log("modificar");
    setCargado(null);
    if (id) {
      fetch(`${FETCHURL}/api/productos/` + id)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  };

  //creamos un nuevo form
  const handleNew = () => {
    setCargado(null);
  };

  /* ------------- return ------------- */

  if (!admin) {
    return <Forbidden />;
  } else {
    return (
      <div className="Form">
        <h1> Formulario de Carga</h1>
        {cargado ? (
          <div className="Form__cont">
            <div className="formulario">
              <div className="form__msg">
                El producto id: {cargado} se {id ? "modifico" : "cargo"}{" "}
                correctamente
              </div>
              <div className="Form__submit__cont">
                <NavLink to={"/"} className="Form__btn__sec">
                  Listado
                </NavLink>
                <button
                  className="Form__btn"
                  onClick={() => handleEdit(cargado)}
                >
                  Modificar
                </button>
                <button className="Form__btn" onClick={handleNew}>
                  Nuevo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="Form__cont">
            <form action="post" className="formulario" onSubmit={handleSubmit}>
              <div className="Form__input__cont">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  onChange={handleChange}
                  value={form.nombre}
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Placa de Video"
                  required
                />
              </div>
              <div className="Form__input__cont">
                <label htmlFor="descripcion">Descriforcapcion:</label>
                <input
                  onChange={handleChange}
                  value={form.descripcion}
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Construido con RT Cores y Tensor Cores ..."
                  required
                />
              </div>
              <div className="Form__input__cont">
                <label htmlFor="codigo">Codigo:</label>
                <input
                  onChange={handleChange}
                  value={form.codigo}
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="1014"
                  required
                />
              </div>
              <div className="Form__input__cont">
                <label htmlFor="foto">Foto:</label>
                <input
                  onChange={handleChange}
                  value={form.foto}
                  type="url"
                  id="foto"
                  name="foto"
                  placeholder="placa.png"
                  required
                />
              </div>
              <div className="Form__input__cont">
                <label htmlFor="precio">Precio:</label>
                <input
                  onChange={handleChange}
                  value={form.precio}
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="150000"
                  required
                />
              </div>
              <div className="Form__input__cont">
                <label htmlFor="stock">Stock:</label>
                <input
                  onChange={handleChange}
                  value={form.stock}
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="20"
                  required
                />
              </div>
              <div className="Form__submit__cont">
                <input type="reset" value="Reset" className="Form__btn__sec" />
                <input
                  type="submit"
                  value={id ? "Modificar" : "Guardar"}
                  className="Form__btn"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Form;
