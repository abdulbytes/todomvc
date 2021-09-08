import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FilterEnum } from "../../../model/filter";

export interface FilterState {
  filter: FilterEnum;
}

const initialState: FilterState = {
  filter: FilterEnum.ALL,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    filterSelected: (state, action: PayloadAction<FilterEnum>) => {
      state.filter = action.payload;
    },
  },
});

export const { filterSelected } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter.filter;

export default filterSlice.reducer;
