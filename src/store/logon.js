import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  USERINFO_VERIFY,
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
} from './actionTypes';
import { setActionType, statusType } from './utils';
import ajax from '../ajax/axios';

const moduleName = 'userInfo';
const type = setActionType(moduleName);

export const verifyUserInfo = createAsyncThunk(
  type(USERINFO_VERIFY),
  async (userInfo) => {
    const res = await ajax.post('/verify-user-info', { data: userInfo });
    return res;
  }
);

const userInfo = createSlice({
  name: moduleName,
  initialState: {
    status: statusType,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserInfo.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(verifyUserInfo.fulfilled, (state, action) => {
        const { data, error } = action.payload;

        state.status = statusType.success;

        if (error) {
          state.data = null;
          state.error = error;
          return;
        }

        state.data = action.payload;
      })
      .addCase(verifyUserInfo.rejected, (state, action) => {
        state.status = statusType.fail;
        state.data = null;
        state.error = action.error;
      });
  },
});

export default userInfo.reducer;
