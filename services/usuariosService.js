require("dotenv").config()
const express = require("express")
const {MongoClient, ObjectId} = require("mongodb")


const uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'


class usuariosServices{
    constructor(){}



    //find()
    async find(){
        const client = new MongoClient(uri) // usamos el mongoclient y le pasamos la uri, para acceder a la base de datos 
        try {
            await client.connect() 
            const usuarios = await client.db("psbarber").collection("usuarios").find({}).toArray();
            return usuarios
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
            const result =  await client.db("psbarber").collection("usuarios").insertMany(body)
            return result
        } catch (error) {
            console.error(error);
        }finally{
            await client.close()
        }
    }

    //actualizar 
    async updateOne(id, nombre, contraseña){
        const client = new MongoClient(uri);        
        try {
            await client.connect();
            const usuarios = await client.db("psbarber").collection("usuarios").updateOne({_id: new ObjectId(id)},{$set:{nombre: nombre, contraseña: contraseña}})
            return usuarios;
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
            const usuarios = await client.db("psbarber").collection("usuarios").deleteOne({_id: new ObjectId(id)});
            return  usuarios
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }


}
module.exports = usuariosServices