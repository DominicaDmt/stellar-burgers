import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      data: [],
      loading: false,
      error: null
    });
  });

  it('должен вернуть начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual({
      data: [],
      loading: false,
      error: null
    });
  });

  it('должен обработать pending', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обработать fulfilled', () => {
    const mockData = [{ _id: '1', name: 'Тест' }];
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    });
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('должен обработать rejected', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
