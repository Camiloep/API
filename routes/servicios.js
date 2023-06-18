const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');
const usuariosServices = require("../services/serviciosServices")


const  uri = process.env.URI
// CREAR las rutas 
const router = express.Router()
const service = new usuariosServices()

//get leer  todos los datos de usuarios
router.get("/", async (req, res) => {
    const servicios =await service.find();
    if(servicios){
        res.status(200).send(servicios);
    }else{
        res.status(404).send("No se encontro la informacion");
    }
})

// obtener usuarios por id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const servicios = await client.db('psbarber').collection('servicios').findOne({_id: new ObjectId(id)});
        if (servicios) {
            res.status(200).send(servicios)
        }else{
            res.status(404).send("No se encontro la informacion")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})


//crear usuarios
router.post("/", async(req, res)=>{
   const body = req.body;
    const servicios = await service.insertMany(body);
    if(servicios){
        res.status(201).json({message: "se insertaron los servicios en la base de datos ", servicios})
    }else{
        res.status(400).send("no se creo el usuario ")
    }
        
        
    })

//actualizar usuario por id

router.patch("/:id", async(req, res) => {
    const id = req.params.id;
    const { nombre, contraseña  }= req.body;
    const servicios = await service.updateOne(id, nombre, contraseña);
        if(servicios){
            res.status(201).json({message: "se actualizaron los servicios en la base de datos ",servicios})
        }else{
            res.status(404).send("no se pudieron actualizar los clientes ")
        }
})


// Actualizar varios usuarios
router.patch("/", async(req, res) => {
    const body = req.body
    client = new MongoClient(uri)
    try {
        await client.connect()
        const servicios = await client.db("psbarber").collection("servicios").updateMany({apellido : "diaz"},{$set:{nombre: body.nombre}}) // usuarios que tengan apellido diaz se le cambia el nombre en el postman
        if(servicios){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",servicios})
        }else{
            res.status(404).send("no se pudieron actualizar los usuarios ")
        }
    } catch (error) {
        console.error(error);
    }finally{
        await client.close()
    }
})


// eliminar usuario 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const servicios = await service.deleteOne(id)
        if (servicios) {
            res.status(200).json({message: "se elimino el usuario correctamente ",servicios})
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router 