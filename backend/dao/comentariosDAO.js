import mongodb from "mongodb"
import bcrypt from "bcryptjs"
const ObjectId = mongodb.ObjectId

let comentarios

export default class ReviewsDAO{
    static async injectDB(conn){
        if (comentarios){
            return
        }
        try{
            comentarios = await conn.db(process.env.RESTREVIEWS_NS).collection("comentarios")
        }
        catch (e){
            console.error(`Unable to establish connection handles in comentariosDAO: ${e}`)
        }
    }

    static async addComentario(computadoraId, user, comentario, date){
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: comentario,
                computadora_id: ObjectId(computadoraId),
                likes: [],
            }
            return await comentarios.insertOne(reviewDoc)
        }
        catch (e){
            console.error(`Unable to post comentario: ${e}`)
            return {error: e}
        }
    }

    static async updateComentario(comentarioId, userId, text, date){
        try{
            const updateResponse = await comentarios.updateOne(
                {user_id: userId, _id: ObjectId(comentarioId)},
                {$set: {text: text, date: date}},
            )

            return updateResponse
        }
        catch (e){
            console.error(`Unable to update comentario: ${e}`)
            return {error: e}
        }
    }

    static async deleteComentario(comentarioId, userId){
        try {
            console.log(userId)
            const deleteResponse = await comentarios.deleteOne({
                _id: ObjectId(comentarioId),
                user_id: userId,
            })

            return deleteResponse
        }
        catch (e){
            console.error(`Unable to delete comentario: ${e}`)
            return {error: e}
        }
    }

    static async agregarLikes(likes){
        try {
            console.log(likes.nombre)
            await comentarios.updateOne(
                {_id: ObjectId(likes.nombre)}
                ,{ $push: { "likes":likes.usuario } }
            )
        } catch (e) {
            return {error: e}
        }
    }

    static async substraerLikes(likes){
        try {
            console.log(likes.nombre)
            await comentarios.updateOne(
                {_id: ObjectId(likes.nombre)}
                ,{ $pull: { "likes": likes.usuario } }
            )
        } catch (e) {
            return {error: e}
        }
    }
}