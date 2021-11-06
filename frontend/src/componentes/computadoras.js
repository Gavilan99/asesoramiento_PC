import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";
import Login from "./login";

const Computadora = props => {
  const initialComputadoraState = {
     id: null,
    name: "",
    comentarios: []
  };
  const [computadora, setComputadora] = useState(initialComputadoraState);

  const getComputadora = id => {
    ComputadoraDataService.get(id)
      .then(response => {
        setComputadora(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComputadora(props.match.params.id);
  }, [props.match.params.id]);


  
  const deleteReview = (reviewId, index) => {
    ComputadoraDataService.deleteReview(reviewId, props.user.contraseña)
      .then(response => {
        setComputadora((prevState) => {
          prevState.comentarios.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  const darLike =(comentario, index) => {
    const likeBtn = document.querySelector(".like_btn");
    let likeIcon = document.querySelector("#icon");
    var parametroLikes = {nombre:comentario._id, usuario:props.user.usuario, likes:1}
    if(true){
        likeIcon.innerHTML = `<i class ="fas fa-thumbs-up"></i>`;
        ComputadoraDataService.alterarLikes(parametroLikes); //CAMBIAR URGENTE, CONTRASEñA???
        console.log(computadora.comentarios[index].likes)
        var misComentarios  = computadora.comentarios.slice()
        misComentarios.map((item, indice) => {
          if (indice === index) {
            item.likes = item.likes + 1
          }	
})  
        setComputadora({...computadora, comentarios: misComentarios})
    } else{
        likeIcon.innerHTML = `<i class ="far fa-thumbs-up"></i>`;
    }
}

  return (
    <div>
      {computadora ? (
        <div>
          <h5>{computadora.name}</h5>

          <h5> RAM:  {computadora.RAM}</h5>



          <Link to={"/computadoras/" + props.match.params.id + "/comentario"} className="btn btn-primary">
            Add Review
          </Link>

          <h4> Reviews </h4>
          <div className="row">
            {computadora.comentarios.length > 0 ? (
             computadora.comentarios.map((comentario, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"></link>
                   <button class = "like_btn" onClick = {() => darLike(comentario, index)}>
                        <span id = "icon"><i class ="far fa-thumbs-up"></i></span>
                        <span id="count"> {comentario.likes}</span> Like
                    </button>
                     <div className="card-body">
                       <p className="card-text">
                         {comentario.text}<br/>
                         <strong>User: </strong>{comentario.name}<br/>
                         <strong>Date: </strong>{comentario.date}
                        
                       </p>


                       {props.user && props.user.contraseña == comentario.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(comentario._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/computadoras/" + props.match.params.id + "/comentario",
                              state: {
                                currentReview: comentario
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No computadora selected.</p>
        </div>
      )}
      <script src="./likeBtn.js"></script>
    </div>
  );
};

export default Computadora;