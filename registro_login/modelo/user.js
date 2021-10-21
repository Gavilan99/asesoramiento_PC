const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
    usuario: {type: String, required: true, unique: true}, //no pueden haber 2 usuarios iguales, se implementa mediante indices en mongo, mongoose no llama 2 veces para chequear
    contraseña: {type: String, required: true}

    },
    {collection: 'usuarios'}
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model