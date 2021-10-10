import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ComputadorasDAO from "./dao/computadorasDAO.js"
import ComentariosDAO from "./dao/comentariosDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
      
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await ComputadorasDAO.injectDB(client)
    await ComentariosDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})