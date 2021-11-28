import {apiURL} from "../../../src/utils/constants";

describe('service is available', function() {
    const bunId = "60d3b41abdacab0026a733c6";
    const ingredientId = '60d3b41abdacab0026a733c8';
    before(function() {
        cy.visit('http://localhost:3000');
    });
    it('should open ingredient modal', function() {
        cy.get(`#${bunId}`).click();
        cy.get('#modal').should('exist');
        cy.get('#modal h1').should('have.text', 'Детали ингредиента').should('have.id', bunId);
        cy.get('#modal h5').should('have.text', 'Краторная булка N-200i');
    });
    it('should close ingredient modal', () => {
        cy.get('#modal svg').click();
        cy.get('#modal').should('not.exist');
    })
    it('should create order', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type=email]').type('gp1.it@mail.ru');
        cy.get('input[type=password]').type('123456');
        cy.get('form').trigger("submit");
        cy.get(`#${bunId}`).trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get(`#${bunId} [class^="counter_counter__num"]`).should('have.text', 2);
        cy.get('#constructorList .constructor-element_pos_top .constructor-element__text').should('have.text', 'Краторная булка N-200i (верх)');
        cy.get('#constructorList .constructor-element_pos_bottom .constructor-element__text').should('have.text', 'Краторная булка N-200i (низ)');
        cy.get(`#${ingredientId}`).trigger('dragstart');
        cy.get('#constructorList').trigger('drop');
        cy.get(`#${ingredientId} [class^="counter_counter__num"]`).should('have.text', 1);
        cy.get(`#constructorList #${ingredientId} .constructor-element__text`).should('have.text', 'Филе Люминесцентного тетраодонтимформа');
        cy.intercept('POST' ,`${apiURL}/orders`).as('postOrder')
        cy.contains('Оформить заказ').trigger('click');
        cy.wait('@postOrder');
        cy.get('#modal').should('exist');
        cy.contains('идентификатор заказа');
        cy.get('#modal [class^="modal_close"] svg').trigger('click');
    })
});