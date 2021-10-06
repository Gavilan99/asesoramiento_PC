import express from "express"
import { MongoNetworkTimeoutError } from "mongodb";
import ComputadorasCtrl from "./computadoras.controller.js"
import ComentariosCtrl from "./comentarios.controller.js"

const router = express.Router();

router.route("/").get(ComputadorasCtrl.apiGetComputadoras);
router.route("/id/:id").get(ComputadorasCtrl.apiGetComputadorasById)

router
    .route("/comentario")
    .post(ComentariosCtrl.apiPostComentario)
    .put(ComentariosCtrl.apiUpdateComentario)
    .delete(ComentariosCtrl.apiDeleteComentario)

export default router;