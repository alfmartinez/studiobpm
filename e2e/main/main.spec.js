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

  it('should display a "Create new model" button in Model List', function(){
    loginPage.login({
      email: 'test@test.com',
      password: 'test'
    });
    expect(page.modelList.element(by.buttonText('Create new model')).isPresent()).toBeTruthy();
  });

  it('should display an empty list of models if user has no models', function(){
    loginPage.login({
      email: 'test@test.com',
      password: 'test'
    });
    expect(element.all(by.repeater('model in models')).count()).toEqual(0);
  });

});
