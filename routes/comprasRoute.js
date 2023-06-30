const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const comprasService = require('../services/comprasServices')
 


const uri = 'mongodb+srv://admin:admin@cluster0.b7rbibw.mongodb.net/?retryWrites=true&w=majority'
// CREAR las rutas 

const router = express.Router();
const service = new comprasService();


//2.1 find()
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    const compras = await service.find();
    if (compras) {
        res.render("./compras/compras.ejs", {compras});
    } else {
        res.status(404).send("No se encontro la información");//res.send("No se encontro la informacion");
    }
})

//1. CREATE
//1.1 insertOne()
router.post('/', async (req, res) => {
    const body = req.body
    const compras = await service.insertOne(body);
    if(compras){
        // res.status(201).json({message: "se insertaron los en la base de datos ", compras})
        res.redirect("/compras")
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
        const compras = await client.db('psbarber').collection('compras').findOne({_id: new ObjectId(id)});
        console.log(compras);
        if (compras) {
            res.render('./compras/comprasEdit', {compras});
            
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
    const { id_Compra, fecha, total, estado }= req.body;
    const compras = await service.updateOne(id, id_Compra, fecha, total, estado);
        if(compras){
            // res.status(201).json({message: "se actualizaron los compras en la base de datos ",compras})
            res.redirect("/compras")
        }else{
            res.status(404).send("no se pudo actualizar el compras ")
        }
})

//4. DELETE
//4.1 deleteOne()
router.get('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    
    const compras = await service.deleteOne(id)
        if (compras) {
            // res.status(200).json({message: "se elimino el usuario correctamente ",compras})
            res.redirect("/compras")
        }else{
            res.status(400).send(" no se elimino el usuario correctamente")
        }
   
})

module.exports = router;
