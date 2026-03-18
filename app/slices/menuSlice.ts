import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MenuState {
  count: number;
}

// Define the initial state using that type
const initialState: MenuState = {
  count: 0,
};

export const menuSlice = createSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Pure functions
    // Use the PayloadAction type to declare the contents of `action.payload`
    plus: (state) => {
      state.count += 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    minus: (state) => {
        if (state.count > 0) {
            state.count -= 1;
        }
        
    }
  },
  selectors: {
    selectCount: (x) => x.count,
  },
});

export const {  plus, reset, minus } = menuSlice.actions;
export const { selectCount } = menuSlice.selectors;

export default menuSlice.reducer;