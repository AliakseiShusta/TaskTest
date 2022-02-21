export class basePageForFactorial{


    typeEnterInteger(Integer){
        cy.get('[placeholder="Enter an integer"]')
        .type(Integer)
    }
    typeClear(){
        cy.get('[placeholder="Enter an integer"]')
        .clear()
    }
    submit(){
        cy.get('button[type="submit"]')
        .click()
    }
    linkClick(link, text){
        cy.contains(link, text)
        .click()
    }
}

export const basePageF = new basePageForFactorial()