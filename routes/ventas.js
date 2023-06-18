const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');
const ventasServices = require("../services/ventasServices")


const  uri = process.env.URI
// CREAR las rutas 
const router = express.Router()
const service = new ventasServices()

//get leer  todos los datos de usuarios
router.get("/", async (req, res) => {
    const ventas =await service.find();
    if(ventas){
        res.status(200).send(ventas);
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
        const ventas = await client.db('psbarber').collection('ventas').findOne({_id: new ObjectId(id)});
        if (ventas) {
            res.status(200).send(ventas)
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
    const ventas = await service.insertMany(body);
    if(ventas){
        res.status(201).json({message: "se insertaron los en la base de datos ", ventas})
    }else{
        res.status(400).send("no se creo el usuario ")
    }
        
        
    })

//actualizar usuario por id

router.patch("/:id", async(req, res) => {
    const id = req.params.id;
    const { nombre, contraseña  }= req.body;
    const ventas = await service.updateOne(id, nombre, contraseña);
        if(ventas){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",ventas})
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
        const ventas = await client.db("psbarber").collection("usuarios").updateMany({apellido : "diaz"},{$set:{nombre: body.nombre}}) // usuarios que tengan apellido diaz se le cambia el nombre en el postman
        if(ventas){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",ventas})
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
    const ventas = await service.deleteOne(id)
        if (ventas) {
            res.status(200).json({message: "se elimino el usuario correctamente ",ventas})
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router 