'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Model', ModelSchema);