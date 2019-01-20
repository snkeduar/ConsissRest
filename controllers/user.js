'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req, res){
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if(	params.name && params.email && params.password){
		user.name = params.name;
		user.email = params.email;

		//Controlar usuarios duplicados
		User.find( { $or: [
				{ email: user.email.toLowerCase()},
				{ name: user.name.toLowerCase()}
			]}).exec((err, users)=>{
				if(err) return res.status(500).send({message: "error en la peticion de usuario"});

				if(users && users.length >=1){
					return res.status(200).send({ message: 'El usuario que intentas registrar ya existe!!'});
				}else{
					// Cifrar contraseña y guardar datos
					bcrypt.hash(params.password, null, null, (err, hash)=>{
						user.password = hash;
						user.save((err, userStored)=>{
							if(err) return res.status(500).send({ message: "Error al guardar el usuario"});
							if(userStored){
								userStored.password = undefined;
								res.status(200).send({ user: userStored });
							}else{
								res.status(404).send({ message: 'no se ha registrado el usuario'});
							}
						});
					});
				}
			})


	}else{
		res.status(200).send({
			message: 'Envia todos los campos necesarios!!'
		});
	}
}

function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({ email: email}, (err, user)=>{
		if(err) return res.status(500).send({ message: 'Error en la petición'});

		if(user){
			bcrypt.compare(password, user.password, (err, check)=>{
				if(check){					
					// devolver datos de usuario
					user.password = undefined;
					return res.status(200).send({user, token: jwt.createToken(user)});

				}else{
					return res.status(404).send({ message: 'El usuario no se ha podido identificar'});
				}
			});
		}else{
			return res.status(404).send({ message: 'El usuario no se ha podido identificar!!'});
		}
	});
}

// Conseguir datos de un usuario
function getUser(req, res){
	var userId = req.params.id;

	User.findById(userId, (err,user)=>{
		if(err) return res.status(500).send({ message: "error en la peticion"});

		if(!user) return res.status(404).send({ message: "El usuario no existe"});

		return res.status(200).send({ user });
	});
}

// Devolver un listado de usuarios paginados
function getUsers(req, res){
	var identity_user_id = req.user.sub;

	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}

	var itemsPerPage = 5;

	User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total)=>{
		if(err) return res.status(500).send({ message: "error en la peticion"});

		if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

		return res.status(200).send({
			users,
			total,
			pages: Math.ceil(total/itemsPerPage)

		});
	});
}

// Edición de datos de usuario
function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;
	// borrar propiedad password
	delete update.password;

	if(userId != req.user.sub){
		return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario'});
	}

	User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
		if(err) return res.status(500).send({ message: 'Error en la petición'});

		if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario'});

		return res.status(200).send({user: userUpdated });
	});

}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	getUser,
	getUsers,
	updateUser
}
