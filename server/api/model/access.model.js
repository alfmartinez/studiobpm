'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AccessSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  role: String
});

module.exports = mongoose.model('Access', AccessSchema);
