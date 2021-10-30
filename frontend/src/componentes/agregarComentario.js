import React, { useState } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";


const AgregarComentario = props => {
    let initialReviewState = ""
  
    let editing = false;
  
    if (props.location.state && props.location.state.currentReview) {
      editing = true;
      initialReviewState = props.location.state.currentReview.text
    }
  
    const [comentario, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);
  
    const handleInputChange = event => {
      setReview(event.target.value);
    };
  
    const saveReview = () => {
      var data = {
        text: comentario,
        name: props.user.usuario,
        user_id: props.user.contraseña,
        computadora_id: props.match.params.id
      };
  
      if (editing) {
        data.comentario_id = props.location.state.currentReview._id
        ComputadoraDataService.updateReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        ComputadoraDataService.createReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
  
    };
  
    return (
        <div>
        {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/computadoras/" + props.match.params.id} className="btn btn-success">
                Back to Computadoras
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={comentario}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
  
        ) : (
        <div>
          Please log in.
        </div>
        )}
  
      </div>
    );
  };
  
  export default AgregarComentario;




