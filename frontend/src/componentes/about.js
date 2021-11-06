import React, { useState } from "react";
import RobotAcostado from "../imagenes/robot4.png";
import Marvin_Levitando from "../assets/Marvin_Levitando.png";
import "../estilos/estiloPagina.css";
const About = props => {
  

  
    return (
      <div className="App-sayname" >
        
        <br/>
        <h2 className="input-helper">
        Acerca de Marvin
        </h2>
        <br/>

       <p>
         Somos un grupo de estudiantes y desarrolladores y creamos <b> Marvin - Encontrá tu PC</b> para asistir en el asesoramiento de computadoras.
       </p>
       <br/>
       <p>
         En la pestaña Encuesta podés hablar con Marvin y contarle qué necesitas para que pueda recomendarte tu computadora ideal.
       </p>
       <br/>
       <p>¡Si tenés dudas o comentarios no dudes en escribirnos!</p>
       <br/>

       <h5>Contacto:</h5>
       <p>
       </p>
       <p>
         mail: marvin.encontratupc@gmail.com
       </p>


       <a  id="iconomail" href="mailto:marvin.encontratupc@gmail.com"> Envianos un mail</a>

       <img id="robotAcostado" src={Marvin_Levitando}/>


          
      </div>
    )
  }
  
  export default About;