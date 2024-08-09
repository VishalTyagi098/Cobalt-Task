import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchQuery: "",
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.uri === action.payload.uri
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleFavorite, setSearchQuery } = favoritesSlice.actions;
export default favoritesSlice.reducer;
