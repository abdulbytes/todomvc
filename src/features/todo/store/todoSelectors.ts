import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FilterEnum } from "../../../model/filter";

/**
 * selector to retrieve completed todos
 * @param state redux root state
 */
export const selectCompletedTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => todo.completed);
};

/**
 * selector to retrieve non completed todos
 * @param state redux root state
 */
export const selectNotCompletedTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => !todo.completed);
};

/**
 * selector to retrieve filtered todos
 * @param state redux root state
 * @param filter filter enum
 */
export const selectFilteredTodos = (state: RootState, filter: FilterEnum) => {
  switch (filter) {
    case FilterEnum.ALL:
      return state.todos.todos;

    case FilterEnum.COMPLETED:
      return selectCompletedTodos(state);

    case FilterEnum.ACTIVE:
      return selectNotCompletedTodos(state);

    default:
      return state.todos.todos;
  }
};

const todoState = (state: RootState) => state.todos;

export const getCompletedTodos = createDraftSafeSelector(todoState, (state) => {
  return state.todos.filter((todo) => todo.completed);
});
