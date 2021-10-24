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
        let flag=0
        if(filters){
            query= "{"
            if(filters.RAM!="RAM"){
                query = query + "RAM: "+ filters.RAM
                flag=1
            }
            if(filters.SO!="Sistema operativo"){
                if(flag==1){
                    query=query + ","
                }
                query=query+ "operatingSystem: "+filters.SO
            }
            if(!("Tipo de disco" in filters.type)){
                if(flag==1){
                    query=query + ","
                }
                query = query +"{"+"disks.type: {$eq:"+  filters.type +"} }"
               
            }
            if(!("Tipo de disco" in filters.capacity)){
                if(flag==1){
                    query=query + ","
                }
                query = query +"{"+"disks.capacity: {$eq:"+  filters.capacity +"} }"
            }
            if(filters.apps.length !=0 ){
                if(flag==1){
                    query=query + ","
                }
                query=query+"Aplicaciones: {$in: "+ filters.app +"}"
            }
            if(filters.max!=null && filters.min!=null){
                if(flag==1){
                    query=query + ","
                }
                query=query+"price: {$lte: "+ filters.min +","+"$gte: "+filters.max+"}"
            }

            query=query+"}"

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
    

   /* 
    static async getComputadoras({
        filters = null,
        pagina = 0,
 @@ -153,7 +80,7 @@ export default class ComputadorasDAO {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {computadorasList: [], totalNumComputadoras: 0}
        }
    }*/

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