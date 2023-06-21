const express = require("express")
const { MongoClient, ObjectId} = require('mongodb');
const usuariosServices = require("../services/usuariosService")

const consumir = {}
const  uri = process.env.URI
// CREAR las rutas 
const router = express.Router()
const service = new usuariosServices()

//get leer  todos los datos de usuarios
router.get("/", async (req, res) => {
    const { limit, offset } = req.query;
    const usuarios = await service.find();
    if(usuarios){
        res.render("./usuarios/index.ejs", {usuarios})
        
    }else{
        res.status(404).send("No se encontro la informacion");
    }
})

// obtener usuarios por id 
// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         const usuarios = await client.db('psbarber').collection('usuarios').findOne({_id: new ObjectId(id)});
//         if (usuarios) {
//             res.status(200).send(usuarios)
//         }else{
//             res.status(404).send("No se encontro la informacion")
//         }
//     } catch (e) {
//         console.error(e)
//     }finally {
//         await client.close();
//     }
// })


//crear usuarios
router.post("/", async(req, res)=>{
   const body = req.body;
    const usuarios = await service.insertOne(body);
    if(usuarios){
        res.status(201).json({message: "se insertaron los en la base de datos ", usuarios})
    }else{
        res.status(400).send("no se creo el usuario ")
    }
        
        
    })


router.get("/edit/:id", async (req,res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri)
    try {
        await client.connect();
        const usuarios = await client.db('psbarber').collection('usuarios').findOne({_id: new ObjectId(id)});
        console.log(usuarios);
        if (usuarios) {
            res.render('./usuarios/usuariosEdit', {usuarios});
            
        }else{
            res.status(404).send("No se encontro la informacion")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})

//actualizar usuario por id

router.post("/update/:id", async(req, res) => {
    const id = req.params.id;
    const { nombre,apellido, email,contraseña,estado  }= req.body;
    const usuarios = await service.updateOne(id, nombre, apellido, email,contraseña,estado);
        if(usuarios){
            res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",usuarios})
        }else{
            res.status(404).send("no se pudieron actualizar los clientes ")
        }
})



// Actualizar varios usuarios
// router.patch("/", async(req, res) => {
//     const body = req.body
//     client = new MongoClient(uri)
//     try {
//         await client.connect()
//         const usuario = await client.db("psbarber").collection("usuarios").updateMany({apellido : "diaz"},{$set:{nombre: body.nombre}}) // usuarios que tengan apellido diaz se le cambia el nombre en el postman
//         if(usuario){
//             res.status(201).json({message: "se actualizaron los usuarios en la base de datos ",usuario})
//         }else{
//             res.status(404).send("no se pudieron actualizar los usuarios ")
//         }
//     } catch (error) {
//         console.error(error);
//     }finally{
//         await client.close()
//     }
// })


// eliminar usuario  //navegador solo maneja 2 verbos
router.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    
    const usuarios = await service.deleteOne(id)
        if (usuarios) {
            res.status(200).json({message: "se elimino el usuario correctamente ",usuarios})
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router 