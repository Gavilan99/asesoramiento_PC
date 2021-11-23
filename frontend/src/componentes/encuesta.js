import React, { useState } from "react";
import Marvin_contento from "../assets/marvin_contento.png";

import Marvin_Error from "../assets/Marvin_Error.png";
import Marvin_Levitando from "../assets/Marvin_Levitando_Arreglado.png";
import Marvin_Like from "../assets/Marvin_Like.png";
import Marvin_Manos_Cintura from "../assets/Marvin_Manos_Cintura.png";
import Marvin_Presentando from "../assets/Marvin_Presentando.png";
import Marvin_Presentando_Rotado from "../assets/Marvin_Presentando_Rotado2.png";
import Marvin_X_X from "../assets/Marvin_X_X.png";
import Marvin_U_U from "../assets/Marvin_U_U.png";

import Teams from "../assets/Teams-Icono.png";
import Discord from "../assets/Discord.png";
import Photoshop from "../assets/Photoshop.png";
import Autocad from "../assets/Autocad.png";
import Zoom from "../assets/Zoom.png";
import Skype from "../assets/Skype.png";

import "../estilos/estiloPagina.css"
import "../estilos/estiloBotonNeon.css"

import { Link } from "react-router-dom";
import ComputadoraDataService from "../servicios/computadora";


class Encuesta extends React.Component{

  constructor(props){
    super(props);

    this.state = {nroPregunta: 0, finalizada: false,
      preguntas:[
        "¿Como vas a usar tu computadora?", //0
        "¿La usas para trabajar?", //1
        "¿Utilizas alguna de estas aplicaciones?", //2
        "¿Jugas videojuegos?", //3
        "¿Cuales jugas?", //4
        "¿La usas para estudiar?", //5
        "¿alguna de estas aplicaciones?", //6

    ], respuestas:[,,[],], computadoras: []
  };
  ComputadoraDataService.getAll()
  .then(response => {
    this.state.computadoras=response.data.computadoras;
  });


    
    this.incPregunta = this.incPregunta.bind(this);
    this.getRadioSeleccionado = this.getRadioSeleccionado.bind(this);
    this.almacenarResultado= this.almacenarResultado.bind(this);
    this.traerComputadora = this.traerComputadora.bind(this);
    this.getCheckboxesSeleccionadas = this.getCheckboxesSeleccionadas.bind(this);
    this.filtrar = this.filtrar.bind(this);
    this.pertenecenTodos = this.pertenecenTodos.bind(this);
    
    
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

  pertenecenTodos(base, sub){
    var diff = sub.filter(function(x) { return base.indexOf(x) < 0 })
    return diff.length==0;
  }

  filtrar(post){ 
  // 1: trabajas 2: Apps de trabajo 3: Jugas Video juegos
  // 4: apps VideoJuegos 5: Estudias 6: apps Estudio
    let a=""
    let flag=0
  
    if(this.state.respuestas[1] == "Trabajo"){
      if (post.usos){
        a=a+"post.usos.includes('Trabajo')"
      }
      else {
        a= a + "false";
      }
      flag=1;
    }
    if (this.state.respuestas[2].length!=0) {
      if(flag==1){
        a=a+" && "
      }
      console.log(post);
      console.log(post.aplicaciones); //BORRAR
      if (post.aplicaciones){
        a= a+ this.pertenecenTodos(post.aplicaciones, this.state.respuestas[2]);
      }
      else { 
        a= a + "false"
      }
      flag=1;
    }
    if(this.state.respuestas[3] == "Videojuegos"){
      if(flag==1){
        a=a+" && "
      }
      if (post.usos){
        a=a+"post.usos.includes('Videojuegos')"
      }
      else {a= a + "false";}
      flag=1
    }
    if(flag==0){
      a="1==1"
    }
    
    console.log(a)
    return eval(a)
  }


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
    console.log("Entro a buscar las computadoras (traerComputadoras)");
    console.log(this.state.computadoras)
    this.state.computadoras = this.state.computadoras.filter(this.filtrar);
    console.log("Filtado");
    console.log(this.state.computadoras)

  }

