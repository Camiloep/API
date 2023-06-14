// requerimos express
const express = require("express")
const app = express()
const morgan = require("morgan")
//bodyparser para parsear los cuerpos
const bodyparser = require("body-parser")

// traigo las rutas del index 
const rutasApi = require("../routes")

app.set("port", process.env.PORT || 3000)

//Middleware
app.use(bodyparser.json())// para poder trabajar con json
app.use(bodyparser.urlencoded({extended :true}))// para poder trabajar con formularios codificados en url
app.use(express.json())
app.use(morgan("dev"))


rutasApi(app) // app se le pasa como argumento a la funcion del index para que las rutas funcionen
//ruta principal
app.get ("/", (req, res)=>{
    res.status(200).send("<h3>api Usuarios </h3>")
})


//poner a escuchar el puerto
app.listen(app.get("port"),()=> {
    console.log(`se esta escuchando en el puerto ${app.get("port")}`);
    //para el ensayo
})

