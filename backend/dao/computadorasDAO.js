import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let computadoras

export default class ComputadorasDAO {
    static async injectDB(conn){
        if (computadoras){
            return
        }
        try {
            computadoras = await conn.db(process.env.RESTREVIEWS_NS).collection("computadoras")
        }
        catch (e){
            console.error(
                `Unable to establish a connection handle in computadorasDAO: ${e}`,
            )
        }
    }

    static async getComputadoras({
        filters = null,
        pagina = 0,
        computadorasPorPagina = 20,
    } = {}) {
        let query
        if (filters){ //Agregar un "and" de filtros a la query
            if ("description" in filters){
                query = {$text: {$search: filters["description"]}}
            }
            else if ("brand" in filters){
                query = {"brand": {$eq: filters["brand"]}}
            }
            else if ("minPrice" in filters && "maxPrice" in filters){
                query = {"price": {$lte: filters["maxPrice"], $gte: filters["minPrice"]}}
            }
            else if ("RAM" in filters){
                query = {"RAM": {$eq: filters["RAM"]}}
            }
        }

        let cursor

        try {
            cursor = await computadoras.find(query)
        }
        catch (e){
            console.error(`Unable to issue find command, ${e}`)
            return {computadorasList: [], totalNumComputadoras: 0}
        }

        const displayCursor = cursor.limit(computadorasPorPagina).skip(computadorasPorPagina * pagina)

        try {
            const computadorasList = await displayCursor.toArray()
            const totalNumComputadoras = await computadoras.countDocuments(query)
            return {computadorasList, totalNumComputadoras}
        }
        catch (e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {computadorasList: [], totalNumComputadoras: 0}
        }
    }

    static async getComputadoraByID(id){
        try{
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        $lookup: {
                            from: "comentarios",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$computadora_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "comentarios",
                        },
                    },
                    {
                        $addFields: {
                            comentarios: "$comentarios",
                        },
                    },
            ]
            return await computadoras.aggregate(pipeline).next()
        }
        catch (e){
            console.error(`Something went wrong in getComputadoraByID: ${e}`)
            throw e
        }
    }

}