const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority"
const controller = {}
controller.ListarUs = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const usuarios = await client.db("psbarber").collection("usuarios").find({}).toArray()
            if(usuarios){
                res.render('./usuarios/index.ejs', {usuarios});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarUs = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const usuarios = await client.db('psbarber').collection('usuarios').findbyId({_id: new ObjectId(id)});
            console.log(usuarios);
            if (usuarios) {
                res.render('./usuarios/usuariosEdit', {usuarios});
            }else{
                res.status(404).send("No se encontro la informacion")
            }
        } catch (e) {
            console.error(e)
        }finally {
            await client.close();
        }
    }

module.exports = controller