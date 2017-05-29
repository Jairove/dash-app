let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let cucumber = require('cucumber');

import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';




import { LoginPageObject } from './login.page';

@binding()
class LoginSteps {

  private loginPageObject = new LoginPageObject();

  @given(/^user is at the login page$/)
  public givenUserIsAtLoginPage (callback): void {
    this.loginPageObject.get();
    expect(this.loginPageObject.getTitle()).to.eventually.equal('Login');
    callback();
  }

  @given(/^'"([^"]*)"' is the user email in the login form$/)
  givenEmailIsInTheForm(arg: string, callback: any) {
    this.loginPageObject.setEmail(arg);
    callback();
  }

  @given(/^'"([^"]*)"' is the user password in the login form$/)
  givenPassIsInTheForm(pass: string, callback: any) {
    this.loginPageObject.setPassword(pass);
    callback();
  }

  @when(/^submitting the login form$/)
  whenSubmittingForm(callback: any) {
    this.loginPageObject.submitForm();
    callback();
  }

  @then(/^the login form is validated 'false'$/)
  thenInvalidFormIsValidated(callback: any) {
    expect(element(by.css('.alert-danger')).isPresent()).to.eventually.equal(false);
    callback();
  }

  @then(/^the login form is validated 'true'$/)
  thenFormIsValidated(callback: any) {
    expect(element(by.css('.alert-danger')).isPresent()).to.eventually.equal(false);
    callback();
  }
}

export = LoginSteps;
