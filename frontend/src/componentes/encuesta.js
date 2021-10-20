import React, { useState } from "react";
import Chocola from "../assets/Chocola.png";
import ChocolaHappy from "../assets/ChocolaHappy.png";
import ComputadoraDataService from "../servicios/computadora";
import Teams from "../assets/Teams-Icono.png"




class Encuesta extends React.Component{

  constructor(props){
    super(props);

    this.state = {nroPregunta: 0, finalizada: false,
      preguntas:[
        "¿Que uso vas a darle a tu computadora?",
        "¿La usas para trabajar?",
        "¿Juga al GENSHIN?",
        "¿Haces tareas de diseño?",
        "¿Usas alguna de estas apps?"
    ], respuestas:[], computadoras: []
  };


    
    this.incPregunta = this.incPregunta.bind(this);
    this.getRadioSeleccionado = this.getRadioSeleccionado.bind(this);
    this.almacenarResultado= this.almacenarResultado.bind(this);
    this.traerComputadora = this.traerComputadora.bind(this);
    this.getCheckboxesSeleccionadas = this.getCheckboxesSeleccionadas.bind(this);
    
    
    
  }

//useState(parametro) ->Le aplica la funcion(setter) a la constante y setea el valor inicial que es el parametro
  
//const [nroPregunta, updatePregunta] = useState(0);
  //document.getElementById("preguntaHeader").innerHTML=preguntas[nroPregunta];

  /*Necesito: 
  Obtener el resultado del usuario => obtenerEntrada (Cambia segun las inputs)
  Guardar el valor del usuario en resultados =>guardarResultado()
  aumentar el numero de pregunta => incPregunta
  cambiar la pregunta  => Render() solo con el incPregunta
  y traer el resultado traerComputadora
  */

  almacenarResultado(valor){
    this.state.respuestas[this.state.nroPregunta]= valor;
  }

  incPregunta(){
    this.setState({nroPregunta: this.state.nroPregunta + 1})
  }

  getRadioSeleccionado (){ //Pregunta Uso

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
    return result;

  }

  getCheckboxesSeleccionadas(nombre){
    var boxes = document.getElementsByName(nombre);
    var result =[];
    for (var i=0; i<boxes.length;i++){
      if (boxes[i].checked){
        result.push(boxes[i].value);
      }
    }
    console.log(result);
    return result;
  }

  traerComputadora(){ //Falta bind
    this.setState({finalizada: true});
    console.log("Esta es la marca: " + this.state.respuestas[1]);
    ComputadoraDataService.find(this.state.respuestas[1],"brand")
    .then(
      (response)=> this.setState({computadoras: response.data.computadoras})
    );
    console.log("La computadoras es");
    console.log(this.state.computadoras);

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
                onClick={() => {this.almacenarResultado(this.getRadioSeleccionado()); this.incPregunta()}}
              >Enviar </button>
            </div>
            <img src={Chocola} height="500" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }
    else if  (this.state.nroPregunta==1){
      return (
        <div className="App-sayname">
          <div>
            <h2>Pregunta {this.state.nroPregunta}</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de ¿Trabajar?"
                type="button"
                onClick={() => {this.almacenarResultado("Lenovo"); this.incPregunta();}}
              >Lenovo </button>
              <button
                className="Boton de ¿No Trabajar'"
                type="button"
                onClick={() => {this.almacenarResultado(""); this.incPregunta()}}
              >No capo </button>
            </div>
            <img src={ChocolaHappy} height="500" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }
    else if (this.state.nroPregunta==2){
      return(
      <div className="App-sayname">
          <div>
            <h2>Pregunta</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Genshin Si"
                type="button"
                onClick={() => {this.almacenarResultado("Genshin"); this.incPregunta();}}
              >Hehe </button>
              <button
                className="Boton de Genshin No"
                type="button"
                onClick={() => {this.almacenarResultado("NoGenshin"); this.incPregunta()}}
              >¿Al que? </button>
            </div>
            <img src={Chocola} height="500" alt="Its getting bigger!" />
          </div>
        </div>
      )
    }
    else if (this.state.nroPregunta==3){
      return(
      <div className="App-sayname">
          <div>
            <h2>Pregunta</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Diseño"
                type="button"
                onClick={() => {this.almacenarResultado("Diseño-Si"); this.incPregunta();}}
              >Hentai </button>
              <button
                className="Boton de Genshin No"
                type="button"
                onClick={() => {this.almacenarResultado("Diseño-No"); this.incPregunta()}}
              >No </button>
            </div>
            <img src={Chocola} height="500" alt="Its getting bigger!" />
          </div>
        </div>
      )
    }
    else if (this.state.nroPregunta==4){
      return (
      <div className="App-sayname">
      <div>
        <h2>Pregunta</h2>
        <br/>
        <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
        <div>
        <img src={Teams} height="20" alt="Its getting bigger!" />
        Microsoft Teams <input type="checkbox" name="App" value="Teams"/>
         Discord <input type="checkbox" name="App" value="Discord"/>
        </div>
        <div>
        <button
            className="Boton de Checkbox"
            type="button"
            onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();this.traerComputadora();}}
          >Aceptar </button>
        </div>
        <img src={Chocola} height="500" alt="Its getting bigger!" />
      </div>
    </div>
    )

    }

    else if (this.state.finalizada && this.state.computadoras.length==0){
      console.log(this.state.computadoras);
      return (
      <div>Chocola is Thinking!</div>
      );

    }
    else if (this.state.finalizada && this.state.computadoras.length!=0) {
      console.log(this.state.computadoras);
      return (
      <div>
        <h1>Este es el resultado:</h1>
        {this.state.computadoras[0].name}

      <div className="row">
          <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.state.computadoras[0].name}</h5>


                <p className="card-text">
                  <strong>Nombre: </strong>{this.state.computadoras[0].name}<br/>
                  <strong>Marca: </strong>{this.state.computadoras[0].brand}<br/>
                  <strong>RAM: </strong>{this.state.computadoras[0].RAM}<br/>
                  <strong>Precio: </strong>{this.state.computadoras[0].price}<br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )

    }
    else {
      return(<div><h1>SEEEEE</h1></div>)
    }
  }
}

  
  export default Encuesta;