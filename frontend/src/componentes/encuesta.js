import React, { useState } from "react";
import Chocola from "../assets/Chocola.png";
import ChocolaHappy from "../assets/ChocolaHappy.png";
import ComputadoraDataService from "../servicios/computadora";
import Teams from "../assets/Teams-Icono.png";
import Discord from "../assets/Discord.png";
import Photoshop from "../assets/Photoshop.png";
import Autocad from "../assets/Autocad.png";
import Zoom from "../assets/Zoom.png";
import Skype from "../assets/Skype.png";




class Encuesta extends React.Component{

  constructor(props){
    super(props);

    this.state = {nroPregunta: 0, finalizada: false,
      preguntas:[
        "¿Que uso vas a darle a tu computadora?", //0
        "¿La usaras para trabajar?", //1
        "¿Necesitaras alguna de estas aplicaciones?", //2
        "¿La usaras para jugar Videojuegos(COMO EL GENSHIN)?", //3
        "¿Necesitaras alguan de estas aplicaciones?", //4
        "¿La usaras para Estudiar?", //5
        "¿Necesitaras alguan de estas aplicaciones?", //6

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

  //Para saltear una pregunta hay que aumentar el numero pregunta y asegurarse de traer las computadoras

  almacenarResultado(valor){
    this.state.respuestas[this.state.nroPregunta]= valor;
  }

  incPregunta(n=1){
    this.setState({nroPregunta: this.state.nroPregunta + n})
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

  traerComputadora(){
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
                className="Boton de Trabajar"
                type="button"
                onClick={() => {this.almacenarResultado("Lenovo"); this.incPregunta();}} //ARREGLAR ESTO
              >Si </button>
              <button
                className="Boton de No Trabajar"
                type="button"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2);}}
              >No </button>
            </div>
            <img src={ChocolaHappy} height="500" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }
    else if (this.state.nroPregunta==2){

      return (
        <div className="App-sayname">
        <div>
          <h2>Pregunta Nro {this.state.nroPregunta}</h2>
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <img src={Teams} height="20" alt="Its getting bigger!" />
          Microsoft Teams <input type="checkbox" name="App" value="Teams"/>
          <img src={Discord} height="20" alt="Its getting bigger!" />
          Discord <input type="checkbox" name="App" value="Discord"/>
          <img src={Zoom} height="20" alt="Its getting bigger!" />
          Zoom <input type="checkbox" name="App" value="Zoom"/>
          <img src={Skype} height="20" alt="Its getting bigger!" />
          Skype <input type="checkbox" name="App" value="Skype"/>

          <img src={Photoshop} height="20" alt="Its getting bigger!" />
          Photoshop <input type="checkbox" name="App" value="Photoshop"/>
          <img src={Autocad} height="20" alt="Its getting bigger!" />
          Autocad <input type="checkbox" name="App" value="Autocad"/>
          </div>
          <div>
          <button
              className="Boton de Checkbox"
              type="button"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
          </div>
          <img src={Chocola} height="500" alt="Its getting bigger!" />
        </div>
      </div>
      )

      /*
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
      )*/
    }
    else if (this.state.nroPregunta==3){
      return(
      <div className="App-sayname">
          <div>
            <h2>Pregunta Nro {this.state.nroPregunta}</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Videojuegos Si"
                type="button"
                onClick={() => {this.almacenarResultado("Videojuegos-Si"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de Videojuegos No"
                type="button"
                onClick={() => {this.almacenarResultado("Videojuegos-No"); this.incPregunta(2)}}
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
          <h2>Pregunta Nro {this.state.nroPregunta}</h2>
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <img src={Teams} height="20" alt="Its getting bigger!" />
          Microsoft Teams <input type="checkbox" name="App" value="Teams"/>
           Discord <input type="checkbox" name="App" value="Discord"/>
           Zoom <input type="checkbox" name="App" value="Zoom"/>
           Skype <input type="checkbox" name="App" value="Skype"/>

           Photoshop <input type="checkbox" name="App" value="Photoshop"/>
           Autocad <input type="checkbox" name="App" value="Autocad"/>
          </div>
          <div>
          <button
              className="Boton de Checkbox Videojuegos"
              type="button"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
          </div>
          <img src={Chocola} height="500" alt="Its getting bigger!" />
        </div>
      </div>
      )

      /*
      return (
      <div className="App-sayname">
      <div>
        <h2>Pregunta Nro {this.state.nroPregunta}</h2>
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
    */

    }
    else if (this.state.nroPregunta==5){
      return (
        <div className="App-sayname">
          <div>
            <h2>Pregunta Nro {this.state.nroPregunta} {this.state.nroPregunta}</h2>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Estudiar"
                type="button"
                onClick={() => {this.almacenarResultado("Lenovo"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de No Trabajar"
                type="button"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2); this.traerComputadora();}}
              >No </button>
            </div>
            <img src={ChocolaHappy} height="500" alt="Its getting bigger!" />
  
          </div>
          </div>
      );
    }

    else if (this.state.nroPregunta==6){
      return (
        <div className="App-sayname">
        <div>
          <h2>Pregunta Nro {this.state.nroPregunta}</h2>
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <img src={Teams} height="20" alt="Its getting bigger!" />
          Microsoft Teams <input type="checkbox" name="App" value="Teams"/>
           Discord <input type="checkbox" name="App" value="Discord"/>
           Zoom <input type="checkbox" name="App" value="Zoom"/>
           Skype <input type="checkbox" name="App" value="Skype"/>

           Photoshop <input type="checkbox" name="App" value="Photoshop"/>
           Autocad <input type="checkbox" name="App" value="Autocad"/>
          </div>
          <div>
          <button
              className="Boton de Checkbox Estudiar"
              type="button"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta(); this.traerComputadora();}}
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
      <div><h1>Chocola is Thinking!</h1></div>
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