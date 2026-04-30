describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients', { timeout: 10000 });
  });

  it('должен добавить ингредиент в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .find('button')
      .click({ force: true });
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.setCookie('accessToken', 'test-access-token');
      
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients', { timeout: 10000 });
    });

    afterEach(() => {
      localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('должен создать заказ с правильным номером', () => {
      // Добавляем булку
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click({ force: true });
      
      // Добавляем начинку
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click({ force: true });

      // Нажимаем "Оформить заказ"
      cy.contains('Оформить заказ').click({ force: true });
      cy.wait('@createOrder', { timeout: 10000 });
      
      // Проверяем номер заказа из моковых данных
      cy.contains('54321', { timeout: 10000 }).should('exist');
    });
  });
});
