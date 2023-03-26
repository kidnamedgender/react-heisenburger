import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGood = createAsyncThunk('goodId/fetchGoodStatus', async ({ id }) => {
  const res = await axios.get(`https://6410bdf72fcea003328ba02f.mockapi.io/burgers/${id}`);
  return res.data;
});

const goodIdSlice = createSlice({
  name: 'goodId',
  initialState: {
    burger: [],
    status: 'pending',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGood.pending, (state) => {
      state.status = 'pending';
      state.burger = [];
    });
    builder.addCase(fetchGood.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.burger = action.payload;
    });
    builder.addCase(fetchGood.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default goodIdSlice.reducer;
