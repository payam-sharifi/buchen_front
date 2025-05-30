import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import {
  setAlert,
  setError,
  setMessage,
} from '@/redux/features/snackBarHandlerSlice';

/**
 * Log a warning and show a toast!
 */
export const errorHandlerMidlewsare: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const statusCode = action.meta; // Assuming you store the status code in the action's meta
      if (statusCode.baseQueryMeta.response.status === 400) {
        dispatch(setError(true));
        dispatch(setAlert(true));
        dispatch(setMessage(action.payload.data.message));
      }
      if (statusCode.baseQueryMeta.response.status === 401) {
        window.localStorage.removeItem('x-token');
        window.location.reload();
      }
      if (statusCode.baseQueryMeta.response.status === 500) {
        console.log('there is an error with status 500!');
      }
    }

    return next(action);
  };
