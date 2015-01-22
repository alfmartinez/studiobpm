/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage = function() {
  this.form = element(by.css('form'));
  this.username = this.form.element(by.name('email'));
  this.password = this.form.element(by.name('password'));
  this.submit = this.form.element(by.css('.btn-login'));

  function login(user) {
    browser.get('/login');
    this.username.sendKeys(user.email);
    this.password.sendKeys(user.password);
    this.submit.click();
  }

  this.login = login;
};

module.exports = new LoginPage();
