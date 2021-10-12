import React, { useState } from "react";


const Encuesta = props => {
  

  
    return (
      <div className="App-sayname">
        
        <h2 className="input-helper">
        Choices para encontrar tu computadora ideal
        </h2>

       <div className="card">
            <div className="card-body">
            <h5 className="card-title">DISEÑO </h5>
            <p className="card-text">
            </p>
            <div className="row">
            
              <a target="_blank" href={"https://www.google.com/maps/place/" } className="btn btn-primary col-lg-5 mx-1 mb-1">
                  Ver Computadoras</a>
            </div>
          </div>


          <div className="card-body">
            <h5 className="card-title">PROGRAMACION </h5>
            <p className="card-text">
            </p>
            <div className="row">
            
              <a target="_blank" href={"https://www.google.com/maps/place/" } className="btn btn-primary col-lg-5 mx-1 mb-1">
                  Ver Computadoras</a>
            </div>
          </div>


          </div>
      </div>
    )
  }
  
  export default Encuesta;