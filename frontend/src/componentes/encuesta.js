import React, { useState } from "react";
import Chocola from "./Chocola.png";




const Encuesta = props => {
//useState(parametro) ->Le aplica la funcion(setter) a la constante y setea el valor inicial que es el parametro
  const [nroPregunta, updatePregunta] = useState(0);

  var preguntas=[
    "¿Que uso vas a darle a tu computadora?",
    "¿La usas para trabajar?"
];
var respuestas=[];
  //document.getElementById("preguntaHeader").innerHTML=preguntas[nroPregunta];

  function actualizarPregunta(valor,nroPregunta){
    updatePregunta(nroPregunta+1)
    respuestas[nroPregunta]=valor;
    console.log(respuestas[nroPregunta] + "Este es el resultado");
  }

  function guardarRespuesta(){}

  function getRadioSeleccionado (){
    console.log("Entro a la fuincion");

    var lista = document.getElementsByName("Uso")
    var i =0;
    var encontrado= false;
    console.log(lista.length);
    var result;
    while (i<lista.length  && !encontrado){
      console.log("Entro al while");
      if (lista[i].checked){
        console.log("Entro al if");
        encontrado = true;
        result = lista[i].value;
      }
      i++;
    }
    actualizarPregunta(result, nroPregunta);
  }

  

  
    return (


      <div className="App-sayname">

        <div>
          <h2>Pregunta</h2>
          <br/>
          <h2 id="preguntaHeader">{preguntas[nroPregunta]}</h2>
          <div>
          Programacion
          <input type="radio"name="Uso" value="Programacion"/>
          Jugar
          <input type="radio"name="Uso" value = "Jugar"/>
          Diseño
          <input type="radio"name="Uso" value="Diseño"/>
          <button
              className="Boton de radio"
              type="button"
              onClick={getRadioSeleccionado}
            >Enviar </button>
          </div>

          
          <img src={Chocola} height="" alt="Its getting bigger!" />



        </div>
        
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