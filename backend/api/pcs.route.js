import express from "express"
import ComputadorasController from "./computadoras.controller.js"
import ComentariosController from "./comentarios.controller.js"

const router = express.Router();

router.route("/").get(ComputadorasController.apiGetComputadoras);
router.route("/id/:id").get(ComputadorasController.apiGetComputadoraById)


router
    .route("/comentario")
    .post(ComentariosController.apiPostComentario)
    .put(ComentariosController.apiUpdateComentario)
    .delete(ComentariosController.apiDeleteComentario)

export default router;