'use strict';

var mongoose = require('mongoose'),
  Access = require('./access.model'),
  Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: String,
  access: [Access.schema]
});

module.exports = mongoose.model('Model', ModelSchema);
