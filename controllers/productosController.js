const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority"
const controller = {}

controller.Listarproductos = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const productos = await client.db("psbarber").collection("productos").find({}).toArray()
            if(productos){
                res.render('./productos/productos', {productos});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarproductos = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const productos = await client.db('psbarber').collection('productos').findbyId({_id: new ObjectId(id)});
            console.log(productos);
            if (productos) {
                res.render('./productos/productosEdit', {productos});
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