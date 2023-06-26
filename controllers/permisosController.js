const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority"
const controller = {}
controller.Listarpermisos = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const permisos = await client.db("psbarber").collection("permisos").find({}).toArray()
            if(permisos){
                res.render('./permisos/permisos', {permisos});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarpermios = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const roles = await client.db('psbarber').collection('permisos').findbyId({_id: new ObjectId(id)});
            console.log(permisos);
            if (roles) {
                res.render('./permios/permiosEdit', {roles});
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