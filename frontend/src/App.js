
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AgregarComentario from "./componentes/agregarComentario";
import Computadora from "./componentes/computadoras";
import ComputadorasList from "./componentes/computadoras-list";
import Login from "./componentes/login";
import Encuesta from "./componentes/encuesta";
import About from "./componentes/about";

import "./estilos/estiloPagina.css"
//import "./estilos/estilonav.css"

import Usuarios from "./componentes/usuarios";
import Registro from "./componentes/registro";
import CambioContraseña from "./componentes/cambioContraseña";


function App() {
  
  /*creacion var */
  const [user,setUser]= React.useState(null);

  /*crea funciones de login y logout*/
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

 
  

  return (


  <div >


    
  <nav className="navbar navbar-expand navbar-dark " id="navbar" > 
    
  


    <div className="navbar-nav mr-auto">
    

    
      <li id="nav-item" >
          <Link to={"/encuesta"} className="nav-link">
            Encuesta
          </Link>
          
        </li>

        
        <li id="nav-item">
          <Link to={"/computadoras"} className="nav-link">
            Computadoras
          </Link>
        </li>

        <li id="nav-item">
          <Link to={"/about"} className="nav-link">
            Acerca de
          </Link>
        </li>

        { user ? (
        <li id="nav-item">
          <Link to={`/usuarios`} className = "nav-link">
            Mis Datos
          </Link>
        </li>
      ) : (
        <li></li>
      )
      }


        <li id="nav-item" >
          { user ? (
            <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.usuario}
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}
        </li>

        {/*    
        {user ? (<li></li>) : (
          <li id="nav-item">
            <Link to={"/registro"} className="nav-link">
              Registrar
            </Link>
          </li>
        )}
          */}
          
    </div>
  </nav>   




  <div className="container mt-3" >

    <Switch>
      <Route exact 
        path={["/", "/computadoras"]}
        render={(props) => (
          <ComputadorasList {...props} user={user} />
        )}
      />
      <Route 
        path="/computadoras/:id/comentario"
        render={(props) => (
          <AgregarComentario {...props} user={user} />
        )}
      />
      <Route 
        path="/computadoras/:id"
        render={(props) => (
          <Computadora {...props} user={user} />
        )}
      />
      <Route 
        path="/login"
        render={(props) => (
          <Login {...props} login={login} />
        )}
      />
        <Route 
        path="/encuesta"
        render={(props) => (
          <Encuesta {...props} user={user} />
        )}
      />
      
      <Route 
        path="/about"
        render={(props) => (
          <About {...props} user={user} />
        )}
      />

      <Route
      path = "/usuarios"
      render={(props) => (
          <Usuarios {...props} user={user} />
        )}
      />
      <Route
      path = "/registro"
      render={(props) => (
          <Registro {...props} user={user} /> 
        )}
      />
      <Route 
      path="/cambioContraseña"
      render={(props) => (
          <CambioContraseña {...props} usuario={user} />
        )}
     />

    </Switch>
  </div>
</div>
);
}
export default App;
