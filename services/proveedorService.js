// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'

class proveedorService{

    constructor(){}

    //1. CREATE
    // insertMany()
    async insertMany(proveedor){
        const client = new MongoClient(uri)
        try{
            await client.connect()
            const result = await client.db('psbarber').collection('proveedos').insertMany([proveedor]);
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
            const proveedor = await client.db("psbarber").collection("proveedos").find({}).toArray();
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
            const proveedor = await client.db("psbarber").collection("proveedores").findOne({_id: new ObjectId(id)})
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
    
    /**
     * 
     * etc.
     * etc.
     *  |
     *  |
     * \|/
     * 
     */
}

module.exports = proveedorService;