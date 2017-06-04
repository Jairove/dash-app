let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let cucumber = require('cucumber');

import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { binding, given, when, then } from 'cucumber-tsflow';
import { browser } from 'protractor';

import { RegisterPageObject } from './register.page';

@binding()
class RegisterSteps {

  private registerPageObject = new RegisterPageObject();

  @given(/^user is at the register page$/)
  public givenUserIsAtLoginPage (callback): void {
    this.registerPageObject.get();
    expect(this.registerPageObject.getTitle()).to.eventually.equal('Sign up');
    callback();
  }

  @given(/^'"([^"]*)"' is the user email in the register form$/)
  givenEmailIsInTheForm(arg: string, callback: any) {
    this.registerPageObject.setEmail(arg);
    callback();
  }

  @given(/^'"([^"]*)"' is the user password in the register form$/)
  givenPassIsInTheForm(pass: string, callback: any) {
    this.registerPageObject.setPassword(pass);
    callback();
  }

  @given(/^'"([^"]*)"' is the user name in the register form$/)
  givenNameIsInTheForm(name: string, callback: any) {
    this.registerPageObject.setName(name);
    callback();
  }

  @when(/^submitting the register form$/)
  whenSubmittingForm(callback: any) {
    this.registerPageObject.submitForm();
    callback();
  }

  @then(/^the register form is validated 'false'$/)
  thenInvalidFormIsValidated(callback: any) {
    expect(element(by.css('.alert-danger')).isPresent()).to.eventually.equal(false);
    callback();
  }

  @then(/^the register form is validated 'true'$/)
  thenFormIsValidated(callback: any) {
    expect(element(by.css('.alert-danger')).isPresent()).to.eventually.equal(false);
    callback();
  }
}

export = RegisterSteps;
