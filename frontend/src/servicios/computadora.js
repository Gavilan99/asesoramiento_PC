import http from "../http-common";

class ComputadoraDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
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