'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var task_routes = require('./routes/task');

//cargar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors

//rutas
app.use('/api', user_routes);
app.use('/api', task_routes);

//Exportar
module.exports = app;
