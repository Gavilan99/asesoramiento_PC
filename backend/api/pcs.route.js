import express from "express"
import ComputadorasController from "./computadoras.controller.js"
import ComentariosController from "./comentarios.controller.js"

const router = express.Router();

router.route("/").get(ComputadorasController.apiGetComputadoras);
router.route("/id/:id").get(ComputadorasController.apiGetComputadoraById)
router.route("/RAM").get(ComputadorasController.apiGetComputadorasRAMs)
router.route("/operatingSystem").get(ComputadorasController.apiGetComputadorasSO)
router.route("/diskType").get(ComputadorasController.apiGetComputadorasDiskType)
router.route("/diskCapacity").get(ComputadorasController.apiGetComputadorasDiskCapacity)

router
    .route("/comentario")
    .post(ComentariosController.apiPostComentario)
    .put(ComentariosController.apiUpdateComentario)
    .delete(ComentariosController.apiDeleteComentario)

export default router;