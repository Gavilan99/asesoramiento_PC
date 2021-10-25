import React, { useState } from "react";
import ComputadoraDataService from "../servicios/computadora";


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
    
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            value={user.usuario}
            onChange={handleInputChange}
            name="usuario"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">Contraseña</label>
          <input
            type="text"
            className="form-control"
            id="contraseña"
            value={user.contraseña}
            onChange={handleInputChange}
            name="contraseña"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">Repetir contraseña</label>
          <input
            type="text"
            className="form-control"
            id="repetircontraseña"
            value={user.repetircontraseña}
            onChange={handleInputChange}
            name="repetircontraseña"
          />
        </div>
        <br/>
        <button onClick={registro} class="botonesLogin">
          Registro
        </button>

      </div>
    </div>
  );
};

export default Registro;