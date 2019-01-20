'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    name: String,
    user: { type: Schema.ObjectId, ref:'User' }
});

module.exports = mongoose.model('Task', TaskSchema);
