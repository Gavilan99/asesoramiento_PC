const express = require('express')
const path = require('path')
const bodyParser = require('body-parser') //para instalar: yarn add body-parser
const mongoose = require('mongoose') //yarn add mongoose o npm install mongoose
const User = require('./model/user')
const JWT_SECRET = 'fsajksljflfjwioefjojvnmlplpd'
const bcrypt = require('bcryptjs') //yarn add bcrypt js
const jwt = require('jsonwebtoken') // yarn addjsonwebtoken




mongoose.connect('mongodb://localhost:27017/app', {  //cambiar a la ruta que sea que lleve a la BD
    useNewUrlParser: true, //para evitar un par de warnings
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json()) //para que express decodifique el body


/*CAMBIO DE CONTRASEÑA*/
app.post('/api/change-password', async (req,res) => {
    const {token, nuevacontraseña: plainTextPassword } = req.body

    if(!plainTextPassword || typeof plainTextPassword !=='string'){
        return res.json({status: 'error', error: 'Contraseña inválida'})
    }

    if(plainTextPassword.length < 15){
        return res.json({status: 'error', error: 'La contraseña es demasiado corta. Ingrese una contraseña de al menos 15 caracteres de longitud'})
    }

    try{
    const user = jwt.verify (token, JWT_SECRET)
    const _id = user.id

    const contraseña = await bcrypt.hash(plainTextPassword, 10)
    await User.updateOne(
        { _id },
        {
            $set: { password }
        }
    )
    res.json({status: 'ok'})
    } catch(error){
        res.json({ status: 'error', error: ';))'})

    }

})

/*LOGIN*/
app.post('/api/login', async (req, res) => {


    const {usuario, contraseña} = req.body //Para chequear si el usuario y contraseña ingresados por el usuario son correctos

    /* Para bcrypt:*/
    const user = await User.findOne({usuario}).lean()

    if(!user){
        return res.json({ status: 'error', error: 'Usuario o contraseña inválido'})
    }

    if(await bcrypt.compare(contraseña, user.contraseña)){

        const token = jwt.sign({ id: user._id, usuario: user.usuario }, JWT_SECRET)                               
                
        return res.json({ status: 'ok', data: token })
    }
    /**/ 
    res.json({status:'error', error: 'Usuario o contraseña inválido'})
})


/*REGISTRO*/
app.post('/api/register', async (req,res) => {
    const { usuario, contraseña: plainTextPassword } = req.body

    if(!usuario || typeof usuario !=='string'){
        return res.json({status: 'error', error: 'Nombre de usuario inválido'})
    }

    if(!plainTextPassword || typeof plainTextPassword !=='string'){
        return res.json({status: 'error', error: 'Contraseña inválida'})
    }

    if(plainTextPassword.length < 15){
        return res.json({status: 'error', error: 'La contraseña es demasiado corta. Ingrese una contraseña de al menos 15 caracteres de longitud'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

//CREACION DEL USUARIO, USAMOS EL CATCH PARA QUE NO SE CREEN 2 USUARIOS IGUALES (clave duplicada de mongo)
    try {
        const response = await User.create({
            usuario,
            contraseña
        })
        console.log('Usuario creado con éxito: ', response)
    } catch (error) {
        if (error.code === 11000){ //Clave duplicada (clave: nombre de usuario)
            return res.json({status: 'error', error: 'El nombre de usuario ya está en uso'})
        }
        throw error //Deja ocurrir al error ya que probablemente se deba a una falla que nada tiene que ver con el uso
    }
    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Server up at 9999')

})