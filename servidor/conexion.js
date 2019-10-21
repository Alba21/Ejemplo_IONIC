var mysql = require('mysql');
// cargar el modulo de express
const express = require("express");
// y crea una instancia de la aplicación express
const app = express();
// cargar body parser para leer el body de los request
const bodyParser = require("body-parser");

// recibir datos en formato json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Practica3"
  });


app.get('/conversaciones/:id',(request, response)=>{
    var idUsuario = request.params.id;
    var miQuery = 
    "SELECT contacto.nombre from mensaje, usuario as contacto " +
    "where (mensaje.id_destinatario = contacto.id_usuario and mensaje.id_remitente = "+idUsuario +") or "+
    "(mensaje.id_destinatario = "+idUsuario +" and mensaje.id_remitente = contacto.id_usuario) "+
    "GROUP BY contacto.nombre;";
    conexion.query(miQuery, function(err, result){
        if(err){
            throw err;
        }else{
            console.log(result);
            response.send(result);
        }
    });
})

app.get('/conversacion/:idRemitente/:idDestinatario',(request,response) =>{
    var remitente = request.params.idRemitente;
    var destinatario = request.params.idDestinatario;

    var miQuery = 
    "SELECT mensaje.contenido, rem.nombre as remitente, dest.nombre as destinatario, mensaje.fecha_envio "+
    "from mensaje, usuario as rem, usuario as dest "+
    "where rem.id_usuario = id_remitente and dest.id_usuario = id_destinatario  "+
    "and ((mensaje.id_remitente = "+ remitente +" and mensaje.id_destinatario = "+ destinatario +") or "+
    "((mensaje.id_remitente = "+ destinatario+ " and mensaje.id_destinatario = "+ remitente+"))) ORDER BY fecha_envio asc;"
        conexion.query(miQuery, function(err, result){
            if(err){
                throw err;
            }else{
                console.log(result)
                response.send(result)
            }
        })
})



app.listen(3000, () =>{
    console.log("Backend inicializado");
});