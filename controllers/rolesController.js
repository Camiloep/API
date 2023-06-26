const { MongoClient} = require('mongodb');
const  uri = "mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority"
const controller = {}
controller.ListarRoles = async(req,res)=>{
    const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const roles = await client.db("psbarber").collection("roles").find({}).toArray()
            if(roles){
                res.render('./roles/roles', {roles});
            }else{
                res.status(404).send("No se encontro la informacion");
            }
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
controller.editarRoles = async (req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const roles = await client.db('psbarber').collection('roles').findbyId({_id: new ObjectId(id)});
            console.log(roles);
            if (roles) {
                res.render('./roles/rolesEdit', {roles});
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