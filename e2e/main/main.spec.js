'use strict';

describe('Main View', function() {
  var page, loginPage;

  beforeEach(function() {
    page = require('./main.po');
    loginPage = require('./../login.po');
  });

  it('should ask user to log in if not logged in', function(){
    browser.get('/');
    expect(page.greetings.getText()).toBe('Please, log in or register to access features.');
  });

  it('should greet user if logged in', function(){
    loginPage.login({
      email: 'test@test.com',
      password: 'test'
    });
    expect(page.greetings.getText()).toBe('Welcome, Test User.');
  });

});
