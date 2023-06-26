// rutas para conectar app.js con las routes y usarlos en postman
const express = require('express');
const routesUsuarios = require("./usuarios")// aqui van cada uno de los modulos
const routesRoles = require("./roles")
const routesPermisos = require("./permisos")
const proveedorRouter = require('./proveedorRouter');
const clientesRouter = require('./clientes');
const serviciosRouter = require('./servicios');
const ventasRouter = require('./ventas');
const inicioController = require("../controllers/inicioController")


// const inicio = require('./inicio');


const rutasApi = (app) =>{
    
    app.get("/", inicioController.inicio)


    app.use("/usuarios", routesUsuarios)
    app.use("/roles",routesRoles)
    app.use("/permisos",routesPermisos)
    app.use('/proveedor', proveedorRouter);
    app.use('/clientes', clientesRouter);
    app.use('/servicios', serviciosRouter);
    app.use('/ventas', ventasRouter);
    
}
module.exports = rutasApi