import ComentariosDAO from "../dao/comentariosDAO.js"

export default class ComentariosController {
    static async apiPostComentario(req, res, next){
        try {
            const computadoraId = req.body.computadora_id
            const comentario = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const reviewResponse = await ComentariosDAO.addComentario(
                computadoraId,
                userInfo,
                comentario,
                date,
            )
            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateComentario(req, res, next){
        try {
            const comentarioId = req.body.comentario_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ComentariosDAO.updateComentario(
                comentarioId,
                req.body.user_id,
                text,
                date,
            )

            var {error} = reviewResponse
            if (error){
                res.status(400).json({error})
            }

            if (reviewResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update comentario - user may not be original poster",
                )
            }

            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteComentario(req, res, next){
        try{
            const comentarioId = req.query.id
            const userId = req.body.user_id
            console.log(comentarioId)
            const reviewResponse = await ComentariosDAO.deleteComentario(
                comentarioId,
                userId,
            )

            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }
}