  render(){
    /* La estructura divina*/
    
        
    if (this.state.nroPregunta==0){
      return (
        

        <div id="contenido">
          <section className="container" >
          <div class="row">
            <div className="col-6"><img src={Marvin_Levitando} height="500" alt="Its getting bigger!" />
            </div>
            <div className="col-6 " >
              <br/>
              <h2> Hola! Soy Marvin</h2>
              <br/>
              <div>
              <h4>Te voy a hacer unas preguntas para encontrar la computadora ideal para vos. ¿Empezamos? </h4>
              <br/>
              <br/>
              <p id="centrarBoton">
                <p></p><p></p>
              <button
                  id="botonEncuesta"
                  type="button"
                  onClick={() => {this.almacenarResultado(this.getRadioSeleccionado()); this.incPregunta()}}
                >Comenzar </button>
              </p>
              </div>
            </div>
            </div>
            </section>
          </div>
      );
    }else if  (this.state.nroPregunta==1){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Presentando_Rotado} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          <br/>
            {/*<h5>Pregunta {this.state.nroPregunta + 1}</h5>*/}
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <br/>
            <div>
            <p id="centrarBoton">
            <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado("Trabajo"); this.incPregunta();}} //ARREGLAR ESTO
              >Si </button>
              
              <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2);}}
              >No </button>
            </p>
            </div>
            

          </div>
          </div>
          </div>
      );
    }else if (this.state.nroPregunta==2){

      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
        <div className="col-6">
        <br/>
            {/*<h5>Pregunta {this.state.nroPregunta+1}</h5>*/}
            <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
          <br/>

          
          <input type="checkbox" name="App" value="Microsoft Teams"/> <img src={Teams} height="20" alt="Its getting bigger!" /> Microsoft Teams 
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
            <p id="centrarBoton">
          <button
              id="botonEncuesta"
              type="button"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
            </p>
          </div>
        </div>
      </div>
      </div>
      )
    }
    else if (this.state.nroPregunta==3){
      return(
        <div id="contenido">
        <div class="row">
          <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
          </div>
        <div className="col-6">
            {/*<h5>Pregunta {this.state.nroPregunta+1}</h5>*/}
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <p id="centrarBoton">
            <button
                className="Boton de Videojuegos Si"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Videojuegos"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de Videojuegos No"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2)}}
              >No </button>
            </p>
            </div>
            
          </div>
        </div>
        </div>
      )
    }else if (this.state.nroPregunta==4){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          {/*<h5>Pregunta {this.state.nroPregunta+1}</h5>*/}
          <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
           <input type="checkbox" name="App" value="League of Legends"/> League of Legends 
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Genshin Impact"/> Genshin Impact
           <br/>
           <br/>
           <input type="checkbox" name="App" value="GTAV"/> GTAV
           <br/>
           <br/>
           <input type="checkbox" name="App" value="CS GO"/> CS GO 
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Valorant"/> Valorant
           <br/>
           <br/>
           <input type="checkbox" name="App" value="Battlefield"/> Battlefield
          </div>
          <div>
          <p id="centrarBoton">
          <button
              className="Boton de Checkbox Videojuegos"
              type="button"
              id="botonEncuesta"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta();}}
            >Aceptar </button>
          </p>
          </div>
          
        </div>
      </div>
      </div>
      )
    }
    else if (this.state.nroPregunta==5){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
            {/*<h5>Pregunta {this.state.nroPregunta+1}</h5>*/}
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <p id="centrarBoton">
            <button
                className="Boton de Estudiar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Estudio"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de No Trabajar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2); this.traerComputadora();}}
              >No </button>
            </p>
            </div>
            
  
          </div>
          </div>
          </div>
      );
    }else if (this.state.nroPregunta==6){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          {/*<h5>Pregunta {this.state.nroPregunta+1}</h5>*/}
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
          <p id="centrarBoton">
          <button
              className="Boton de Checkbox Estudiar"
              type="button"
              id="botonEncuesta"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.incPregunta(); this.traerComputadora();}}
            >Aceptar </button>
          </p>
          </div>
        </div>
      </div>
    </div>
      )

    }else if (this.state.finalizada && this.state.computadoras.length==0){
      console.log(this.state.computadoras);
      return (
        <div id="contenido">
        <div class="container">
          <div class="row">
            <div class="col-12" id="centrado">
              <h2>Oh no! No pude encontrar una computadora ideal en mi base de datos </h2>
            </div>
            <div class="col-12" id="centrado">
              <img src={Marvin_U_U} height="500" alt="Its getting bigger!" />
            </div>
          </div>
          
        </div>
        </div>
      
      );

    }else if (this.state.finalizada && this.state.computadoras.length!=0) {
      console.log(this.state.computadoras);
      return (
        <div id="contenido">
      <div class="container">
      <div class="row">

      <div class="col-6">
        <h4>Encontre tu computadora ideal:</h4>
        <img src={Marvin_Presentando_Rotado} height="500" alt="Its getting bigger!" />
      </div>        
     
      <div class="col-6">

      <div className="row">
          <div className="col-lg-8 pb-1">
            <div className="card">
              <div className="card-body">

                <p className="card-text">
                < img src={this.state.computadoras[0].imagenUrl}  class ="d-block w-100 right" />
                  <strong>Nombre: </strong>{this.state.computadoras[0].name}<br/>
                  <strong>Marca: </strong>{this.state.computadoras[0].brand}<br/>
                  <strong>RAM: </strong>{this.state.computadoras[0].RAM}<br/>
                  <strong>Precio: </strong>{this.state.computadoras[0].price}<br/>

                  <Link to={"/computadoras/"+this.state.computadoras[0]._id} className="btn  btn-outline-primary col-lg-5 mx-1 mb-1">
                     Ver Reseña
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + this.state.computadoras[0].ubicacion} className="btn  btn-outline-info col-lg-5 mx-1 mb-1">
                      Ver Mapa</a>

                    <a target="_blank" href={this.state.computadoras[0].url} className="btn  btn-outline-secondary col-lg-5 mx-1 mb-1">
                      Ver Tienda</a>

                    <Link to={"/computadoras/"+this.state.computadoras[0]._id} className="btn  btn-outline-primary col-lg-5 mx-1 mb-1">
                     Favorito
                    </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      </div>
      </div>
      </div>
      )

    }else {
      return(<div><h1>No encontre nada</h1></div>)
    }
    
    
  }
  
}


  
  export default Encuesta;