// require('dotenv').config();
const express = require("express")
const {MongoClient, ObjectId} = require("mongodb")

const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'

class productosService {

    constructor() { }


    //2. READ
    //find()
    async find(limit, offset) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const productos = await client.db("psbarber").collection("productos").find({}).toArray();
            return productos;
        } catch (e) {
            console.log(e);
        } finally {
            await client.close();
        }
    }


    //1. CREATE
    // Insert
    async insertOne(body) {
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db('psbarber').collection('productos').insertOne(body);
            return result;
        } catch(error){
            console.error(error)
        } finally {
            await client.close();
        }
    }

    //3. UPDATE
    //updateOne()
    async updateOne(id, id_Producto, nombre,precio,cantidad,estado,fk_Proveedor) {
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const productos = await client.db('psbarber').collection('productos').updateOne({ _id: new ObjectId(id) }, { $set: { id_Producto:id_Producto, nombre:nombre, precio:precio, cantidad:cantidad, estado:estado,fk_Proveedor:fk_Proveedor } })
            return productos
        } catch(e){
            console.log(e);
        } finally {
            await client.close()
        }
    }


    //4. DELETE
    //deleteOne()
    async deleteOne(id) {
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const productos = await client.db('psbarber').collection('productos').deleteOne({ _id: new ObjectId(id) })
            return productos
        } catch(e){
            console.log(e);
        } finally {
            await client.close()
        }
    }


}

module.exports = productosService;