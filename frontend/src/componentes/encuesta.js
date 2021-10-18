import React, { useState } from "react";
import Chocola from "./Chocola.png";
import ChocolaHappy from "./ChocolaHappy.png";
import ComputadoraDataService from "../servicios/computadora";




class Encuesta extends React.Component{

  constructor(props){
    super(props);

    this.state = {nroPregunta: 0,
      preguntas:[
        "¿Que uso vas a darle a tu computadora?",
        "¿La usas para trabajar?",
        "¿Jugas a los jueguitos?"
    ], respuestas:[], computadoras: []
  };


    
    this.actualizarPregunta = this.actualizarPregunta.bind(this);
    this.incPregunta = this.incPregunta.bind(this);
    this.getRadioSeleccionado = this.getRadioSeleccionado.bind(this);
    this.incPregunta = this.incPregunta.bind(this);
    this.traerComputadora = this.traerComputadora.bind(this);
    
    
  }

//useState(parametro) ->Le aplica la funcion(setter) a la constante y setea el valor inicial que es el parametro
  
//const [nroPregunta, updatePregunta] = useState(0);
  //document.getElementById("preguntaHeader").innerHTML=preguntas[nroPregunta];

  actualizarPregunta(valor){
    this.state.respuestas[this.state.nroPregunta]=valor;
    console.log(this.state.respuestas[this.state.nroPregunta] + " Este es el resultado");
    this.incPregunta();
  }

  incPregunta(){
    this.setState({nroPregunta: this.state.nroPregunta + 1})

  }

  getRadioSeleccionado (){

    var lista = document.getElementsByName("Uso")
    var i =0;
    var encontrado= false;
    var result;
    while (i<lista.length  && !encontrado){
      if (lista[i].checked){
        encontrado = true;
        result = lista[i].value;
      }
      i++;
    }
    this.actualizarPregunta(result);
    this.incPregunta();

  }
  traerComputadora(){ //Falta bind
    ComputadoraDataService.find(this.state.respuestas[1],"brand")
    .then(
      (response)=> this.setState({computadoras: response.data.computadoras})
    );

  }

  render(){
    /* La estructura divina*/
    if (this.state.nroPregunta==0){
      return (
        
        <div className="App-sayname">
  
          <div>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
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
                onClick={() => this.getRadioSeleccionado()}
              >Enviar </button>
            </div>
            <img src={Chocola} height="" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }
    else if  (this.state.nroPregunta==1){
      return (
        <div className="App-sayname">
          <div>
            <h2>Pregunta</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de radio"
                type="button"
                onClick={() => this.actualizarPregunta("Lenovo")}
              >Lenovo </button>
              <button
                className="Boton de radio"
                type="button"
                onClick={() => this.actualizarPregunta("NoTrabajar")}
              >No capo </button>
            </div>
            <img src={ChocolaHappy} height="" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }
    else {

        return (

          <div>{console.log(this.state.computadoras)}
          {console.log(this.state.respuestas[1])}
          </div>
        );
    }
  }
}

  
  export default Encuesta;