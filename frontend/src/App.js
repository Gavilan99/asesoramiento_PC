
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import agregarComentario from "./componentes/agregarComentario";
import Computadora from "./componentes/computadoras";
import ComputadorasList from "./componentes/computadoras-list";
import Login from "./componentes/login";


function App() {
  
  /*creacion var */
  const [user,setUser]= React.useState(null);
 

  /*crea funciones de login y logout*/
  async function login(user = null) {
    setUser(user);}

  async function logout() {
    setUser(null)}



  return (
  <div>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <a href="/computadoras" className="navbar-brand">
      Comentarios Computadoras
    </a>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/computadoras"} className="nav-link">
          Computadoras
        </Link>
      </li>
      <li className="nav-item" >
        { user ? (
          <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
            Logout {user.name}
          </a>
        ) : (            
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
        )}

      </li>
    </div>
  </nav>

  <div className="container mt-3">
    <Switch>
      <Route exact path={["/", "/computadoras"]} component={ComputadorasList} />
      <Route 
        path="/computadoras/:id/comentario"
        render={(props) => (
          <agregarComentario{...props} user={user} />
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
    </Switch>
  </div>
</div>
);
}
export default App;