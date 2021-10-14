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
    return http.delete(`/comentario?id=${id}`);
  }

  getComputadora(id) {
    return http.get(`/computadora`);
  }

}

export default new ComputadoraDataService();