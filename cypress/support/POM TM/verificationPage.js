export class VerificationPage {
  
    constructor() {
      this.checkEmailtext = '#pages_content_252';
    }
     
    verifyThatIsCreated() {
      cy.get( this.checkEmailtext).contains('Check your mail')
        
    }       
}

export const verificationPage = new VerificationPage();