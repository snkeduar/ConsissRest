'use strict'


var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//Conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/consiss', { useNewUrlParser: true })
.then(()=>{
	console.log('la conexión a la base de datos consiss se realizo correctamente');
	//Crear servidor
	app.listen(port, ()=>{
		console.log("Servidor corriendo en http://localhost:3800");
	});
})
.catch(err => { console.log(err)});
