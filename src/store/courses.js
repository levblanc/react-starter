import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  COURSEINFO_REQUEST,
  COURSEINFO_SUCCESS,
  COURSEINFO_FAILURE,
} from './actionTypes';
import { setActionType, statusType } from './utils';
import ajax from '../ajax/axios';

const moduleName = 'courseInfo';
const type = setActionType(moduleName);

export const getCourseInfo = createAsyncThunk(
  type(COURSEINFO_REQUEST),
  async (courseType) => {
    const res = await ajax.get('/get-courses-info', { params: { courseType } });
    return res;
  }
);

const courseInfo = createSlice({
  name: moduleName,
  initialState: {
    status: statusType.idle,
    type: null,
    list: null,
    type: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseInfo.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(getCourseInfo.fulfilled, (state, action) => {
        const { data, error } = action.payload;

        state.status = statusType.success;

        if (error) {
          state.list = null;
          state.type = null;
          state.error = error;
          return;
        }

        state.list = data.list;
        state.type = data.type;
      })
      .addCase(getCourseInfo.rejected, (state, action) => {
        const { data, error } = action.payload;

        state.status = statusType.fail;
        state.list = null;
        state.type = null;
        state.error = error;
      });
  },
});

export const selectCourseType = (state) => {
  return state.courses.type;
};

export const selectAllCourses = (state) => {
  return state.courses.list;
};

export const selectCourseStatus = (state) => {
  return state.courses.status;
};

export default courseInfo.reducer;
