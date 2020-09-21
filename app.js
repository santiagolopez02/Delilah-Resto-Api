const express = require("express");
const server = express();
const database = require("./configuracion/database");
const body_parser = require("body-parser");

//Conexion a las rutas
const usuario = require("./rutas/usuarioRuta");
const producto = require("./rutas/productoRuta");
const pedido = require("./rutas/ordenRuta");

server.use(body_parser.json());

//Endpoint para cada entidad
server.use("/pedido", pedido);
server.use("/producto", producto);
server.use("/usuario", usuario);


database.sequelize.authenticate()
.then(() => {
    server.listen(3000, () => {
        console.log('conecto al server y base de dato');
    });
  })
  .catch(err => {
    console.log('no conecto', err);
  });


  