import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const dataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {userInfo} = dataSlice.actions;
export default dataSlice.reducer;
