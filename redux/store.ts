import { configureStore } from '@reduxjs/toolkit';
import { errorHandlerMidlewsare } from './errorHandlerMidlewsare';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import snackBarHandlerSlice from '@/redux/features/snackBarHandlerSlice';


import planningSlice from '@/redux/features/planningSlice';

// import { NotificationApi } from './services/notificationApi';

import { planningApi } from '@/redux/services/planningApi';

export const store = configureStore({
  reducer: {

    planningSlice,
    snackBarHandlerSlice,

    [planningApi.reducerPath]: planningApi.reducer,
  },

  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat([
    
        planningApi.middleware,
      ])
      .concat([errorHandlerMidlewsare]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
