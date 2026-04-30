import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

const mockIngredient1: TIngredient = {
  _id: '2',
  name: 'Начинка 1',
  type: 'main',
  price: 50,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

const mockIngredient2: TIngredient = {
  _id: '3',
  name: 'Начинка 2',
  type: 'main',
  price: 75,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

describe('constructorSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен добавить булку', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(undefined, action);
    expect(state.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });

  it('должен добавить начинку', () => {
    const action = addIngredient(mockIngredient1);
    const state = constructorReducer(undefined, action);
    expect(state.ingredients).toHaveLength(1);
  });

  it('должен удалить ингредиент', () => {
    let state = constructorReducer(undefined, addIngredient(mockIngredient1));
    const id = state.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен переместить ингредиент вверх', () => {
    let state = constructorReducer(undefined, addIngredient(mockIngredient1));
    state = constructorReducer(state, addIngredient(mockIngredient2));
    const id1 = state.ingredients[0].id;
    const id2 = state.ingredients[1].id;
    
    state = constructorReducer(state, moveIngredientUp(1));
    expect(state.ingredients[0].id).toBe(id2);
    expect(state.ingredients[1].id).toBe(id1);
  });

  it('должен переместить ингредиент вниз', () => {
    let state = constructorReducer(undefined, addIngredient(mockIngredient1));
    state = constructorReducer(state, addIngredient(mockIngredient2));
    const id1 = state.ingredients[0].id;
    const id2 = state.ingredients[1].id;
    
    state = constructorReducer(state, moveIngredientDown(0));
    expect(state.ingredients[0].id).toBe(id2);
    expect(state.ingredients[1].id).toBe(id1);
  });

  it('должен очистить конструктор', () => {
    let state = constructorReducer(undefined, addIngredient(mockBun));
    state = constructorReducer(state, addIngredient(mockIngredient1));
    state = constructorReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
