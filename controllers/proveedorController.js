const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority"
const controller = {}

controller.ListarProveedor = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const proveedor = await client.db("psbarber").collection("proveedor").find({}).toArray()
            if(proveedor){
                res.render('./proveedor/index.ejs', {proveedor});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarProveedor = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const proveedor = await client.db('psbarber').collection('proveedor').findbyId({_id: new ObjectId(id)});
            console.log(proveedor);
            if (proveedor) {
                res.render('./proveedor/proveedorEdit', {proveedor});
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