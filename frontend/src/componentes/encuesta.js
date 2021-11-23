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
      flagDiseño: false, flagJuegos: false, 
      preguntas:[
        "¿Como vas a usar tu computadora?", //0
        "¿La usas para diseño grafico?", //1
        "¿Necesitas alguna de estas aplicaciones de diseño grafico?", //2 []
        "¿Jugas videojuegos?", //3
        "¿Cuales jugas?", //4 []
        "¿La usas para estudiar?", //5
        "Necesitas alguna de estas aplicaciones de estudio?", //6 []
        "¿La necesitas para trabajar?", //7
        "¿Usas alguna de estas apps para el trabajo?", //8 []
        "¿La necesitas para alguno de estos usos?", //9
        "¿Alguna de estas apps te sirve?" //10 []

    ], respuestas:[0,,[],,[],,[],,[],[],[]], computadoras: [],
    usos: ["Cryptomining", "Navegacion Web"],
    appsUso: [["BFGMINER", "EASYMINER", "CGMINER"],["Google Chrome"]],
    resultUsos: []

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

    this.alterFlagDiseño = this.alterFlagDiseño.bind(this);
    this.alterFlagJuegos = this.alterFlagJuegos.bind(this);
    this.cargarUsosVariados = this.cargarUsosVariados.bind(this);
    
    
  }

  pertenecenTodos(base, sub){
    var diff = sub.filter(function(x) { return base.indexOf(x) < 0 })
    return diff.length==0;
  }

  filtrar(post){ 
    let a=""
    let flag=0
  
    if(this.state.respuestas[1] == "Diseño Grafico"){
      if (post.usos){
        console.log(post.usos.includes('Diseño Grafico'))
        a=a+"post.usos.includes('Diseño Grafico')"
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
      if (post.aplicaciones){
        console.log(this.state.respuestas[2])
        console.log(post.aplicaciones)
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
      if (post.aplicaciones){
        a= a+ this.pertenecenTodos(post.aplicaciones, this.state.respuestas[4]);
      }
      else {a= a + "false";}
      flag=1
    }
    if (this.state.respuestas[5] == "Estudio"){
      if(flag==1){
        a=a+" && "
      }
      if (post.aplicaciones){
        a= a+ this.pertenecenTodos(post.aplicaciones, this.state.respuestas[6]);
      }
      else { 
        a= a + "false"
      }
      flag=1;
    }

    if (this.state.respuestas[7] == "Trabajo"){
      if(flag==1){
        a=a+" && "
      }
      if (post.aplicaciones){
        a= a+ this.pertenecenTodos(post.aplicaciones, this.state.respuestas[8]);
      }
      else { 
        a= a + "false"
      }
      flag=1;
    }
    if (this.state.respuestas[10].length!=0){
      if(flag==1){
        a=a+" && "
      }
      if (post.aplicaciones){
        a= a+ this.pertenecenTodos(post.aplicaciones, this.state.respuestas[10]);
      }
      else { 
        a= a + "false"
      }
      flag=1;

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

  alterFlagDiseño(){
    this.setState({flagDiseño: true});
  }
  alterFlagJuegos(){
    this.setState({flagJuegos: true});
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
    return result;
  }

  cargarUsosVariados(){
    var lista =this.getCheckboxesSeleccionadas("Uso Variado");
    var result = []
    for (var i=0; i<lista.length;i++){
      for (var j=0; j<this.state.usos.length;j++){
        if (lista[i]==this.state.usos[j]){
          result = result.concat(this.state.appsUso[j]);
          break
        }
      }
    }
    return result;
  }

  traerComputadora(){
    this.setState({finalizada: true});
    this.incPregunta(100);
    console.log(this.state.computadoras);
    this.state.computadoras = this.state.computadoras.filter(this.filtrar);

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
    }
    else if  (this.state.nroPregunta==1){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Presentando_Rotado} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
          <br/>
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <br/>
            <div>
            <p id="centrarBoton">
            <button
                id="botonEncuesta"
                type="button"
                onClick={() => {this.almacenarResultado("Diseño Grafico"); this.alterFlagDiseño(); this.incPregunta();}} //ARREGLAR ESTO
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
    }
    else if (this.state.nroPregunta==2){

      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
        <div className="col-6">
        <br/>
            <br/>
          <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
          <div>
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
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <p id="centrarBoton">
            <button
                className="Boton de Videojuegos Si"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Videojuegos");this.alterFlagJuegos(); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de Videojuegos No"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); (this.state.flagDiseño) ? this.traerComputadora() : this.incPregunta(2)}}
              >No </button>
            </p>
            </div>
            
          </div>
        </div>
        </div>
      )
    }
    else if (this.state.nroPregunta == 4){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
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
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.traerComputadora();}}
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
                className="Boton de No Estudiar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2);}}
              >No </button>
            </p>
            </div>
          </div>
          </div>
          </div>
      );
    }else if (this.state.nroPregunta==6 && !this.state.finalizada){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
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

          </div>
          <div>
          <p id="centrarBoton">
          <button
              className="Boton de Checkbox Estudiar"
              type="button"
              id="botonEncuesta"
              onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App")); this.traerComputadora();}}
            >Aceptar </button>
          </p>
          </div>
        </div>
      </div>
    </div>
      )
    }
    else if (this.state.nroPregunta==9 && !this.state.finalizada){
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

          
          <input type="checkbox" name="Uso Variado" value="Cryptomining"/> Cryptomining
          <br/>
          <br/>
          <input type="checkbox" name="Uso Variado" value="Navegacion Web"/> Navegar en la WEB
          <br/>
          <br/>

    }
    else if (this.state.nroPregunta==7 && !this.state.finalizada){
      return (
        <div id="contenido">
          <div class="row">
            <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
            </div>
          <div className="col-6">
            <br/>
            <h2 id="centrarBoton">{this.state.preguntas[this.state.nroPregunta]}</h2>
            <div>
            <p id="centrarBoton">
            <button
                className="Boton de Trabajar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado("Trabajo"); this.incPregunta();}}
              >Si </button>
              <button
                className="Boton de No Trabajar"
                type="button"
                id="botonEncuesta"
                onClick={() => {this.almacenarResultado(""); this.incPregunta(2);}}
              >No </button>
            </p>
            </div>
            
  
          </div>
          </div>
          </div>
      );
    }

  else if (this.state.nroPregunta==8 && !this.state.finalizada){
    return (
      <div id="contenido">
        <div class="row">
          <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
          </div>
        <div className="col-6">
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

        </div>
        <div>
        <p id="centrarBoton">
        <button
            className="Boton de Checkbox Trabajar"
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
  }
  else if (this.state.nroPregunta==9 && !this.state.finalizada){
    return (
      <div id="contenido">
        <div class="row">
          <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
          </div>
        <div className="col-6">
        <br/>
        <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
        <div>
        <br/>

        <input type="checkbox" name="Uso Variado" value="Cryptomining"/> Cryptomining
            <br/>
            <br/>
            <input type="checkbox" name="Uso Variado" value="Navegacion Web"/> Navegar en la WEB
            <br/>
            <br/>

        </div>
        <div>
        <p id="centrarBoton">
        <button
            className="Boton de Checkbox Estudiar"
            type="button"
            id="botonEncuesta"
            onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("Uso Variado")); this.setState({resultUsos: this.cargarUsosVariados()}); this.incPregunta();}}
          >Aceptar </button>
        </p>
        </div>
      </div>
    </div>
  </div>
    )
  }

  else if (this.state.nroPregunta==10 && !this.state.finalizada && this.state.resultUsos!=0){
    return (
      <div id="contenido">
        <div class="row">
          <div className="col-6"><img src={Marvin_Manos_Cintura} height="500" alt="Its getting bigger!" />
          </div>
        <div className="col-6">
        <br/>
        <h2 id="preguntaHeader">{this.state.preguntas[this.state.nroPregunta]}</h2>
        <div>
        <br/>
        <div>
          {this.cargarUsosVariados().map( (x) =>{return (
            <div>
                <input type="checkbox" name="App Variada" value={x}/> {x}
                <br/>
                <br/>
            </div>)
          })}
        </div>

        </div>
        <div>
        <p id="centrarBoton">
        <button
            className="Boton de Checkbox Uso Variado"
            type="button"
            id="botonEncuesta"
            onClick={() => {this.almacenarResultado(this.getCheckboxesSeleccionadas("App Variada")); this.traerComputadora();}}
          >Aceptar </button>
        </p>
        </div>
      </div>
    </div>
  </div>
    )
  }

  else if (this.state.nroPregunta==10 && !this.state.finalizada && this.state.resultUsos==0){
    this.traerComputadora();
    return (<div>Estoy buscando en mi base de datos</div>);
  }

    
    else if (this.state.finalizada && this.state.computadoras.length==0){
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

    }
    else if (this.state.finalizada && this.state.computadoras.length!=0) {
      console.log("Estoy en la ultima fase");
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
      return(<div><h1>Parece que a ocurrido un problema</h1></div>)
    }
    
    
  }
  
}


  
  export default Encuesta;
