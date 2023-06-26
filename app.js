// requerimos express
const express = require("express")
const app = express()
const morgan = require("morgan")

const path = require("path")
//bodyparser para parsear los cuerpos
const bodyparser = require("body-parser")

// traigo las rutas del index 
const rutasApi = require("./routes")

app.set("port", process.env.PORT || 3000)

//ejs 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public"))) 



//Middleware
app.use(bodyparser.json())// para poder trabajar con json
app.use(bodyparser.urlencoded({extended :true}))// para poder trabajar con formularios codificados en url
app.use(express.json())
app.use(morgan("dev"))


rutasApi(app) 


// app.get ("/", (req, res)=>{
//     res.render("index")
// })

app.use(express.static(path.join(__dirname, "public")))

app.listen(app.get("port"),()=> {
    console.log(`se esta escuchando en el puerto ${app.get("port")}`);
    
})

