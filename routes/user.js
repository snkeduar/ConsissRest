'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/login', UserController.loginUser);
api.post('/register', UserController.saveUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;
