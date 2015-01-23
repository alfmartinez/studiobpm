/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Model = require('../api/model/model.model');

User.find({}).remove(function() {
	User.create({
		provider: 'local',
		name: 'Test User',
		email: 'test@test.com',
		password: 'test'
	}, {
		provider: 'local',
		name: 'Test User with Models',
		email: 'testWithModels@test.com',
		password: 'test'
	}, {
		provider: 'local',
		role: 'admin',
		name: 'Admin',
		email: 'admin@admin.com',
		password: 'admin'
	}, function() {
		console.log('finished populating users');
	});
});

Model.find({}).remove(function() {
	Model.create({
		name: 'Model 1'
	}, {
		name: 'Model 2'
	}, function() {
		console.log('finished populating models');
	})
});
