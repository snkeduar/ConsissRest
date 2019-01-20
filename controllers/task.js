'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var Task = require('../models/task');
var jwt = require('../services/jwt');

function pruebasTareas(req, res){
    res.status(200).send({
        message: 'Acción de pruebas rutas de task en el servidor de NodeJS'
    });
}

function saveTask(req, res){
    var params = req.body;
    var task = new Task();

    if( params.name ){
        task.name = params.name;
        task.user = req.user.id;
        // controlar tareas duplicadas
        Task.find({ name: task.name }).exec((err, tasks)=>{
            if(err) return res.status(500).send({ message: 'Error en la petición de tareas'});

            if(tasks && tasks.length >=1){
                return res.status(200).send({ message: 'La tarea que intentas registrar ya existe!!'});
            }else{
                task.save((err, taskStored)=>{
                    if(err) return res.status(500).send({ message: "Error al guardar la tarea"});
                    if(taskStored){
                        res.status(200).send({ task: taskStored});
                    }else{
                        res.status(404).send({ message: 'no se ha registrado la tarea'});
                    }
                });
            }
        });
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
}

// Devolver listado de tareas
function getTasks(req, res){
    var userId = req.user.id;

    Task.find({ user: userId}).populate('user').exec((err, tasks)=>{
        if(err) return res.status(500).send({message: 'Error en el servidorr'});

        if(!tasks) return res.status(404).send({ message: 'No existen tareas'});

        return res.status(200).send({ tasks });
    });

}

//Eliminar tarea
function deleteTask(req, res){
    var taskId = req.params.id;

    Task.find({ '_id': taskId }).remove(err =>{
        if(err) return res.status(500).send({ message: 'Error al eliminar la tarea'});

        return res.status(200).send({ message: 'La tarea se elimino correctamente!!'});
    });
}

module.exports = {
    pruebasTareas,
    saveTask,
    getTasks,
    deleteTask
}
