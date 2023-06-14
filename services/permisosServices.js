require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")


const uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'


class permisosServices{
    constructor(){}



    //find()
    async find(){
        const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const permisos = await client.db("psbarber").collection("permisos").find({}).toArray();
            return permisos
        } catch (e) {
            console.error(e);
        }finally{
           await client.close()
        }
    }
        
   



    //Create 
    // insertMany
    async insertMany(body){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result =  await client.db("psbarber").collection("permisos").insertMany(body)
            return result
        } catch (error) {
            console.error(error);
        }finally{
            await client.close()
        }
    }

    //actualizar 
    async updateOne(id, nombre, id_rol){
        const client = new MongoClient(uri);        
        try {
            await client.connect();
            const roles = await client.db("psbarber").collection("permisos").updateOne({_id: new ObjectId(id)},{$set:{nombre: nombre, id_rol: id_rol}})
            return roles;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }    


    async deleteOne(id){
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const permisos = await client.db("psbarber").collection("permisos").deleteOne({_id: new ObjectId(id)});
            return  permisos
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


}
module.exports = permisosServices 