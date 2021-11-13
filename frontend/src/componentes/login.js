import React, { useState } from "react";
import ComputadoraDataService from "../servicios/computadora";
import "../estilos/estiloPagina.css"
import "../estilos/estiloLogin.css"
import { Link } from "react-router-dom";


const Login = props => {

  const initialUserState = {
    usuario: "",
    contraseña: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    ComputadoraDataService.getUsuario(user.usuario, user.contraseña)
      .then(response => {
        if (response.data.usuario === "Invalido"){
          alert("El usuario o contraseña es incorrecto")
        }
        else{
          const loguear = {
            usuario: response.data.user[0].usuario,
            contraseña: response.data.user[0].contraseña,
          }
          props.login(loguear)
          props.history.push('/');
        }
    }).catch(e => {
      console.log(e);
    });
  }

 
  return (
    
    
    <div className="login-page" >
      <div className="form">
        <div className="login-form">
          <input type="text" 
            placeholder="Nombre"
            className="form-control"
            id="usuario"
            value={user.usuario}
            onChange={handleInputChange}
            name="usuario"/>

          <input type="password" 
            className="form-control"
            id="contraseña"
            placeholder="Contraseña"
            value={user.contraseña}
            onChange={handleInputChange}
            name="contraseña"
            />
          <button onClick={login} className="botonesLogin" >login</button>
          <p class="message">No estas registrado? <a href="#"><Link to={"/registro"}>
            Crea una cuenta
            </Link></a></p>
        </div>
      </div>
    </div>
    
  );
};

export default Login;