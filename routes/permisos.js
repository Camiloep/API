const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');
const permisosServices = require("../services/permisosServices")

const  uri = 'mongodb+srv://admin:admin@cluster0.49jaesh.mongodb.net/?retryWrites=true&w=majority'
// CREAR las rutas 
const router = express.Router()
const service = new permisosServices()


//get leer  todos los datos de roles
router.get("/", async (req, res) => {
    const permisos = await service.find({});
        if(permisos){
            res.status(200).send(permisos) // la solicitud a tenido exito 
        }else{ 
            res.status(404).send("no se encontro la coleccion")
        }
})

// obtener roles por id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const permisos = await client.db('psbarber').collection('permisos').findOne({_id: new ObjectId(id)});
        if (permisos) {
            res.status(200).send(permisos)
        }else{
            res.status(400).send("No se encontro la informacion")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})


//crear usuarios
router.post("/", async(req, res)=>{
    const body = req.body
    const permisos = await service.insertMany(body);
        if(permisos){
            res.status(201).json({message: "se insertaron los roles en la base de datos ", permisos})
        }else {
            res.status(400).send("no se creo el rol correctamente")
        }
})

//actualizar roles por id

router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const { nombre, id_rol  }= req.body;
    const permisos = await service.updateOne(id, nombre, id_rol);
        if(permisos){
            res.status(201).json({message: "se actualizo el rol correctamente en la base de datos ",permisos})
        }else{
            res.status(404).send("no se pudo actualizar el permisp")
        }
    
})


// Actualizar varios uroles
router.patch("/", async(req, res) => {
    const body = req.body
    client = new MongoClient(uri)
    try {
        await client.connect()
        const permisos = await client.db("psbarber").collection("roles").updateMany({nombre : "andres"},{$set:{nombre: body.nombre}}) // todos los usuarios que tengan el nombre andress seran modificados
        if(permisos){
            res.status(201).json({message: "se actualizaron los permisos en la base de datos ",permisos})
        }else{
            res.status(404).send("no se pudieron actualizar los permisos ")
        }
    } catch (error) {
        console.error(error);
    }finally{
        await client.close()
    }
})


// eliminar roles 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const permisos = await service.deleteOne(id)
        if (permisos) {
            res.status(200).json({message: "se elimino el permiso correctamente ",permisos})
        }else{
            res.status(400).send(" no se elimino el permiso correctamente")
        }
}) 

module.exports = router 