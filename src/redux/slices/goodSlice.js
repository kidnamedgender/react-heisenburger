import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoods = createAsyncThunk('good/fetchGoodsStatus', async (params) => {
  const { currentCategory, currentSortBy, sortType } = params;
  const res = await axios.get(
    `https://6410bdf72fcea003328ba02f.mockapi.io/burgers?category=${
      currentCategory === 'Все' ? '' : currentCategory
    }&sortBy=${currentSortBy.sortProp}&order=${sortType ? 'asc' : 'desc'}`,
  );
  return res.data;
});

const initialState = {
  burgers: [],
  status: 'pending',
};

export const goodSlice = createSlice({
  name: 'good',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.status = 'pending';
      state.burgers = [];
    });
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.status = 'fullfiled';
      state.burgers = action.payload;
    });
    builder.addCase(fetchGoods.rejected, (state) => {
      state.status = 'rejected';
      state.burgers = [];
    });
  },
});

export const goodsSelector = (state) => state.good;

export default goodSlice.reducer;
