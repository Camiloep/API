require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")


const uri = process.env.URI


class serviciosServices{
    constructor(){}



    //find()
    async find(){
        const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const servicios = await client.db("psbarber").collection("servicios").find({}).limit(10).toArray();
            return servicios
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
            const result =  await client.db("psbarber").collection("servicios").insertMany(body)
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
            const roles = await client.db("psbarber").collection("servicios").updateOne({_id: new ObjectId(id)},{$set:{nombre: nombre, id_rol: id_rol}})
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
            const permisos = await client.db("psbarber").collection("clientes").deleteOne({_id: new ObjectId(id)});
            return  permisos
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


}
module.exports = serviciosServices 