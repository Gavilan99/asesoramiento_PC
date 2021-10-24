import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";
import robot4 from "../imagenes/robot4.png";
import compu from "../imagenes/compu.jpg";




const ComputadorasList = props => {
  const [computadoras, setComputadoras] = useState([]);
  const [computadorasMostar,setComputadorasMostar] = useState([]);
  const [buscarMarca, setBuscarMarca ] = useState("");
  const [buscarRAM, setBuscarRAM ] = useState("");
  const [RAMs, setRAMs] = useState(["RAM"]);

  const ComputadorasList = props => {
  const [buscarMax, setBuscarPrecioMax ] = useState("");
  const [buscarComb,setBuscarComb] = useState("");


  

  

useEffect(() => {
retrieveComputadoras();
retrieveRAMs();
retrieveSOs();
retrieveTipoDiscos();
retrieveCapacidadDisco();
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
//const buscarRAM = e.target.value;
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

  const onChangeSearchCapacity = e => {
    const buscarCapacidadDisco = e.target.value;
    setBuscarCapacidadDisco(buscarCapacidadDisco);
  };

  
function filtricos(post){ 

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
let a=""
let flag=0

  
  const refreshList = () => {
    retrieveComputadoras();
  };
if(buscarRAM!="RAM"){
  a=a+"post.RAM == buscarRAM "
  flag=1
}
if(buscarSO!="Sistema operativo"){
  if(flag==1){
    a=a+"&& "
  }
  a=a+"post.operatingSystem == buscarSO"
  flag=1
}
if(buscarTipoDisco != "Tipo de disco"){
  if(flag==1){
    a=a+"&& "
  }
  a=a+"post.disks.type == buscarTipoDisco"
  flag=1
}
if(buscarCapacidadDisco!="Capacidad del disco"){
if(flag==1){
  a=a+"&& "
}
a=a+"post.disks.capacity == buscarCapacidadDisco"
flag=1
}

if(flag==0){
  refreshList();
}


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
return eval(a)
 }

const findByAll = () =>  {

let posts=computadoras.filter(filtricos)
setComputadorasMostar(posts)

  const findByAll = () =>{
    if (buscarRAM == "RAM" && buscarSO == "Sistema operativo" && buscarTipoDisco == "Tipo de disco" && buscarCapacidadDisco == "Capacidad del disco"){
      refreshList();
    }else{
      
    }
  }
}


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
  };


function getCheckboxesSeleccionadas(nombre){
var boxes = document.getElementsByName(nombre);
var result =[];
for (var i=0; i<boxes.length;i++){
  if (boxes[i].checked){
    result.push(boxes[i].value);
  }
  
  const findByPrice = () =>{
}
console.log(result);
return result;
};

const findByPrice = () =>{

var price = buscarMin + " "+ buscarMax
find(price,"price")
  };

function pruebaBoton(){
console.log("HOla jose")
  };

    var price = buscarMin + " "+ buscarMax
    find(price,"price")
    
  
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
};
  export default ComputadorasList;