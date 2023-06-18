const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');

const rolesServices = require("../services/rolesServices")

// CREAR las rutas 
const router = express.Router()
const service = new rolesServices()
//get leer  todos los datos de roles
router.get("/", async (req, res) => {
    
    const roles = await service.find({});
        if(roles){
            res.status(200).send(roles) // la solicitud a tenido exito 
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
        const roles = await client.db('psbarber').collection('roles').findOne({_id: new ObjectId(id)});
        if (roles) {
            res.status(200).send(roles)
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
    const roles = await service.insertMany(body);
        if(roles){
            res.status(201).json({message: "se insertaron los roles en la base de datos ", roles})
        }else {
            res.status(400).send("no se creo el rol correctamente")
        }
})

//actualizar roles por id

router.patch("/:id", async(req, res) => {
    const id = req.params.id
    const { nombre, id_rol  }= req.body;
    const roles = await service.updateOne(id, nombre, id_rol);
        if(roles){
            res.status(201).json({message: "se actualizo el rol correctamente en la base de datos ",roles})
        }else{
            res.status(404).send("no se pudo actualizar el rol")
        }
    
})


// Actualizar varios uroles
router.patch("/", async(req, res) => {
    const body = req.body
    client = new MongoClient(uri)
    try {
        await client.connect()
        const roles = await client.db("psbarber").collection("roles").updateMany({nombre : "andres"},{$set:{nombre: body.nombre}}) // todos los usuarios que tengan el nombre andress seran modificados
        if(roles){
            res.status(201).json({message: "se actualizaron los roles en la base de datos ",roles})
        }else{
            res.status(404).send("no se pudieron actualizar los roles ")
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
    const roles = await service.deleteOne(id)
        if (roles) {
            res.status(200).json({message: "se elimino el usuario correctamente ",roles})
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
}) 

module.exports = router 