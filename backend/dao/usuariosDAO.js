import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let usuarios

export default class UsuariosDAO {
    static async injectDB(conn){
        if (usuarios){
            return
        }
        try {
            usuarios = await conn.db(process.env.RESTREVIEWS_NS).collection("usuarios")
        }
        catch (e){
            console.error(
                `Unable to establish a connection handle in usuariosDAO: ${e}`,
            )
        }
    }

    static async getFavoritos({
        user = "",
        pagina = 0,
        computadorasPorPagina = 20
    } = {}){
       let usuario; 
       try{
           usuario = await usuarios.find({"usuario": {$eq: user}});
           usuario = await usuario.toArray()
           console.log(usuario)
       }
       catch (e){
            console.error(`Unable to issue find command, ${e}`)
            return {paginaFavoritos: [], computadorasPagina: 0}
       }

       let paginaFavoritos

       try {
            paginaFavoritos = usuario[0].favoritos.slice(pagina*computadorasPorPagina, (pagina + 1)*computadorasPorPagina)
            const computadorasPagina = paginaFavoritos.length;
            return {paginaFavoritos, computadorasPagina}
        }
        catch (e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {paginaFavoritos: [], computadorasPagina: 0}
        }

    }

}