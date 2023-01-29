export class ActivationPage {
  
    constructor() {
      this.passwordField = '#password';
      this.confirmPasswordField = '#confirm_password';
      this.confirmationButton = '#button_subscribe';
      this.pinField = '#user_pin'
      this.verifyButton = '#popup-verify-pin-btn';
      this.accountActivationConfirmationMessageField = '.verification_process_message'
      this.accountActivationConfirmationMessage = 'Welcome to your TransferMate account - to set your account to live you must complete verification.'
    }
     
    enterPassword(value) {
      cy.get(this.passwordField).type(value) 
    } 
    
    enterConfirmPassword(value) {
      cy.get(this.confirmPasswordField).type(value) 
    }

    clickConfirmationButton() {
      cy.get(this.confirmationButton).click()
    }

    enterPin(value) {
      cy.get(this.pinField).type(value)
    }

    clickVerifyButton() {
      cy.get(this.verifyButton).click()
    }

    verifyAccountActivationConfirmationMessage() {
      cy.get(this.accountActivationConfirmationMessageField).contains(this.accountActivationConfirmationMessage)
    }
}

export const activationPage = new ActivationPage();