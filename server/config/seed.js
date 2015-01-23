/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Model = require('../api/model/model.model');
var Access = require('../api/model/access.model');

User.find({}).remove(function() {
	User.create({
		provider: 'local',
		name: 'Test User',
		role: 'modeler',
		email: 'test@test.com',
		password: 'test'
	}, {
		provider: 'local',
		name: 'Test User with Models',
		role: 'modeler',
		email: 'testWithModels@test.com',
		password: 'test'
	}, {
		provider: 'local',
		role: 'admin',
		name: 'Admin',
		email: 'admin@admin.com',
		password: 'admin'
	}, function(err, user1, user2, user3) {
		console.log('finished populating users');
		createModels(user2);
	});
});

function createModels(modelUser) {
	Model.find({}).remove(function() {
		var modelAccess = new Access({
			user: modelUser._id,
			role: 'owner'
		});
		Model.create({
			name: 'Model 1',
			access: [modelAccess]
		}, {
			name: 'Model 2',
			access: [modelAccess]
		}, function(err, model1, model2) {
			console.log('finished populating models');
		})
	});

}
