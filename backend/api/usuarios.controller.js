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
}