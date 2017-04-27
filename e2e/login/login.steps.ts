let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import { binding, given, when, then } from 'cucumber-tsflow';

import { CallbackStepDefinition } from 'cucumber';

import { LoginPageObject } from './login.page';

@binding()
class LoginSteps {

  private loginPageObject = new LoginPageObject();

  @given(/^user clicks the login link$/)
  private givenUserClicksTheLoginLink(callback: CallbackStepDefinition) {
    this.loginPageObject.getTitle();
    callback();
  }

  @given(/^"([^"]*)" is the user email in the login form$/)
  givenEmailIsInTheForm(email: string, callback: CallbackStepDefinition) {
    this.loginPageObject.setEmail(email);
    callback();
  }

  @given(/^"([^"]*)" is the user password in the login form$/)
  givenPassIsInTheForm(pass: string, callback: CallbackStepDefinition) {
    this.loginPageObject.setPassword(pass);
    callback();
  }

  @when(/^submitting the login form$/)
  whenSubmittingForm(pass: string, callback: CallbackStepDefinition) {
    this.loginPageObject.submitForm();
    callback();
  }

  @then(/^the login form is validated$/)
  thenFormIsValidated(pass: string, callback: CallbackStepDefinition) {
    expect(this.loginPageObject.formIsValid()).to.become(true);
    callback();
  }
}

export = LoginSteps;
