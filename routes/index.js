// rutas para conectar app.js con las routes y usarlos en postman
const routesUsuarios = require("./usuarios")// aqui van cada uno de los modulos
const routesRoles = require("./roles")
const routesPermisos = require("./permisos")
const proveedorRouter = require('./proveedorRouter');

const rutasApi = (app) =>{
    app.use("/usuarios", routesUsuarios)
    app.use("/roles",routesRoles)
    app.use("/permisos",routesPermisos)
    app.use('/proveedor', proveedorRouter);
    
}
module.exports = rutasApi