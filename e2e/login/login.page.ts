import { element, by, protractor, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class LoginPageObject {

    private form;
    private passwordInput;
    private emailInput;
    private submitButton;
    private goToRegisterLink;
    private title;

    constructor() {
        this.title = element(by.id('login-title'));
    }

    navigateToForgotPasswordPage(): wdpromise.Promise<void> {
        return this.goToForgotPasswordLink.click();
    }

    navigateToRegisterPage(): wdpromise.Promise<void> {
        return this.goToRegisterLink.click();
    }

    setEmail(value: string): wdpromise.Promise<void> {
        return this.emailInput.clear().sendKeys(value);
    }

    setPassword(value: string): wdpromise.Promise<void> {
        return this.passwordInput.clear().sendKeys(value);
    }

    getTitle(): wdpromise.Promise<string> {
        return this.title.getText();
    }

    submitForm(): wdpromise.Promise<void> {
        return this.submitButton.sendKeys(protractor.Key.ENTER);
    }

    formIsValid(): wdpromise.Promise<boolean> {
        return this.getAllErrorMessages().count().then(value => {
            return value === 0;
        });
    }

    private getAllErrorMessages(): ElementArrayFinder {
        return element.all(by.css('.error-group'));
    }
}
