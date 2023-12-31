// require('dotenv').config();
const express = require("express")
const {MongoClient, ObjectId} = require("mongodb")

const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'

class proveedorService {

    constructor() { }


    //2. READ
    //find()
    async find(limit, offset) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const proveedor = await client.db("psbarber").collection("proveedor").find({}).toArray();
            return proveedor;
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
            const result = await client.db('psbarber').collection('proveedor').insertOne(body);
            return result;
        } catch(error){
            console.error(error)
        } finally {
            await client.close();
        }
    }

    //3. UPDATE
    //updateOne()
    async updateOne(id, id_Proveedor, nit, nombre, telefono, email, direccion,estado,nombre_PE, telefono_PE) {
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const proveedor = await client.db('psbarber').collection('proveedor').updateOne({ _id: new ObjectId(id) }, { $set: { id_Proveedor: id_Proveedor, nit:nit, nombre:nombre, telefono:telefono, email:email, direccion:direccion,estado:estado, nombre_PE:nombre_PE, telefono_PE:telefono_PE } })
            return proveedor
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
            const proveedor = await client.db('psbarber').collection('proveedor').deleteOne({ _id: new ObjectId(id) })
            return proveedor
        } catch(e){
            console.log(e);
        } finally {
            await client.close()
        }
    }


}

module.exports = proveedorService;