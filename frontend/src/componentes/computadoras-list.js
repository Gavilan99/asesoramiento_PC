import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";

const ComputadorasList = props => {
    const [computadoras, setComputadoras] = useState([]);
    const [buscarNombre, setBuscarNombre ] = useState("");
    const [buscarMarca, setBuscarMarca ] = useState("");
    const [buscarRAM, setBuscarRAM ] = useState("");
    /*AGREGAR MAS BUSCAR POR...*/
  
    useEffect(() => {
      retrieveComputadoras();

    }, []);
  
    const onChangeSearchName = e => {
      const buscarNombre = e.target.value;
      setBuscarNombre(buscarNombre);
    };
    
 
    const onChangeSearchMarca = e => {
      const buscarMarca = e.target.value;
      setBuscarMarca(buscarMarca);
    };

    const onChangeSearchRAM = e => {
      const buscarRAM = e.target.value;
      setBuscarRAM(buscarRAM);
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


    const findByBrand = () => {
      find(buscarMarca, "brand")
    };

    const findByRAM = () => {
      find(buscarRAM, "RAM")
    };
  
    return (
      <div>
        <div className="row pb-1">

        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Marca"
            value={buscarMarca}
            onChange={onChangeSearchMarca}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByBrand}
            >
              Buscar
            </button>
          </div>
        </div>


        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por  RAM"
            value={buscarRAM}
            onChange={onChangeSearchRAM}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByRAM}
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
                      <strong>Name: </strong>{address}<br/>
                      <strong>Marca: </strong>{computadora.brand}<br/>
                      <strong>RAM: </strong>{computadora.RAM}<br/>
                      <strong>Precio: </strong>{computadora.price}<br/>



                    </p>
                    <div className="row">
                    <Link to={"/computadoras/"+computadora._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Map</a>

                      <a target="_blank" href={"https://www.google.com" } className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Shop</a>
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