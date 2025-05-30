// errorSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { QueryParamsType } from '@/schema/Utils';

type SnackBarState = {
  status: boolean;
  message?: QueryParamsType;
  hasError: boolean;
  isSuccess: boolean;
};
const initialState = {
  status: false,
  message: [],
  hasError: false,
  isSuccess: false,
} as SnackBarState;

const snackBarHandlerSlice = createSlice({
  name: 'snackBarHandler',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload || '';
    },
    setAlert: (state, action) => {
      state.status = action.payload;
    },
    clearError: () => initialState,
  },
});

export const { setError, setSuccess, setAlert, clearError, setMessage } =
  snackBarHandlerSlice.actions;
export default snackBarHandlerSlice.reducer;
