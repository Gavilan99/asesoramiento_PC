import http from "../http-common";

class ComputadoraDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    console.log("Entro al find ")
    return http.get(`?${by}=${query}&page=${page}`); /*La query es el valor y by es el nombre del atributo (la columna)
    Todo eso forma parte de la req
    No soporta objetos complejos*/
  }


  createReview(data) {
    return http.post("/comentario", data);
  }

  updateReview(data) {
    return http.put("/comentario", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/comentario?id=${id}&userId=${userId}`);
  }

  getComputadora(id) {
    return http.get(`/computadora`);
  }

  getRAMs(id){
    return http.get(`/RAM`);
  }

  getMarcas(id){
    return http.get(`/brand`);
  }

  getSOs(id){
    return http.get('/operatingSystem')
  }

  getTipoDiscos(id){
    return http.get('/diskType')
  }

  getCapacidadDiscos(id){
    return http.get('/diskCapacity')
  }

  getFavoritos(user) {
    return http.get(`/favoritos?user=${user}`);
  }

  putFavorito(user, computadora){
    return http.put(`/favoritos?user=${user}`, computadora);
  }

  getUsuario(usuario, contraseña){ //user va a ser un json conteniendo usuario y contraseña
    return http.get(`/login?usuario=${usuario}&contrasena=${contraseña}`);
  }

  getNombreUsuario(usuario){
    return http.get(`/registro?usuario=${usuario}`);
  }

  postUsuario(usuario){
    return http.post(`/registro`, usuario);
  }

  cambioContraseña(contraseñas){
    return http.put(`/registro`, contraseñas);
  }

  agregarLikes(likes){
    return http.put(`/agregarLikes`,likes);     
  }

  substraerLikes(likes){
    return http.put(`/substraerLikes`,likes);
  }
}

export default new ComputadoraDataService();