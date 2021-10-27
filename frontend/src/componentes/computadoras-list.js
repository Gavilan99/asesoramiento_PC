import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";
import Teams from "./Teams-Icono.png";
import robot4 from "../imagenes/robot4.png";
import compu from "../imagenes/compu.jpg";
import computadora from "../servicios/computadora";


const ComputadorasList = props => {
    const [computadoras, setComputadoras] = useState([]);
    const [computadorasMostar,setComputadorasMostar] = useState([]);
    const [buscarMarca, setBuscarMarca ] = useState("");
    const [Marcas, setMarcas ] = useState(["brand"]);
    const [buscarRAM, setBuscarRAM ] = useState("");
    const [RAMs, setRAMs] = useState(["RAM"]);
    const [buscarSO, setBuscarSO ] = useState("");
    const [SOs, setSOs] = useState(["operatingSystem"]);
    const [buscarTipoDisco, setBuscarTipoDisco ] = useState("");
    const [TipoDiscos, setTipoDiscos] = useState(["type"]);
    const [buscarCapacidadDisco, setBuscarCapacidadDisco ] = useState("");
    const [CapacidadDiscos, setCapacidadDiscos] = useState(["capacity"]);
    const [buscarMin, setBuscarPrecioMin ] = useState("");
    const [buscarMax, setBuscarPrecioMax ] = useState("");
    const [buscarApps, setBuscarApps] = useState([]);
    //const [buscarComb,setBuscarComb] = useState("");

/*AGREGAR MAS BUSCAR POR...*/

  
useEffect(() => {
  retrieveComputadoras();
  retrieveRAMs();
  retrieveSOs();
  retrieveTipoDiscos();
  retrieveCapacidadDisco();
  retrieveMarcas();
}, []);


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
  setBuscarRAM(e.target.value);
};

const onChangeSearchSO = e => {
  const buscarSO = e.target.value;
  setBuscarSO(e.target.value);
};

const onChangeSearchType = e => {
  const buscarTipoDisco = e.target.value;
  setBuscarTipoDisco(buscarTipoDisco);
};

const onChangeSearchCapacity = e => {
  const buscarCapacidadDisco = e.target.value;
  setBuscarCapacidadDisco(buscarCapacidadDisco);
};

const onChangeSearchApps = e =>{
  const app = e.target.value;
  setBuscarApps(getCheckboxesSeleccionadas("App"));
}


const retrieveMarcas = () => {
  ComputadoraDataService.getMarcas()
  .then(response => {
    console.log(response.data);
    setMarcas(["Marca"].concat(response.data));
  })
  .catch(e => {
    console.log(e);
  });
};

const retrieveComputadoras = () => {
    ComputadoraDataService.getAll()
    .then(response => {
      setComputadoras(response.data.computadoras);
      setComputadorasMostar(response.data.computadoras)
      
    })
    .catch(e => {
      console.log(e);
    });
};

const retrieveRAMs = () => {
  ComputadoraDataService.getRAMs()
    .then(response => {
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
      setSOs(["Sistema operativo"].concat(response.data));          
    })
    .catch(e => {
      console.log(e);
    });
};

const retrieveTipoDiscos = () => {
  ComputadoraDataService.getTipoDiscos()
    .then(response => {
      console.log(response.data);
      setTipoDiscos([{type:"Tipo de disco"}].concat(response.data));          
    })
    .catch(e => {
      console.log(e);
    });
};

