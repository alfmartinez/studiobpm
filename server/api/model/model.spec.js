'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Model = require('./model.model');
var Access = require('./access.model');
var agent = request.agent(app);

var user = new User({
	provider: 'local',
	name: 'Fake User',
	email: 'newbee@test.com',
	role: 'modeler',
	password: 'password'
});

var userWithModel = new User({
	provider: 'local',
	name: 'Fake Modeler User',
	email: 'modeler@test.com',
	role: 'modeler',
	password: 'password'
});

describe('GET /api/models', function() {

	before(function(done) {
		// Clear users before testing
		User.remove().exec().then(function() {
			user.save(function() {
				userWithModel.save(function() {
					var access = {
						user: userWithModel._id,
						role: 'owner'
					};
					Model.remove().exec().then(function() {
						Model.create({
							name: 'Model 1',
							access: [access]
						});
					});
				});
			});
			done();
		});
	});

	it('should respond with a 401 error if user not authenticated', function(
		done) {
		request(app)
			.get('/api/models')
			.expect(401)
			.expect('Content-Type', /text\/html/)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('should respond with empty array if authenticated and no model', function(
		done) {
		doLogin({
			email: 'newbee@test.com',
			password: 'password'
		}, expectModelCount(0, done));
	});

	it('should respond with one model array if authenticated and one model',
		function(
			done) {
			doLogin({
				email: 'modeler@test.com',
				password: 'password'
			}, expectModelCount(1, done));
		});

	function doLogin(user, callback) {
		agent.post('/auth/local').send(user).expect(200).end(callback);
	}

	function expectModelCount(count, done) {
		return function(err, res) {
			var token = res.body.token;
			setTimeout(function() {
				agent
					.get('/api/models?access_token=' + token)
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function(err, res) {
						if (err) return done(err);
						res.body.should.be.instanceof(Array).and.have.lengthOf(count);
						done();
					});
			}, 100);

		}
	}

});
