import { faker } from '@faker-js/faker'
import { registerPage } from "../support/POM TM/registerPage";
import { verificationPage } from "../support/POM TM/verificationPage";
import { emailPage } from "../support/POM TM/emailPage";
import { activationPage } from "../support/POM TM/activationPage";
import { pinPage } from "../support/POM TM/pinPage";


describe('Create and activate new account', function () {
  before ( () => {
    //cy.visit('https://transfermate.io/en/register.asp?')
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })
  });
  
  
  let data = {
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    country: 'Bulgaria',
    phoneCode: 'Bulgaria +359',
    pinPhone: '7742567753',
    password: 'Tester123!'
  }
  let datanew = {
    email: data.randomFirstName + data.randomLastName + '@qa.team',
    emailName: data.randomFirstName + data.randomLastName,
  }

  it('User can register new account', () => {
    cy.writeFile('cypress/fixtures/data.json', {emailName: datanew.emailName,
      email: datanew.email})
    registerPage.openRegisterPage()
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    cy.fixture('data.json').then(data => {
      registerPage.fillEmail(data.email)
    })
    registerPage.selectMobileDialingCode()
    registerPage.fillPhone(data.pinPhone)
    registerPage.checkTermsOfUseAgree()
    cy.wait(8000)  //To enter manualy the calc CAPTCHA
    registerPage.clickOpenMyFreeAccountButton()
    verificationPage.verifyThatIsCreated()
    cy.wait(1000) //Email to be sent
    
  });
  it('Get Activation Link', () => {
    emailPage.visitEmailPage()
    cy.fixture('data.json').then(data => {
    emailPage.fillEmail(data.emailName)
  })
    emailPage.clickSubmitButton()
    emailPage.openFirstEmail()
    emailPage.getTextAndExtractActivationUrl()
  });


  it('Open the activation Link and enter password', () => {
    cy.fixture('url.json').then(data => { //enter the email from the fixture file
      cy.visit(data.url)
    })
    activationPage.enterPassword(data.password);
    activationPage.enterConfirmPassword(data.password);
    activationPage.clickConfirmationButton();
    cy.wait(7000) // The sms with PIN to be send successfully
  });

  it('Get the PIN', () => {
    pinPage.visitPinPage()
    pinPage.getTextAndExtractPIN()
  })


  it('Use the pin to complete the activation', () => {
    cy.fixture('url.json').then(data => { //enter the email from the fixture file
      cy.visit(data.url)
    })
    activationPage.enterPassword(data.password);
    activationPage.enterConfirmPassword(data.password);
    cy.intercept('https://transfermate.io/en/activate_new_account.asp', (req) => { 
      req.redirect('/customers', 301);
    })
    activationPage.clickConfirmationButton();
    cy.fixture('pin.json').then(data => { //enter the email from the fixture file
      activationPage.enterPin(data.pin)
      cy.intercept('https://transfermate.io/en/activate_new_account.asp', (req) => { 
      req.continue();
      })
    activationPage.clickVerifyButton()
    activationPage.verifyAccountActivationConfirmationMessage() 
  })    
  });
})  

describe('Register page checks', function () {
  beforeEach ( () => {
    cy.OpenRegPage()
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })
  });
  
  
  let data = {
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomEmail: faker.internet.email('','','qa.team'),
    newRandomEmail: faker.internet.email('','','qa.team'),
    randomPhoneNumber: faker.phone.number('#########'),
    country: 'Bulgaria',
    phoneCode: 'Bulgaria +359'
  }

  it('User can create account when all fields are filled ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    cy.wait(8000)  //To enter manualy the calc CAPTCHA
    registerPage.clickOpenMyFreeAccountButton()
    verificationPage.verifyThatIsCreated()   
  });

  it('User cant create account when the email address was already used ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    cy.wait(8000)  //To enter manualy the calc CAPTCHA
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForAlreadyExistEmail()
    registerPage.checkAlertWihtErrorMessageForAlreadyExistEmail()
  });
  
  it('User cant create account when Account Type is not selected ', () => {
    
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.newRandomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingAccountType()
     
  });

  it('User cant create account when First name field is not filled ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingFirstName()  
  });

  it('User cant create account when Last name field is not filled ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingLastName()  
  });

  it('User cant create account when Email field is not filled ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingEmail()
  });

  it('User cant create account when Phone field is not filled ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingPhone()
  });

  it('User cant create account when Terms and Conditions field is not checked ', () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkNewslatterAgree()
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertNotCheckedTerms()
  });

  it('User cant create account when only Email is filled ', () => {
    registerPage.fillEmail(data.randomEmail)
    registerPage.clickOpenMyFreeAccountButton()
    registerPage.checkAlertForMissingAccountType()
    registerPage.checkAlertForMissingFirstName()
    registerPage.checkAlertForMissingLastName()
    registerPage.checkAlertForMissingPhone()
    registerPage.checkAlertNotCheckedTerms()
  });
})  
