import React, { useState } from "react";
import ComputadoraDataService from "../servicios/computadora";


const CambioContraseña = props => {

  const initialContraseñasState = {
    contraseñaVieja: "",
    contraseñaNueva: "",
  }

  const [user, setUser] = useState(props.usuario);
  const [contraseñas, setContraseñas] = useState(initialContraseñasState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setContraseñas({ ...contraseñas, [name]: value });
  };

  const cambio = () => {
    const input = {
      usuario: user.usuario,
      contraseñaVieja: user.contraseña,
      contraseñaViejaInput: contraseñas.contraseñaVieja,
      contraseñaNueva: contraseñas.contraseñaNueva,
    }
    console.log(input.contraseñaViejaInput)
    ComputadoraDataService.cambioContraseña(input)
      .then(response => {
        if (response.data.incorrecta){
          alert("La contraseña actual no es correcta.")
        }
        else{
          const nuevoUser = {
            usuario: user.usuario,
            contraseña: contraseñas.contraseñaNueva,
          }
          setUser(nuevoUser)
          alert("Contraseña cambiada exitosamente")
          props.history.push('/usuarios');
        }
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Contraseña Actual</label>
          <input
            type="text"
            className="form-control"
            id="contraseñaVieja"
            value = {contraseñas.contraseñaVieja}
            onChange={handleInputChange}
            name="contraseñaVieja"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">Contraseña Nueva</label>
          <input
            type="text"
            className="form-control"
            id="contraseñaNueva"
            value = {contraseñas.contraseñaNueva}
            onChange={handleInputChange}
            name="contraseñaNueva"
          />
        </div>
        <br/>
        <button onClick={cambio} class="botonesLogin">
          Cambiar
        </button>

      </div>
    </div>
  );
};

export default CambioContraseña;