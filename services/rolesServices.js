require("dotenv").config()
const express = require("express")
const {MongoClient, ObjectId} = require("mongodb")


const uri = process.env.URI


class rolesServices{
    constructor(){}



    //find()
    async find(){
        const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const roles = await client.db("psbarber").collection("roles").find({}).toArray();
            return roles
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
            const result =  await client.db("psbarber").collection("roles").insertMany(body)
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
            const roles = await client.db("psbarber").collection("roles").updateOne({_id: new ObjectId(id)},{$set:{nombre: nombre, id_rol: id_rol}})
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
            const roles = await client.db("psbarber").collection("roles").deleteOne({_id: new ObjectId(id)});
            return  roles
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


}
module.exports = rolesServices