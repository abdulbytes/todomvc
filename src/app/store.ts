import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/store/filterSlice";
import todoReducer from "../features/todo/store/todoSlice";

/**
 * Creates a Redux store that holds the complete state tree of the app
 * @param reducers reducer object passed to combineReducer
 */
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
