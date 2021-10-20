import ComputadorasDAO from "../dao/computadorasDAO.js";

export default class ComputadorasController {
    static async apiGetComputadoras(req, res, next){
        console.log("Entro al filters")
        const computadorasPorPagina = req.query.computadorasPorPagina ? parseInt(req.query.computadorasPorPagina, 10) : 20
        const pagina = req.query.pagina ? parseInt(req.query.pagina, 10) : 0

        
        let filters = {}  //Definir filtros en base a documento JSON
        if (req.query.description){
            filters.description = req.query.description
        }
        else if  (req.query.brand){
            filters.brand = req.query.brand
        }
        else if (req.query.price){
            console.log("Valores en back");
            console.log(req.query.price)
            var arr = req.query.price.split(" ")
            var minPrice= arr[0]
            var maxPrice=arr[1]
            console.log(minPrice)
            console.log(maxPrice)
            minPrice = parseInt(minPrice) 
            maxPrice = parseInt(maxPrice)

            filters.minPrice = minPrice
            filters.maxPrice = maxPrice
        }
        else if (req.query.RAM){
            filters.RAM = req.query.RAM
        }
        else if (req.query.name ){
            filters.name = req.query.name
        }
        else if (req.query.operatingSystem ){
            filters.operatingSystem = req.query.operatingSystem
        }
        else if (req.query.type ){
            filters.type = req.query.type
        }
        else if (req.query.capacity ){
            filters.capacity = req.query.capacity
        }

        //Trae de la base de datos
        const {computadorasList, totalNumComputadoras} = await ComputadorasDAO.getComputadoras({ 
            filters,
            pagina,
            computadorasPorPagina,
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

    static async apiGetComputadorasRAMs(req, res, next) {
        try {
          let RAMs = await ComputadorasDAO.getRAMs()
          res.json(RAMs)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
    }

    static async apiGetComputadorasSO(req, res, next) {
        try {
          let SOs = await ComputadorasDAO.getSOs()
          res.json(SOs)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
    }

    static async apiGetComputadorasDiskType(req, res, next) {
        try {
          let type = await ComputadorasDAO.getDiskTypes()
          res.json(type)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
    }

    static async apiGetComputadorasDiskCapacity(req, res, next) {
        try {
          let capacity = await ComputadorasDAO.getDiskCapacitys()
          res.json(capacity)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
    }

}