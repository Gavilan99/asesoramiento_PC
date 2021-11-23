import UsuariosDAO from "../dao/usuariosDAO.js"

export default class UsuariosController {
    static async apiGetFavoritos(req, res, next) {
        const computadorasPorPagina = req.query.computadorasPorPagina ? parseInt(req.query.computadorasPorPagina, 10) : 20
        const pagina = req.query.pagina ? parseInt(req.query.pagina, 10) : 0

        const user = req.query.user
        const {paginaFavoritos, computadorasPagina} = await UsuariosDAO.getFavoritos({
            user,
            pagina,
            computadorasPorPagina,
        })

        let response = {
            computadoras: paginaFavoritos,
            pagina: pagina,
            entries_por_pagina: computadorasPorPagina,
            total_resultados: computadorasPagina,
        }
        res.json(response)
    }

    static async apiPutFavoritos(req, res, next) {
        try {
            const user = req.query.user
            const computadora = req.body

            const favResponse = await UsuariosDAO.putFavorito({
                user,
                computadora,
            })

            var {error} = favResponse
            if (error){
                res.status(400).json({error})
            }

            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteFavoritos(req, res, next){
        try{
            const user = req.query.user
            const computadora = req.query.computadora
            const reviewResponse = await UsuariosDAO.deleteFavorito({
                user,
                computadora,
            })

            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetUsuario(req, res, next){
        const usuario = req.query.usuario
        const contraseña = req.query.contrasena
        const respuesta = await UsuariosDAO.getUsuario({usuario, contraseña})
        res.json(respuesta)
    }

    static async apiGetNombreUsuario(req, res, next){
        const usuario = req.query.usuario
        const respuesta = await UsuariosDAO.getNombreUsuario({usuario})
        res.json(respuesta)
    }

    static async apiPostUsuario(req, res, next){
        try {
            const usuario = req.body.usuario
            const contraseña = req.body.contraseña

            const response = await UsuariosDAO.addUsuario({
                usuario,
                contraseña,
            })
            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiPutContraseña(req, res, next){
        try{
            const contraseñas = req.body

            const response = await UsuariosDAO.cambiarContraseñas({contraseñas})
            res.json(response)
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }
}