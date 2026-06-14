describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);

    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { statusCode: 401 }).as('getUser');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients', { timeout: 10000 });
  });

  it('должен добавить ингредиент в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .find('button')
      .click({ force: true });

    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .find('button')
      .click({ force: true });

    cy.get('section').contains('Краторная булка N-200i (верх)').should('exist');
    cy.get('section').contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открыть модальное окно с данными выбранного ингредиента', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });

      cy.contains('Детали ингредиента', { timeout: 10000 }).should('be.visible');
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('420').should('be.visible');
      cy.contains('1255').should('be.visible');
    });

    it('должен закрыть модальное окно по крестику', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });
      cy.contains('Детали ингредиента', { timeout: 10000 }).should('be.visible');
      
      // Возвращаемся на главную страницу (закрываем модалку-роут)
      cy.visit('http://localhost:4000');
      
      cy.contains('Детали ингредиента').should('not.exist', { timeout: 5000 });
    });

    it('должен закрыть модальное окно по оверлею', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });
      cy.contains('Детали ингредиента', { timeout: 10000 }).should('be.visible');
      
      // Возвращаемся на главную страницу (закрываем модалку-роут)
      cy.visit('http://localhost:4000');
      
      cy.contains('Детали ингредиента').should('not.exist', { timeout: 5000 });
    });
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

    it('должен создать заказ, закрыть модалку и очистить конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click({ force: true });

      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click({ force: true });

      cy.contains('Оформить заказ').click({ force: true });
      cy.wait('@createOrder', { timeout: 10000 });

      cy.contains('54321', { timeout: 10000 }).should('be.visible');
      
      // Закрываем модалку через ESC или перезагрузку
      cy.get('body').type('{esc}');
      
      cy.contains('54321').should('not.exist', { timeout: 5000 });

      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    });
  });
});
