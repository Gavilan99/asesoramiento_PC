import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";

const ComputadorasList = props => {
    const [computadoras, setComputadoras] = useState([]);
    const [buscarNombre, setBuscarNombre ] = useState("");
    
  
    useEffect(() => {
      retrieveComputadoras();
    }, []);
  
    const onChangeSearchName = e => {
      const searchName = e.target.value;
      setBuscarNombre(searchName);
    };
    
 
    const retrieveComputadoras = () => {
        ComputadoraDataService.getAll()
        .then(response => {
          console.log(response.data);
          setComputadoras(response.data.computadoras);
          
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveComputadoras();
    };
  
    const find = (query, by) => {
      ComputadoraDataService.find(query, by)
        .then(response => {
          console.log(response.data);
          setComputadoras(response.data.computadoras);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const findByName = () => {
      find(buscarNombre, "name")
    };
  
  
    return (
      <div>
        <div className="row pb-1">
          <div className="input-group col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre"
              value={buscarNombre}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {computadoras.map((computadora) => {
            const address = `${computadora.name}`;
            return (
              <div className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{computadora.name}</h5>
                    <p className="card-text">
                      <strong>Name: </strong>{address}
                    </p>
                    <div className="row">
                    <Link to={"/computadoras/"+computadora._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
  
  
        </div>
      </div>
    );
  };
  
  export default ComputadorasList;