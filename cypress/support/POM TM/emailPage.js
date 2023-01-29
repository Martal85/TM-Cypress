export class EmailPage {
  
    constructor() {
      this.emailNameInputField = 'input#code.text-right';
      this.emailSubmitButton = 'input#submit_code.btn.btn-primary';
      this.firstEmailLocation = '#messages > a:nth-child(1) > div.subject'
      this.textInEmail = '.message_full';
    }
    
    visitEmailPage() {
      cy.visit('https://qa.team/?locale=en')
    }
    
    fillEmail(value) {
      cy.get( this.emailNameInputField).type(value)
    }  
    
    clickSubmitButton() {
      cy.get(this.emailSubmitButton).click()
    }

    openFirstEmail() {
      cy.get(this.firstEmailLocation).click()
    }

    getTextAndExtractActivationUrl() {
      cy.get(this.textInEmail).invoke('text').then(text2 => { 
        let textValue2 = text2; 
        cy.log(textValue2 );
        const myArray = textValue2.split("(");
        let https = myArray[1];
        cy.log(https);
        const myArray2 = https.split(")");
        let neurl = myArray2[0];
        let newurl = neurl
        cy.log(newurl);
        cy.writeFile('cypress/fixtures/url.json', {url: newurl})
       })
    }
}

export const emailPage = new EmailPage();