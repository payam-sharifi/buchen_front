import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParamsType } from '@/schema/Utils';

type ProductType = {
  selectedDate: string;
  startSelectedTime: string;
  endSelectedTime: string;
  planTagId: number;
  planId: number;
  planTagTitle: string;
  listAttach: any[];
};

const initialState = {
  selectedDate: '',
  startSelectedTime: '',
  endSelectedTime: '',
  planTagId: 1,
  planId: 11,
  planTagTitle: '',
  listAttach: [],
} as ProductType;

export const planning = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    reset: () => initialState,
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload.date;
      state.startSelectedTime = action.payload.start;
      state.endSelectedTime = action.payload.end;
    },
    getTagSession: (state, action) => {
      state.planTagId = action.payload;
    },
    getIdTagSession: (state, action) => {
      state.planId = action.payload;
    },
    getTagTitleSession: (state, action) => {
      state.planTagTitle = action.payload;
    },
    getListAttach: (state, action) => {
      state.listAttach = action.payload;
    },

  },
});

export const {
  updateSelectedDate,
  reset,
  getTagSession,
  getIdTagSession,
  getTagTitleSession,
  getListAttach,
} = planning.actions;
export default planning.reducer;
