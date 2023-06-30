const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority"
const controller = {}

controller.Listarcompras = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const compras = await client.db("psbarber").collection("compras").find({}).toArray()
            if(compras){
                res.render('./compras/compras', {compras});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarcompras = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const compras = await client.db('psbarber').collection('compras').findbyId({_id: new ObjectId(id)});
            console.log(compras);
            if (compras) {
                res.render('./compras/comprasEdit', {compras});
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