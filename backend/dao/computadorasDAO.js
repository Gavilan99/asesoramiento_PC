import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

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
        computadorasPorPagina = 20,
    } = {}) {
        let query
        console.log("Hace la query")
        if (filters){ //Agregar un "and" de filtros a la query
            if  ("brand" in filters){
                query = {"brand": {$eq: filters["brand"]}}
            }
            else if ("minPrice" in filters && "maxPrice" in filters){
                console.log("Entra a la etapa mongo")
                query = {"price": {$lte: filters["maxPrice"]},"price": {$gte: filters["minPrice"]}}
            }
            else if ("RAM" in filters){
                query = {"RAM": {$eq: filters["RAM"]}}
            }
            else if ("description" in filters){
                query = {"description": {$eq: filters["description"]}}
            }
            else if ("name" in filters){
                query = {"name": {$eq: filters["name"]}}
            }
            else if ("operatingSystem" in filters){
                query = {"operatingSystem": {$eq: filters["operatingSystem"]}}
            }
            else if ("type" in filters){
                query = {"disks.type": {$eq: filters["type"]}}
            }
            else if ("capacity" in filters){
                query = {"disks.capacity": {$eq: filters["capacity"]}}
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

    static async getRAMs() {
        let RAMs = []
        try {
          RAMs = await computadoras.distinct("RAM")
          return RAMs
        } catch (e) {
          console.error(`Unable to get RAMs, ${e}`)
          return RAMs
        }
    }

    static async getSOs() {
        let SOs = []
        try {
          SOs = await computadoras.distinct("operatingSystem")
          return SOs
        } catch (e) {
          console.error(`Unable to get SOs, ${e}`)
          return SOs
        }
    }

    static async getDiskTypes() {
        let SOs = []
        try {
          SOs = await computadoras.distinct("disks")
          return SOs
        } catch (e) {
          console.error(`Unable to get SOs, ${e}`)
          return SOs
        }
    }

    static async getDiskCapacitys() {
        let SOs = []
        try {
          SOs = await computadoras.distinct("disks")
          return SOs
        } catch (e) {
          console.error(`Unable to get SOs, ${e}`)
          return SOs
        }
    }
}
