describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);

    // Мокаем все запросы для всех тестов
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { statusCode: 401 }).as('getUser');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients', { timeout: 10000 });
  });

  describe('Добавление ингредиента в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click({ force: true });

      // Проверяем именно в конструкторе
      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Краторная булка N-200i');
    });

    it('должен добавить начинку в конструктор', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click({ force: true });

      // Проверяем именно в конструкторе
      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открыть модальное окно с данными выбранного ингредиента', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });
      
      // Проверяем именно в модальном окне
      cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="modal"]').should('contain', 'Краторная булка N-200i');
      cy.get('[data-testid="modal"]').should('contain', '420');
    });

    it('должен закрыть модальное окно по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });
      cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');

      cy.get('[data-testid="modal-close-button"]').click({ force: true });
      cy.get('[data-testid="modal"]', { timeout: 5000 }).should('not.exist');
    });

    it('должен закрыть модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click({ force: true });
      cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');

      cy.get('[data-testid="modal-overlay"]').click({ force: true });
      cy.get('[data-testid="modal"]', { timeout: 5000 }).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      // Подготовка авторизации
      localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.setCookie('accessToken', 'test-access-token');

      // Переопределяем моки для авторизованного пользователя
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

      // Перезагружаем страницу с новыми моками
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients', { timeout: 10000 });
    });

    afterEach(() => {
      // Очистка после теста
      localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('должен создать заказ, закрыть модалку и очистить конструктор', () => {
      // 1. Добавляем булку
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click({ force: true });

      // 2. Добавляем начинку
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click({ force: true });

      // 3. Проверяем, что ингредиенты в конструкторе
      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Краторная булка N-200i')
        .should('contain', 'Биокотлета из марсианской Магнолии');

      // 4. Оформляем заказ
      cy.get('[data-testid="burger-constructor"]')
        .contains('Оформить заказ')
        .click({ force: true });
      
      cy.wait('@createOrder', { timeout: 10000 });

      // 5. Проверяем модалку с номером заказа
      cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');
      cy.get('[data-testid="order-number"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', '54321');

      // 6. Закрываем модалку через нажатие Escape
      cy.get('body').type('{esc}');
      
      // 7. Проверяем, что модалка закрылась
      cy.get('[data-testid="modal"]', { timeout: 5000 }).should('not.exist');

      // 8. Проверяем, что конструктор пуст
      cy.get('[data-testid="burger-constructor"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Выберите булки');
    });
  });
});
