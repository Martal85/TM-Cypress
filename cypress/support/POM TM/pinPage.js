export class PinPage {
  
    constructor() {
      this.firstPinLocation = '.table-panel__message > :nth-child(1)'
    }
    
    visitPinPage() {
      cy.visit('https://anonymsms.com/number/447742567753/')
    }

    getTextAndExtractPIN() {
      cy.get(this.firstPinLocation).first().invoke('text').then(pin => { 
        let newpin = pin; 
        cy.log(newpin);
        cy.writeFile('cypress/fixtures/pin.json', {pin: newpin})
       })
    }
}

export const pinPage = new PinPage();