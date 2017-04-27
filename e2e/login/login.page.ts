import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class LoginPageObject {

    private form;
    private passwordInput;
    private emailInput;
    private submitButton;
    private title;

    constructor() {
        this.title = element(by.id('login-title'));
        this.emailInput = element(by.id('username'));
        this.passwordInput = element(by.id('password'));
        this.submitButton = element(by.css('login-button'));
    }

    getTitle(): wdpromise.Promise<string> {
        return this.title.getText();
    }

    submitForm(): wdpromise.Promise<void> {
        return this.submitButton.sendKeys(protractor.Key.ENTER);
    }

    formIsValid(): wdpromise.Promise<boolean> {
        let valid = this.getErrorMessage().then( (result) => valid = result != '');
        return valid;
    }

    private getErrorMessage(): wdpromise.Promise<string> {
        return element(by.css('.alert-danger')).getText();
    }

    setEmail(value: string): wdpromise.Promise<void> {
        return this.emailInput.clear().sendKeys(value);
    }

    setPassword(value: string): wdpromise.Promise<void> {
        return this.passwordInput.clear().sendKeys(value);
    }


}
