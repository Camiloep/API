// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.URI

class proveedorService{

    constructor(){}

    //1. CREATE
    // insertMany()
    async insertMany(body){
        const client = new MongoClient(uri)
        try{
            await client.connect()
            const result = await client.db('psbarber').collection('provedor').insertMany([body]);
            return result;
        }finally{
            await client.close();
        }
    }

    //2. READ
    //find()
    async find(){
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const proveedor = await client.db("psbarber").collection("proveedor").find({}).toArray();
            return proveedor;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
    

    //findOne()
    async findOne(id){
        const client = new MongoClient(uri)
        try{
            await client.connect()
            const proveedor = await client.db("psbarber").collection("proveedor").findOne({_id: new ObjectId(id)})
            return proveedor;
        }finally{
            await client.close();
        }
    }

    //3. UPDATE
    //updateOne()
    async updateOne(id, name, email){
        const client = new MongoClient(uri)
        try{
            await client.connect()
            await client.db('psbarber').collection('proveedor').updateOne({_id: new ObjectId(id)},{$set:{name:name, email:email}})
        }finally{
            await client.close()
        }    
    }

    //4. DELETE
    //deleteOne()
    async deleteOne(id){
        const client = new MongoClient(uri)
        try{
            await client.connect()
            await client.db('psbarber').collection('proveedor').deleteOne({_id: new ObjectId(id)})
        }finally{
            await client.close()
        }
    }
    

}

module.exports = proveedorService;