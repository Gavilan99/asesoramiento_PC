import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";

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
    ComputadoraDataService.deleteReview(reviewId, props.user.id)
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
                     <div className="card-body">
                       <p className="card-text">
                         {comentario.text}<br/>
                         <strong>User: </strong>{comentario.name}<br/>
                         <strong>Date: </strong>{comentario.date}
                        
                       </p>


                       {props.user && props.user.id == comentario.user_id &&
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
    </div>
  );
};

export default Computadora;