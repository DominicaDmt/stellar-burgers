import store from './store';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    // Получаем начальное состояние из уже созданного store
    const initialState = store.getState();

    // Проверяем, что состояние содержит все нужные слайсы
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('orderInfo');
    expect(initialState).toHaveProperty('ingredientDetails');

    // Проверяем начальное состояние ingredients
    expect(initialState.ingredients).toEqual({
      data: [],
      loading: false,
      error: null
    });

    // Проверяем начальное состояние burgerConstructor
    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    // Проверяем начальное состояние orderInfo
    expect(initialState.orderInfo).toEqual({
      order: null,
      loading: false,
      error: null
    });

    // Проверяем начальное состояние ingredientDetails
    expect(initialState.ingredientDetails).toEqual({
      ingredient: null
    });
  });
});
