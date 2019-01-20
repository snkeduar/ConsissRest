'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'snkeduar';

exports.createToken = function(user){
	var payload = {
		id: user._id,
		name: user.name,
		email: user.email,
		iat: moment().unix(),
		exp: moment().add(1,'days').unix
	};
	return jwt.encode(payload, secret);
};
