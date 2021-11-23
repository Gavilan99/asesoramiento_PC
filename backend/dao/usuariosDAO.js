import mongodb from "mongodb"
import bcrypt from "bcryptjs"
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
       }
       catch (e){
            console.error(`Unable to issue find command, ${e}`)
            return {paginaFavoritos: [], computadorasPagina: 0}
       }

       let paginaFavoritos

       try {
            if (usuario[0].favoritos.slice(pagina*computadorasPorPagina).length >= computadorasPorPagina){
                paginaFavoritos = usuario[0].favoritos.slice(pagina*computadorasPorPagina, (pagina + 1)*computadorasPorPagina)
            }
            else{
                paginaFavoritos = usuario[0].favoritos.slice(pagina*computadorasPorPagina)
            }
            
            const computadorasPagina = paginaFavoritos.length;
            return {paginaFavoritos, computadorasPagina}
        }
        catch (e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {paginaFavoritos: [], computadorasPagina: 0}
        }
        
    }

    static async putFavorito({
        user = "",
        computadora
    } = {}) {
        try {
            const updateResponse = await usuarios.updateOne({"usuario": {$eq: user}}, {$push: {"favoritos": computadora}});
            return updateResponse
        }
        catch (e){
            console.error(`Unable to issue update command, ${e}`)
            return {error: e}
        }

    }

    static async deleteFavorito({
        user = "",
        computadora = ""
    } = {}) {
        try {
            const deleteResponse = await usuarios.updateOne({"usuario": {$eq: user}}, {$pull: {"favoritos": {"_id": {$eq: computadora}}}})
            return deleteResponse
        }
        catch (e) {
            console.error(`Unable to issue delete command, ${e}`)
            return {error: e}
        }
    }

    static async getUsuario({ usuario, contraseña } = {}) {
        let user;
        try {
          user = await usuarios.find({ usuario: { $eq: usuario } });
          user = await user.toArray();
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`);
          return { usuario: "Invalido", contraseña: "Invalido" };
        }
    
        if (user.length == 0) {
          return { usuario: "Invalido", contraseña: "Invalido" };
        }
        //comprobar contraseña
        if (await bcrypt.compare(contraseña, user[0].contraseña)) {
          //
          // the username, password combination is successful
          return { user };
        } else {
          return { usuario: "Invalido", contraseña: "Invalido" };
        }
      }

     static async getNombreUsuario({usuario} = {}) {
        let user;
        try {
          user = await usuarios.find({ usuario: { $eq: usuario } });
          user = await user.toArray();
          return {user}
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`);
          return {error: "error"};
        }
      } 

      static async addUsuario({usuario, contraseña}={}){
        try {
            const contraHash = await bcrypt.hash(contraseña, 10)
            const reviewDoc = {
                usuario: usuario,
                contraseña: contraHash,
            }
            return await usuarios.insertOne(reviewDoc)
        }
        catch (e){
            console.error(`Unable to post usuario: ${e}`)
            return {error: e}
        }
    }

    static async cambiarContraseñas({contraseñas} ={}){
        try{
            if (await bcrypt.compare(contraseñas.contraseñaViejaInput, contraseñas.contraseñaVieja)){
                const usuario = contraseñas.usuario
                const contraseña = await bcrypt.hash(contraseñas.contraseñaNueva, 10)
                const updateResponse = await usuarios.updateOne({"usuario": {$eq: usuario}}, {$set: {"contraseña": contraseña}})
                return updateResponse
            }
            else {
                return {incorrecta: "Contraseñas Incorrectas"}
            }
        }
        catch (e){
            console.error(`Unable to issue update command, ${e}`)
            return {error: e}
        }

    }

}