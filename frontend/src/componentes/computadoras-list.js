import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";
import robot4 from "../imagenes/robot4.png";
import compu from "../imagenes/compu.jpg";




const ComputadorasList = props => {
    const [computadoras, setComputadoras] = useState([]);
    const [buscarNombre, setBuscarNombre ] = useState("");
    const [buscarMarca, setBuscarMarca ] = useState("");
    const [buscarRAM, setBuscarRAM ] = useState("");
    const [buscarDisco, setBuscarDisco ] = useState("");
    const [buscarMin, setBuscarPrecioMin ] = useState("");
    const [buscarMax, setBuscarPrecioMax ] = useState("");
    const [buscarTodo, setBuscarTodo] = useState("");


    
    /*AGREGAR MAS BUSCAR POR...*/
  
    useEffect(() => {
      retrieveComputadoras();

    }, []);
  
    const onChangeSearchName = e => {
      const buscarNombre = e.target.value;
      setBuscarNombre(buscarNombre);
    };

    const onChangeSearchPrecioMin = e => {
      const buscarMin = e.target.value;
      setBuscarPrecioMin(buscarMin);
    };
    const onChangeSearchPrecioMax = e => {
      const buscarMax = e.target.value;
      setBuscarPrecioMax(buscarMax);
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

    const findByPrice = () =>{

      var price = buscarMin + " "+ buscarMax
      find(price,"price")
    };
  
    return (
      <div>
        <div className="row pb-1">
        
    
        <div className="input-group col-lg-4 md-5">
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



        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Tipo de Disco"
            value={buscarNombre}
            onChange={onChangeSearchName}
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



        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por tamaño del disco"
            value={buscarNombre}
            onChange={onChangeSearchName}
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

        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Sistema Operativo"
            value={buscarNombre}
            onChange={onChangeSearchName}
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


        <div className="input-group col-lg-4">
          Filtrar por precio
          <input
            type="text"
            placeholder="Min"
            value={buscarMin}
            onChange={onChangeSearchPrecioMin}
          />
          $
          <input
          type="text"
          placeholder="Max"
          value={buscarMax}
          onChange={onChangeSearchPrecioMax}
          />
          $
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByPrice}
            >
              Buscar
            </button>
          </div>
        </div>



       </div>

   





        <div className="row">
        
          {computadoras.map((computadora) => {
            const name = `${computadora.name}`;
            return (
            
              <div className="col-lg-3 pb-3 md-7">
                 
             
               <div className="card text  ">
              
                 <div className="card-body text-dark">
                    <h5 className="card-title center">{computadora.name}</h5>
                    <p className="card-text-right">
                    < img src={computadora.imagenUrl}  class ="d-block w-100 right" /> 
                      <strong>Nombre: </strong>{name}<br/>
                      <strong>Marca: </strong>{computadora.brand}<br/>
                      <strong>RAM: </strong>{computadora.RAM}<br/>
                      <strong>Precio: </strong>{computadora.price}<br/>
                    </p>


                   
                    <div className="row-list-view ">
                   
                   
         
               
        

                    <Link to={"/computadoras/"+computadora._id} className="btn  btn-outline-primary col-lg-5 mx-1 mb-1">
                     Ver Reseña
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + computadora.ubicacion} className="btn  btn-outline-info col-lg-5 mx-1 mb-1">
                      Ver Mapa</a>

                    <a target="_blank" href={computadora.url} className="btn  btn-outline-secondary col-lg-5 mx-1 mb-1">
                      Ver Tienda</a>

                    <Link to={"/computadoras/"+computadora._id} className="btn  btn-outline-primary col-lg-5 mx-1 mb-1">
                     Favorito
                    </Link>
                      
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