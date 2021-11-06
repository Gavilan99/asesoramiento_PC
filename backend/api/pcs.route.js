import express from "express"
import ComputadorasController from "./computadoras.controller.js"
import ComentariosController from "./comentarios.controller.js"
import UsuariosController from "./usuarios.controller.js";


const router = express.Router();

router.route("/").get(ComputadorasController.apiGetComputadoras);
router.route("/id/:id").get(ComputadorasController.apiGetComputadoraById)
router.route("/RAM").get(ComputadorasController.apiGetComputadorasRAMs)
router.route("/operatingSystem").get(ComputadorasController.apiGetComputadorasSO)
router.route("/diskType").get(ComputadorasController.apiGetComputadorasDiskType)
router.route("/diskCapacity").get(ComputadorasController.apiGetComputadorasDiskCapacity)
router.route("/brand").get(ComputadorasController.apiGetComputadorasMarca)

router
    .route("/comentario")
    .post(ComentariosController.apiPostComentario)
    .put(ComentariosController.apiUpdateComentario)
    .delete(ComentariosController.apiDeleteComentario)

router
    .route("/favoritos")
    .get(UsuariosController.apiGetFavoritos)
    .put(UsuariosController.apiPutFavoritos)

router.route("/login") 
    .get(UsuariosController.apiGetUsuario)

router.route("/registro")
    .get(UsuariosController.apiGetNombreUsuario)
    .post(UsuariosController.apiPostUsuario)
    .put(UsuariosController.apiPutContraseña)

router.route("/likes")
    .put(ComentariosController.apiUpdateLikes)
export default router;