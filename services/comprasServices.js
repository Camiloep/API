// require('dotenv').config();
const express = require("express")
const {MongoClient, ObjectId} = require("mongodb")

const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'

class comprasService {

    constructor() { }


    //2. READ
    //find()
    async find(limit, offset) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const compras = await client.db("psbarber").collection("compras").find({}).toArray();
            return compras;
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
            const result = await client.db('psbarber').collection('compras').insertOne(body);
            return result;
        } catch(error){
            console.error(error)
        } finally {
            await client.close();
        }
    }

    //3. UPDATE
    //updateOne()
    async updateOne(id, id_Compra, fecha, total, estado) {
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const compras = await client.db('psbarber').collection('compras').updateOne({ _id: new ObjectId(id) }, { $set: { id_Compra:id_Compra, fecha:fecha, total:total, estado:estado } })
            return compras
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
            const compras = await client.db('psbarber').collection('compras').deleteOne({ _id: new ObjectId(id) })
            return compras
        } catch(e){
            console.log(e);
        } finally {
            await client.close()
        }
    }


}

module.exports = comprasService;