import { LoginPageObject } from './login.page';
import testData from './data';

describe('login page', function () {

    let pageObject = new LoginPageObject();

    beforeEach(() => {
        //authPageObject.goToLoginPage();
    });

    it('should get the login page', () => {
        expect(pageObject.getTitle()).toEqual('Login');
    });

    // testData.forEach((test) => {
    //
    //     it('should validate the login form (' + test.input.email + ',' + test.input.password + ')', () => {
    //         pageObject.setEmail(test.input.email);
    //         pageObject.setPassword(test.input.password);
    //         pageObject.submitForm();
    //         expect(pageObject.formIsValid()).toEqual(test.result.valid);
    //     });
    //
    // });


});
