import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

interface IngredientDetailsState {
  ingredient: TIngredient | null;
}

const initialState: IngredientDetailsState = {
  ingredient: null
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
    },
    clearIngredient: (state) => {
      state.ingredient = null;
    }
  }
});

export const { setIngredient, clearIngredient } =
  ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
