import React, { useContext, useRef, useState } from 'react'

import { Link } from "react-router-dom";
import { CarritoContext } from '../context/CarritoContext';

import 'react-phone-number-input/style.css'
//import PhoneInput from 'react-phone-number-input'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'

import './Register.css'

// valor inicial para el documento
let initailForm = {
    //id: null,
    username: "",
    password: "",
    nombre:"",
    direccion:"",
    edad:"",
  };
  

function Register() {

/* ------------- context ------------ */
const {FETCHURL} = useContext(CarritoContext);

/* ------------- states ------------- */

    const [form, setForm] = useState(initailForm);
    const [archivo, setArchivo] = useState('');
    const [registrado, setRegistrado] = useState(false);
    const [telefono, setTelefono] = useState();

    const telefonoRef = useRef(null)

    /* ------------- metodos ------------ */

    

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

//al enviar el form
  const handleSubmit = (e) => {
    e.preventDefault();

    createData(form);
  };

  const handleArchivo = (e) =>{
    setArchivo(e.target.files[0]);
  }

  //envia el registro POST

  const validarTelefono = () =>{

    if(telefono && isPossiblePhoneNumber(telefono)){
      
      telefonoRef.current.style.color = '#000000';
      return true
    }else{
      //console.log('false');
      telefonoRef.current.style.color = '#EF5350'
      telefonoRef.current.focus();
      return false
    }

  }

  const createData = () =>{

    if(validarTelefono()){

      const formData = new FormData();    // formData es para poder mandar el archivo
      formData.append('avatar', archivo); // agregar el valor dal documento
      for (const key in form) {
        formData.append(key, form[key]);
      }
      formData.append('telefono', telefono);

      const requestOptions = {
        method: "POST",                   // sin header
        body: formData,
      };

      fetch(`${FETCHURL}/signup`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.resp === 'ok'){
          setRegistrado(true);
        }
      });
    }
  }

    

  return (
    <div className="Register">



        <div className='register_cont'>
        <div className="register_titulo">
            <h1>REGISTRO</h1>
            <span className="material-symbols-outlined register_icon_size">person</span>
        </div>
        {!registrado ? (<>
        <p className="register_texto_ayuda">ingrese sus datos</p>
        
        <form method="post" action="/register" id="register_form" className="register_form" autoComplete="off" onSubmit={handleSubmit}>

            <label htmlFor="username">email:</label>
            <input type="email" name="username" id="username" required className="register_form_input" onChange={handleChange} value={form.username} placeholder="email@coder.com"/>
            <label htmlFor="password">Contraseña:</label>
            <input type="text" name="password" id="password" required className="register_form_input" onChange={handleChange} value={form.password} placeholder='contraseña'/>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre" required className="register_form_input" onChange={handleChange} value={form.nombre} placeholder='Gabriel Tere'/>
            <label htmlFor="direccion">Direccion:</label>
            <input type="text" name="direccion" id="direccion" required className="register_form_input" onChange={handleChange} value={form.direccion} placeholder='calle fake 1122'/>
            <label htmlFor="edad">Edad:</label>
            <input type="number" name="edad" id="edad" required className="register_form_input" onChange={handleChange} value={form.edad} placeholder='18'/>
            <label htmlFor="telefono">Telefono:</label>
            <PhoneInput
              autoComplete="off"
              ref={telefonoRef}
              required
              name="phoneInput"
              defaultCountry="AR"
              placeholder="Numero de telefono"
              value={telefono}
              onChange={setTelefono}
              onKeyUp={validarTelefono}
            />
            
            {/*}<input type="text" name="telefono" id="telefono" required className="register_form_input" onChange={handleChange}/>{*/}
            <label htmlFor="avatar">Avatar:</label>
            <input type="file" accept="image/*" name="avatar" id="avatar" required className="register_form_input" onChange={handleArchivo}/>
            <input type="submit" value="Registrar" className="register_btn"/>
            <div id="reg_msg"></div>
            <div className="register_reg_cont">
            <Link to={"/Login"}>Login</Link>
            </div>
        </form>

        </>) : (<>
          <p className="register_texto_ayuda">Completado</p>
          <h3 className="register_ok">USUARIO REGISTRADO CORRECTAMENTE</h3>
          <p className="register_texto_ayuda">Pruebe ingresando a su Usuario haciendo <Link to={"/Login"}>Click Aqui!</Link></p>
        </>)}
    </div>
    
</div>
  )
}

export default Register