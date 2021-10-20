import React, { useState, useEffect } from "react";
import ComputadoraDataService from "../servicios/computadora";
import { Link } from "react-router-dom";

const Usuarios = props => {

    const [usuario, setUsuario] = useState(props.user);
    const [computadoras, setComputadoras] = useState([]);

    const retrieveFavoritos = () => {
        ComputadoraDataService.getFavoritos(usuario.name)
        .then(response => {
          console.log(response.data.computadoras);
          setComputadoras(response.data.computadoras);
        })
        .catch(e => {
          console.log(e);
        });
    };

    return(
        <div>
            <div className = "row">
                <h3>Mis Datos</h3>
            </div>
            <div>
                <h6>Usuario: {usuario.name}</h6>
                <h6>Contaseña: {"*".repeat(usuario.id.length)}</h6>
            </div>
            <div>
                <h3>Favoritos</h3>
                
                <div className="row">
                    {retrieveFavoritos()}
                    {computadoras.map((computadora) => {
                        const address = `${computadora.name}`;
                        return (
                            <div className="col-lg-4 pb-1">
                                <div className="card">
                                    <div className="card-body">

                                        <h5 className="card-title">{computadora.name}</h5>

                                        <p className="card-text">
                                            <strong>Nombre: </strong>{address}<br/>
                                            <strong>Marca: </strong>{computadora.brand}<br/>
                                            <strong>RAM: </strong>{computadora.RAM}<br/>
                                            <strong>Precio: </strong>{computadora.price}<br/>
                                        </p>
                                        <div className="row">
                                            <Link to={"/computadoras/"+computadora._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                                Ver Reseña
                                            </Link>
                                            <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                                Ver Mapa
                                            </a>

                                            <a target="_blank" href={computadora.url} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                                Ver Tienda
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Usuarios;