const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const proveedorService = require('../services/proveedorService')
 


const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'
// CREAR las rutas 

const router = express.Router();
const service = new proveedorService();


//2.1 find()
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    const proveedor = await service.find();
    if (proveedor) {
        res.render("./proveedor/proveedor.ejs", {proveedor});
    } else {
        res.status(404).send("No se encontro la información");//res.send("No se encontro la informacion");
    }
})

//1. CREATE
//1.1 insertOne()
router.post('/', async (req, res) => {
    const body = req.body
    const proveedor = await service.insertOne(body);
    if(proveedor){
        // res.status(201).json({message: "se insertaron los en la base de datos ", proveedor})
        res.redirect("/proveedor")
    }else{
        res.status(400).send("No se registro el provedor")
    }
    })



//3. UPDATE
router.get("/edit/:id", async (req,res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri)
    try {
        await client.connect();
        const proveedor = await client.db('psbarber').collection('proveedor').findOne({_id: new ObjectId(id)});
        console.log(proveedor);
        if (proveedor) {
            res.render('./proveedor/proveedorEdit', {proveedor});
            
        }else{
            res.status(404).send("No se encontro la informacion")
        }
    } catch (e) {
        console.error(e)
    }finally {
        await client.close();
    }
})

//3.1 updateOne
router.post("/update/:id", async(req, res) => {
    const id = req.params.id;
    const { id_Proveedor,nit, nombre,telefono,email, direccion, estado, nombre_PE, telefono_PE }= req.body;
    const proveedor = await service.updateOne(id,id_Proveedor,nit, nombre,telefono,email, direccion, estado, nombre_PE, telefono_PE);
        if(proveedor){
            // res.status(201).json({message: "se actualizaron los proveedor en la base de datos ",proveedor})
            res.redirect("/proveedor")
        }else{
            res.status(404).send("no se pudo actualizar el proveedor ")
        }
})

//4. DELETE
//4.1 deleteOne()
router.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    
    const proveedor = await service.deleteOne(id)
        if (proveedor) {
            // res.status(200).json({message: "se elimino el usuario correctamente ",proveedor})
            res.redirect("/proveedor")
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router;
