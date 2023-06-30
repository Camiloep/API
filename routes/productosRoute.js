const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const productosService = require('../services/productosServices')
 


const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'
// CREAR las rutas 

const router = express.Router();
const service = new productosService();


//2.1 find()
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    const productos = await service.find();
    if (productos) {
        res.render("./productos/productos.ejs", {productos});
    } else {
        res.status(404).send("No se encontro la información");//res.send("No se encontro la informacion");
    }
})

//1. CREATE
//1.1 insertOne()
router.post('/', async (req, res) => {
    const body = req.body
    const productos = await service.insertOne(body);
    if(productos){
        // res.status(201).json({message: "se insertaron los en la base de datos ", productos})
        res.redirect("/productos")
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
        const productos = await client.db('psbarber').collection('productos').findOne({_id: new ObjectId(id)});
        console.log(productos);
        if (productos) {
            res.render('./productos/productosEdit', {productos});
            
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
    const { id_Producto, nombre, precio, cantidad, estado, fk_Proveedor }= req.body;
    const productos = await service.updateOne(id,id_Producto, nombre, precio, cantidad, estado, fk_Proveedor);
        if(productos){
            // res.status(201).json({message: "se actualizaron los productos en la base de datos ",productos})
            res.redirect("/productos")
        }else{
            res.status(404).send("no se pudo actualizar el productos ")
        }
})

//4. DELETE
//4.1 deleteOne()
router.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    
    const productos = await service.deleteOne(id)
        if (productos) {
            // res.status(200).json({message: "se elimino el usuario correctamente ",productos})
            res.redirect("/productos")
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router;
