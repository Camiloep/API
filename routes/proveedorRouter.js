const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const proveedorService = require('../services/proveedorService')
 


require('dotenv').config();

const uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'

const router = express.Router();
const service = new proveedorService();

/**
 * proveedor
 */

//2. READ
//2.1 find()
router.get('/', async (req, res) => {
    const proveedor = await service.find({});
    if (proveedor) {
        res.send(proveedor);
    } else {
        response.error(req, res, "Not found", 404);//res.send("No se encontro la informacion");
    }
})

//2.2 findOne()
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const proveedor = await service.findOne(id);
    if (proveedor) {
        res.status(200).send(proveedor);
    } else {
        response.error(req, res, "Not found", 404);//res.send('Not found');
    }
})

//1. CREATE
//1.1 insertOne()
router.post('/', async (req, res) => {
    const body = req.body
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const result = await client.db('psbarber').collection('proveedor').insertOne(body);
        // res.status(201).json({ message: 'created', data: body, result })
        if (result) {
            res.status(201).json({message: "se insertaron los roles en la base de datos ", result})//res.status(200).send(proveedor);
        } else {
            res.status(400).send("no se creo el rol correctamente")
        }
    } finally {
        await client.close();
    }
})

//1.2 insertMany()
router.post('/add', async (req, res) => { // se le quito provedor/add
    const proveedor = req.body
    const result = await service.insertMany(proveedor);
    if(result){
        res.status(201).json({message: "se insertaron los proveedor en la base de datos ", result})
    }else {
        res.status(400).send("no se creo el rol correctamente")
    }
})

//3. UPDATE
//3.1 updateOne
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const client = new MongoClient(uri)
    try {
        await client.connect()
        await client.db('psbarber').collection('proveedor').updateOne({ _id: new ObjectId(id) }, { $set: { title: body.title, year: body.year } })
        //res.status(200).send({ message: 'updated', data: body, id });
        if (proveedor) {
            response.sucess(req, res, "recurso actualizado", 200);//res.status(200).send(proveedor);
        } else {
            response.error(req, res, "Bad Request", 400);//res.send('Not found');
        }
    } finally {
        await client.close()
    }
});

//4. DELETE
//4.1 deleteOne()
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const client = new MongoClient(uri)
    try {
        await client.connect()
        result = await client.db('psbarber').collection('proveedor').deleteOne({ _id: new ObjectId(id) })
        // res.status(200).json({ message: 'deleted', id })
        if (result) {
            response.sucess(req, res, "recurso eliminado", 200);//res.status(200).send(proveedor);
        } else {
            response.error(req, res, "Bad Request", 400);//res.send('Not found');
        }
    } finally {
        await client.close()
    }
});

module.exports = router;