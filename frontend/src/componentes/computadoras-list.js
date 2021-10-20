import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";
import Teams from "./Teams-Icono.png";
import robot4 from "../imagenes/robot4.png";
import compu from "../imagenes/compu.jpg";




const ComputadorasList = props => {
    const [computadoras, setComputadoras] = useState([]);
    const [buscarNombre, setBuscarNombre ] = useState("");
    const [buscarMarca, setBuscarMarca ] = useState("");
    const [buscarRAM, setBuscarRAM ] = useState("");
    const [RAMs, setRAMs] = useState(["RAM"]);
    const [buscarSO, setBuscarSO ] = useState("");
    const [SOs, setSOs] = useState(["operatingSystem"]);
    const [buscarTipoDisco, setBuscarTipoDisco ] = useState("");
    const [TipoDiscos, setTipoDiscos] = useState(["Tipo Disco"]);
    const [buscarMin, setBuscarPrecioMin ] = useState("");
    const [buscarMax, setBuscarPrecioMax ] = useState("");


    
    /*AGREGAR MAS BUSCAR POR...*/
  
    useEffect(() => {
      retrieveComputadoras();
      retrieveRAMs();
      retrieveSOs();
      retrieveTipoDiscos();
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

    const onChangeSearchSO = e => {
      const buscarSO = e.target.value;
      setBuscarSO(buscarSO);
    };

    const onChangeSearchType = e => {
      const buscarTipoDisco = e.target.value;
      setBuscarTipoDisco(buscarTipoDisco);
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
    
    const retrieveRAMs = () => {
      ComputadoraDataService.getRAMs()
        .then(response => {
          console.log(response.data);
          setRAMs(["RAM"].concat(response.data));          
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveSOs = () => {
      ComputadoraDataService.getSOs()
        .then(response => {
          console.log(response.data);
          setSOs(["operatingSystem"].concat(response.data));          
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveTipoDiscos = () => {
      ComputadoraDataService.getTipoDiscos()
        .then(response => {
          console.log(response.data);
          setTipoDiscos([{type:"Tipo Disco"}].concat(response.data));          
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
      if (buscarRAM == "RAM"){
        refreshList();
      }else{
        find(buscarRAM, "RAM")
      }
    };

    const findBySO = () => {
      if (buscarSO == "operatingSystem"){
        refreshList();
      }else{
        find(buscarSO, "operatingSystem")
      }
    };

    const findByTipoDisco = () => {
      if (buscarTipoDisco == "type"){
        refreshList();
      }else{
        find(buscarTipoDisco, "type")
      }
    };

    

    function getCheckboxesSeleccionadas(nombre){
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
    const findByPrice = () =>{

      var price = buscarMin + " "+ buscarMax
      find(price,"price")
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


          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchRAM}>
              {RAMs.map(RAM => {
                return (
                  <option value={RAM}> {RAM.substr(0,20)} </option>
                )
              })}
            </select>
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
                      
            <select onChange={onChangeSearchSO}>
              {SOs.map(SO => {
                return (
                  <option value={SO}> {SO.substr(0,20)} </option>
                )
              })}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findBySO}
              >
                Buscar
              </button>
            </div>
          </div>


          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchType}>
              {TipoDiscos.map(type => {
                return (
                  <option value={type.type}> {String(type.type).substr(0,20)} </option>
                )
              })}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTipoDisco}
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


        <div>
        <img src={Teams} height="20" alt="Its getting bigger!" />
        Microsoft Teams <input type="checkbox" name="App" value="Teams"/>
         Discord <input type="checkbox" name="App" value="Discord"/>

         <button
                className="Boton de radio"
                type="button"
                onClick={() => {}}
              >Enviar </button>
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
