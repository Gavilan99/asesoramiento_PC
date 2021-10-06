import ComputadorasDAO from "../dao/computadorasDAO.js";

export default class ComputadorasController {
    static async apiGetComputadoras(req, res, next){
        const computadorasPorPagina = req.query.computadorasPorPagina ? parseInt(req.query.computadorasPorPagina, 10) : 20
        const pagina = req.query.pagina ? parseInt(req.query.pagina, 10) : 0

        let filters = {}  //Definir filtros en base a documento JSON
        if (req.body.brand){
            filters.brand = req.body.brand
        }

        const {computadorasList, totalNumComputadoras} = await ComputadorasDAO.getComputadoras({
            filters,
            pagina: pagina,
            computadorasPorPagina: computadorasPorPagina,
        })

        let response = {
            computadoras: computadorasList,
            pagina: pagina,
            filters: filters,
            entries_por_pagina: computadorasPorPagina,
            total_resultados: totalNumComputadoras,
        }
        res.json(response)
    }

    static async apiGetComputadoraById(req, res, next){
        try{
            let id = req.params.id || {}
            let computadora = await ComputadorasDAO.getComputadoraByID(id)
            if (!computadora){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(computadora)
        }
        catch (e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

}