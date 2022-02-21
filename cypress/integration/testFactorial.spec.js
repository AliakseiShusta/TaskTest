//// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import { basePageF } from "../support/pages/basePageForFactorial";

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }

describe('Использование паттерна Page Object',() => {
    it('Вход на страницу', () => {
        cy.visit('http://qainterview.pythonanywhere.com/');
    });

    it('Факториал минимально возможного числа(граничного значения)', () => {
        basePageF.typeEnterInteger('0');
        basePageF.submit()
            cy.get('#resultDiv')
            .should('have.text', 'The factorial of 0 is: 1')
    });

    it('Факториал целого нечетного числа', () => {
        basePageF.typeClear();
        basePageF.typeEnterInteger('1');
        basePageF.submit();
            cy.get('#resultDiv')
            .should('have.text', 'The factorial of 1 is: 1')
    });

    it('Факториал целого четного числа', () => {
        basePageF.typeClear()
        basePageF.typeEnterInteger('8');
        basePageF.submit()
            cy.get('#resultDiv')
            .should('have.text', 'The factorial of 8 is: 40320')
    });

    it('Факториал максимального(граничное значение) расчитываемого приложением', () => {
        basePageF.typeClear()
        basePageF.typeEnterInteger('170');
        basePageF.submit()
            cy.get('#resultDiv')
            .should('have.text', 'The factorial of 170 is: 7.257415615307999e+306')
    });
});

describe('XSS - уязвимость',() => {
    it('Вводим самый популярный JavaScript-код для проверки', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('<script>alert(123)</script>')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
    });
});

describe('Позитивное тестирование',() => {
    it('Проверка расчета факториала "7"', () => {
        let numF = 7
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type(`${numF}`)
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', `The factorial of ${numF} is: ${factorial(numF)}`)
    });
    it('Проверка расчета факториала "10"', () => {
        let numF = 10
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type(`${numF}`)
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', `The factorial of ${numF} is: ${factorial(numF)}`)
    });
    it('Проверка расчета факториала "16"', () => {
        let numF = 16
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type(`${numF}`)
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', `The factorial of ${numF} is: ${factorial(numF)}`)
    });
    it('Проверка расчета факториала "33"', () => {
        cy.visit('http://qainterview.pythonanywhere.com/');
        let numF = 33
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type(`${numF}`)
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', `The factorial of ${numF} is: ${factorial(numF)}`)
    });
    it('Расчет факториала "100"', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('100')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'The factorial of 100 is: 9.332621544394415e+157')
    });
    it('Расчет факториала "170"', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('170')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'The factorial of 170 is: 7.257415615307999e+306')
    });
});

describe('Негативное тестирование',() => {

    it('Без ввода значения', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
    });

    it('Факториал отрицательного числа', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('-1')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
    });
    it('Факториал дробного числа', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('0.2')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
    });

    it('Факториал числа превышающее максимально расчитываемое приложением', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('171')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'The factorial of 171 is: Infinity')
    });

    it('Проверка ввода текста', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('WelcomeToHell')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
    });

    it('Проверка ввода спец. символов', () => {
        cy.get('[placeholder="Enter an integer"]')
        .clear()
        cy.get('[placeholder="Enter an integer"]')
        .type('+-=&*!@#%^&')
        cy.get('button[type="submit"]')
        .click()
        cy.get('#resultDiv')
        .should('have.text', 'Please enter an integer')
        cy.get('[placeholder="Enter an integer"]')
        .clear()
    });
    it('Поиск элементов с помощью XPath', () => {
        cy.xpath('//head/title')
        .should("[text()='Factoriall']")
    });
});

describe('Проверка активости ссылок',() => {
    it('Проверка активости ссылок Terms and Conditions', () => {
        cy.visit('http://qainterview.pythonanywhere.com/');
        basePageF.linkClick('a', 'Terms and Conditions')
        cy.get('body')
            .should('have.text', 'This is the privacy document. We are not yet ready with it. Stay tuned!')
    });

    it('Проверка активности ссылок Privacy', () => {
        cy.visit('http://qainterview.pythonanywhere.com/');
        basePageF.linkClick('a', 'Privacy')
        cy.get('body')
        .should('have.text', 'This is the terms and conditions document. We are not yet ready with it. Stay tuned!')
    });
});