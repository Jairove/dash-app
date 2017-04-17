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
  //  this.loginPageObject.getTitle();
  //  callback();
  };

export = LoginSteps;
