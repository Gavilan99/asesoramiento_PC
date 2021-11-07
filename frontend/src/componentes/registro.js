import React, { useState } from "react";
import ComputadoraDataService from "../servicios/computadora";
import "../estilos/estiloLogin.css"
import { Link } from "react-router-dom";

const Registro = props => {

  const initialUserState = {
    usuario: "",
    contraseña: "",
    repetircontraseña: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const registro = () => {
    if(user.contraseña === user.repetircontraseña){
        ComputadoraDataService.getNombreUsuario(user.usuario)
    .then(response => {
        if (response.data.user.length > 0 && response.data.user[0].usuario === user.usuario){
          alert(`El nombre de usuario ${user.usuario} ya existe. Ingrese uno distinto.`)
        }
        else{
          ComputadoraDataService.postUsuario(user)
          .then(respuesta =>{
            props.history.push('/login'); //te lleva a loguearte
          })  
          .catch(er => {
            console.log(er);
          });
        }
    }).catch(e => {
      console.log(e);
    });
    }
    else {
        alert("Las contraseñas son distintas.") //puso otra contraseña en confirmar contraseña
    }
  }

  return (
    
    
<div class="login-page">
      <div class="form" >
        <div>
          <input type="text" 
            placeholder="Nombre"
            className="form-control"
            id="usuario"
            value={user.usuario}
            onChange={handleInputChange}
            name="usuario"/>
          <input type="password" 
            placeholder="Contraseña"
            className="form-control"
            id="contraseña"
            value={user.contraseña}
            onChange={handleInputChange}
            name="contraseña"/>
          <input type="password" 
            placeholder="Repetir contraseña"
            className="form-control"
            id="repetircontraseña"
            value={user.repetircontraseña}
            onChange={handleInputChange}
            name="repetircontraseña"/>
          <button onClick={registro} className="botonesLogin" >crear</button>
          <p class="message">Ya estas registrado? <a href="#"><Link to={"/login"}>
            Ingresa
            </Link></a></p>
        </div>
      </div>
    </div>


    
    
  );
};

export default Registro;