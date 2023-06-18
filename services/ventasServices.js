require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")


const uri = process.env.URI


class ventasServices{
    constructor(){}



    //find()
    async find(){
        const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const ventas = await client.db("psbarber").collection("ventas").find({}).toArray();
            return ventas
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
            const result =  await client.db("psbarber").collection("ventas").insertMany(body)
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
            const ventas = await client.db("psbarber").collection("ventas").updateOne({_id: new ObjectId(id)},{$set:{nombre: nombre, id_rol: id_rol}})
            return ventas;
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
            const ventas = await client.db("psbarber").collection("ventas").deleteOne({_id: new ObjectId(id)});
            return  ventas
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


}
module.exports = ventasServices 