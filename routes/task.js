'use strict'

var express = require('express');
var TaskController = require('../controllers/task');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-tareas', md_auth.ensureAuth, TaskController.pruebasTareas);
api.post('/save-task', md_auth.ensureAuth, TaskController.saveTask);
api.get('/list-tasks', md_auth.ensureAuth, TaskController.getTasks);
api.delete('/task/:id', md_auth.ensureAuth, TaskController.deleteTask);

module.exports = api;
