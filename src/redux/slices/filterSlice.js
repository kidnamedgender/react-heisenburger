import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: 'Все',
  currentSortBy: {
    sortTitle: 'популярности',
    sortProp: 'rating',
  },
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    changeSortBy: (state, action) => {
      state.currentSortBy = action.payload;
    },
    changeSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.currentCategory = action.payload.category;
      state.currentSortBy = action.payload.sortBy;
    },
    clearFilters(state) {
      state.currentCategory = initialState.currentCategory;
      state.currentSortBy = initialState.currentSortBy;
    },
  },
});

export const filterSelector = (state) => state.filter;
export const currentCategorySelector = (state) => state.filter.currentCategory;
export const currentSortBySelector = (state) => state.filter.currentSortBy;
export const { changeCategory, changeSortBy, changeSearch, setFilters, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
