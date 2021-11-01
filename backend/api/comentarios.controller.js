import ReviewsDAO from "../dao/comentariosDAO.js"

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

            const reviewResponse = await ReviewsDAO.addComentario(
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

            const reviewResponse = await ReviewsDAO.updateComentario(
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
            const userId = req.query.userId
            console.log(comentarioId)
            const reviewResponse = await ReviewsDAO.deleteComentario(
                comentarioId,
                userId,
            )

            res.json({status: "success"})
        }
        catch (e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateLikes(req, res, next){
        try {
            const likes = req.likes
            console.log("Hola estoy en comentario controller");
            ReviewsDAO.updateLikes(likes)

            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}