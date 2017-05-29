import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
import { browser } from 'protractor';

export class LoginPageObject {

    private form;
    private passwordInput;
    private emailInput;
    private submitButton;
    private title;
    private errorMessage;

    constructor() {
        this.title = element(by.id('login-title'));
        this.emailInput = element(by.id('username'));
        this.passwordInput = element(by.id('password'));
        this.submitButton = element(by.css('.login-button'));
        this.errorMessage =  element(by.css('.alert-danger'));
    }

    getTitle(): wdpromise.Promise<string> {
        return this.title.getText();
    }

    submitForm(): wdpromise.Promise<void> {
        return this.submitButton.sendKeys(protractor.Key.ENTER);
    }

    getErrorMessage(): wdpromise.Promise<string> {
        return this.errorMessage.getText();
    }

    setEmail(value: string): wdpromise.Promise<void> {
        return this.emailInput.clear().sendKeys(value);
    }

    setPassword(value: string): wdpromise.Promise<void> {
        return this.passwordInput.clear().sendKeys(value);
    }

    get = function() {
      browser.get('http://localhost:3000/login');
    };


}
