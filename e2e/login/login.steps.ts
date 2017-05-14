let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let cucumber = require('cucumber');

import { binding, given, when, then } from 'cucumber-tsflow';




import { LoginPageObject } from './login.page';

@binding()
class LoginSteps {

  private loginPageObject = new LoginPageObject();

  @given(/^user clicks the login link$/)
  private givenUserClicksTheLoginLink(callback: any) {
    //this.loginPageObject.getTitle();
    callback();
  }

  @given(/^'' is the user email in the login form$/)
  givenEmailIsInTheForm(email: string, callback: any) {
    //this.loginPageObject.setEmail(email);
    callback();
  }

  @given(/^"([^"]*)" is the user password in the login form$/)
  givenPassIsInTheForm(pass: string, callback: any) {
    //this.loginPageObject.setPassword(pass);
    callback();
  }

  @when(/^submitting the login form$/)
  whenSubmittingForm(callback: any) {
    //this.loginPageObject.submitForm();
    callback();
  }

  @then(/^the login form is validated$/)
  thenFormIsValidated(callback: any) {
    expect(this.loginPageObject.formIsValid()).to.become(true);
    callback();
  }
}

export = LoginSteps;
