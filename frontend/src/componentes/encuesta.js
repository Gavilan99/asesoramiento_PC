import React, { useState } from "react";
import Chocola from "../assets/Chocola.png";
import ChocolaHappy from "../assets/ChocolaHappy.png";
import Marvin_contento from "../assets/marvin_contento.png";
import ComputadoraDataService from "../servicios/computadora";
import Teams from "../assets/Teams-Icono.png";
import Discord from "../assets/Discord.png";
import Photoshop from "../assets/Photoshop.png";
import Autocad from "../assets/Autocad.png";
import Zoom from "../assets/Zoom.png";
import Skype from "../assets/Skype.png";
import "../estilos/estiloPagina.css"



class Encuesta extends React.Component{

  constructor(props){
    super(props);

    this.state = {nroPregunta: 0, finalizada: false,
      preguntas:[
        "¿Como vas a usar tu computadora?", //0
        "¿La usas para trabajar?", //1
        "¿Necesitas alguna de estas aplicaciones?", //2
        "¿Jugas videojuegos?", //3
        "¿Cuales jugas?", //4
        "¿La usas para estudiar?", //5
        "Necesitas alguna de estas aplicaciones?", //6

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
          <section className="container">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
            <div className="col-6">
              <br/>
              <h2> Hola! Soy Marvin</h2>
              <br/>
              <div>
              <h4>Te voy a hacer unas preguntas para encontrar la computadora ideal para vos. ¿Empezamos? </h4>
              <br/>
              <br/>
              <button
                  id="botonEncuesta"
                  type="button"
                  onClick={() => {this.almacenarResultado(this.getRadioSeleccionado()); this.incPregunta()}}
                >Comenzar </button>
              </div>
            </div>
            </div>
            </section>
          </div>
      );
    /*}else if (this.state.nroPregunta==0){
      return (

        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
            <br/>
            <h5>Pregunta {this.state.nroPregunta+1}</h5>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <br/>
            <input type="radio"name="Uso" value="Programacion"/>
            Programacion
            <br></br>
            <br></br>

            <input type="radio"name="Uso" value = "Jugar"/>
            Jugar
            <br></br>
            <br></br>

            <input type="radio"name="Uso" value="Diseño"/>
            Diseño
            <br></br>
            <br></br>
            <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado(this.getRadioSeleccionado()); this.incPregunta()}}
              >Enviar </button>
            </div>
           

          </div>
          </div>
          </div>
      );*/
    }else if  (this.state.nroPregunta==1){
      return (
        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          <br/>
            <h5>Pregunta {this.state.nroPregunta+1}</h5>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <br/>
            <div>
            <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado("Lenovo"); this.incPregunta();}} //ARREGLAR ESTO
              >Si </button>
              
              <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2);}}
              >No </button>
            </div>
            

          </div>
          </div>
          </div>
      );
    }else if (this.state.nroPregunta==2){

      return (
        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
        <div className="col-6">
        <br/>
            <h5>Pregunta {this.state.nroPregunta+1}</h5>
            <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <br/>

          
          <input type="checkbox" name="App" value="Teams"/> <img src={Teams} height="20" alt="Its getting bigger!" /> Microsoft Teams 
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Discord"/>  <img src={Discord} height="20" alt="Its getting bigger!" /> Discord
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Zoom"/> <img src={Zoom} height="20" alt="Its getting bigger!" /> Zoom 
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Skype"/> <img src={Skype} height="20" alt="Its getting bigger!" /> Skype
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Photoshop"/> <img src={Photoshop} height="20" alt="Its getting bigger!" /> Photoshop
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Autocad"/> <img src={Autocad} height="20" alt="Its getting bigger!" /> Autocad 
          <br/>
          <br/>
          </div>
          <div>
          <button
              id="botonEncuesta"
              type="button"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
          </div>
        </div>
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
    }else if (this.state.nroPregunta==3){
      return(
        <div className="App-sayname">
        <div class="row">
          <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
          </div>
        <div className="col-6">
            <h5>Pregunta {this.state.nroPregunta+1}</h5>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Videojuegos Si"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Videojuegos-Si"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de Videojuegos No"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Videojuegos-No"); this.incPregunta(2)}}
              >No </button>
            </div>
            
          </div>
        </div>
        </div>
      )
    }else if (this.state.nroPregunta==4){
      return (
        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          <h5>Pregunta {this.state.nroPregunta+1}</h5>
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
           <input type="checkbox" name="App" value="Teams"/> League of Legends 
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Discord"/> Genshin
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Zoom"/> GTAV
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Skype"/> CS GO 
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Photoshop"/> Valorant
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Autocad"/> Battlefield
          </div>
          <div>
          <button
              className="Boton de Checkbox Videojuegos"
              type="button"
              id="botonEncuesta"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
          </div>
          
        </div>
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

    }else if (this.state.nroPregunta==5){
      return (
        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
            <h5>Pregunta {this.state.nroPregunta+1}</h5>
            <br/>
            <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <button
                className="Boton de Estudiar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Lenovo"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de No Trabajar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2); this.traerComputadora();}}
              >No </button>
            </div>
            
  
          </div>
          </div>
          </div>
      );
    }else if (this.state.nroPregunta==6){
      return (
        <div className="App-sayname">
          <div class="row">
            <div className="col-6"><img src={Marvin_contento} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          <h5>Pregunta {this.state.nroPregunta+1}</h5>
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <br/>

          
          <input type="checkbox" name="App" value="Teams"/> <img src={Teams} height="20" alt="Its getting bigger!" /> Microsoft Teams 
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Discord"/>  <img src={Discord} height="20" alt="Its getting bigger!" /> Discord
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Zoom"/> <img src={Zoom} height="20" alt="Its getting bigger!" /> Zoom 
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Skype"/> <img src={Skype} height="20" alt="Its getting bigger!" /> Skype
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Photoshop"/> <img src={Photoshop} height="20" alt="Its getting bigger!" /> Photoshop
          <br/>
          <br/>

          <input type="checkbox" name="App" value="Autocad"/> <img src={Autocad} height="20" alt="Its getting bigger!" /> Autocad 
          <br/>
          <br/>
          </div>
          <div>
          <button
              className="Boton de Checkbox Estudiar"
              type="button"
              id="botonEncuesta"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta(); this.traerComputadora();}}
            >Aceptar </button>
          </div>
          
        </div>
      </div>
      </div>
      )

    }else if (this.state.finalizada && this.state.computadoras.length==0){
      console.log(this.state.computadoras);
      return (
      <div><h2>Estoy buscando en mi base!</h2></div>
      );

    }else if (this.state.finalizada && this.state.computadoras.length!=0) {
      console.log(this.state.computadoras);
      return (
      <div>
        <h1>Encontre tu computadora ideal:</h1>
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

    }else {
      return(<div><h1></h1></div>)
    }
    
    
  }
  
}


  
  export default Encuesta;