const retrieveCapacidadDisco = () => {
  ComputadoraDataService.getCapacidadDiscos()
    .then(response => {
      console.log(response.data);
      setCapacidadDiscos([{capacity:"Capacidad del disco"}].concat(response.data));          
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
  if (buscarSO == "Sistema operativo"){
    refreshList();
  }else{
    find(buscarSO, "operatingSystem")
  }
};

const findByTipoDisco = () => {
  if (buscarTipoDisco == "Tipo de disco"){
    refreshList();
  }else{
    find(buscarTipoDisco, "type")
  }
};

const findByCapacidadDisco = () => {
  if (buscarCapacidadDisco == "Capacidad del disco"){
    refreshList();
  }else{
    
  }
};

function pertenecenTodos(base, sub){
  var diff = sub.filter(function(x) { return base.indexOf(x) < 0 })
  return diff.length==0;
}

function filtricos(post){ 
  
  let a=""
  let flag=0

  if(buscarRAM!="RAM" && buscarRAM.length!=0){
    
    a=a+"post.RAM == buscarRAM "
    flag=1
  }
  if (buscarMarca!= "Marca" && buscarMarca.length!=0){
    if(flag==1){
      a= a+" && "
    }
    a=a+"post.brand == buscarMarca"
    flag=1
  }

  if (buscarMin!="" || buscarMax!=""){
    if(flag==1){
      a=a+" && "
    }
    if (buscarMin!="" && buscarMax!=""){
      
      a = a + "parseInt(post.price,10) >= parseInt(buscarMin,10) && parseInt(post.price,10) <= parseInt(buscarMax,10)"
    }
    else if (buscarMax==""){
      a = a + "parseInt(post.price,10) >= parseInt(buscarMin,10)";
    }
    else {
      a = a + "parseInt(post.price,10) <= parseInt(buscarMax,10)"
    }
    flag = 1
  }
  
  if(buscarSO!="Sistema operativo" && buscarSO.length!=0){
    if(flag==1){
      a=a+" && "
    }
    a=a+"post.operatingSystem == buscarSO"
    flag=1
  }
  if (buscarApps.length!=0){
    if(flag==1){
      a=a+" && "
    }
    a = a + "pertenecenTodos(post.aplicaciones,buscarApps)";
    flag = 1;
  }
  if(buscarTipoDisco != "Tipo de disco" && buscarTipoDisco.length!=0){
    if(flag==1){
      a=a+" && "
    }
    a=a+"post.disks.type == buscarTipoDisco"
    flag=1
  }
  if(buscarCapacidadDisco!="Capacidad del disco" && buscarCapacidadDisco.length!=0){
    if(flag==1){
      a=a+" && "
    }
    a=a+"post.disks.capacity == buscarCapacidadDisco"
    flag=1
  }

  if(flag==0){
    a="computadoras"
  }
  
  console.log(a)
  return eval(a)
}

const findByAll = () =>  {
  let posts=computadoras.filter(filtricos)
  setComputadorasMostar(posts)
}


function getCheckboxesSeleccionadas(nombre){
  var boxes = document.getElementsByName(nombre);
  var result =[];
  for (var i=0; i<boxes.length;i++){
    if (boxes[i].checked){
      result.push(boxes[i].value);
    }
  }
  return result;
}

const findByPrice = () =>{

  var price = buscarMin + " "+ buscarMax
  find(price,"price")
};

function pruebaBoton(){
}

const putFavorito = (user, computadora) => {
  ComputadoraDataService.putFavorito(user, computadora);
  alert("Agregado a Favoritos!")
}


    
  
    return (
      
      
      <div>
        <div className="row pb-1">
       
          <div className="input-group col-lg-4">
            <select onChange={onChangeSearchMarca}>
              {console.log(Marcas)}
              {Marcas.map(marca => {
                return (
                  <option value={marca}> {marca.substr(0,20)} </option>
                )
              })}
            </select>
            
          </div>


          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchRAM}>
              {RAMs.map(RAM => {
                return (
                  <option value={RAM}> {RAM.substr(0,20)} </option>
                )
              })}
            </select>
            
          </div>

          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchSO}>
              {SOs.map(SO => {
                return (
                  <option value={SO}> {SO.substr(0,20)} </option>
                )
              })}
            </select>
           
          </div>


          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchType}>
              {TipoDiscos.map(type => {
                return (
                  <option value={type.type}> {String(type.type).substr(0,20)} </option>
                )
              })}
            </select>
            
          </div>


          <div className="input-group col-lg-4">
                      
            <select onChange={onChangeSearchCapacity}>
              {CapacidadDiscos.map(capacity => {
                return (
                  <option value={capacity.capacity}> {String(capacity.capacity).substr(0,20)} </option>
                )
              })}
            </select>
            
          </div>



        <div>
        <img src={Teams} height="20" alt="Its getting bigger!" />
         Microsoft Teams <input type="checkbox" name="App" value="Microsoft Teams" onChange={onChangeSearchApps}/>
         Discord <input type="checkbox" name="App" value="Discord" onChange={onChangeSearchApps}/>

    
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
            
          </div>
        </div>

        <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick= {()=>{findByAll();}}
              >
                Buscar
              </button>
        </div>

       </div>

   





        <div className="row">
        
          {computadorasMostar.map((computadora) => {
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

                      {
                        props.user ? (
                          <div 
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                            type = "button"
                            onClick = {() => putFavorito(props.user.usuario, computadora)}
                          >
                            Favorito
                          </div>
                        ) : (<p></p>)
                      }
                      
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
