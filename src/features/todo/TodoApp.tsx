import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoLocalStorage } from "./services/local-storage";
import MainTodoSection from "./components/Main";
import { useAppSelector } from "../../app/hooks";
import { storeInitializedFromStorage } from "./store/todoSlice";
import TodoInput from "./components/TodoInput";

const TodoApp = () => {
  const dispatch = useDispatch();
  const todoList = useAppSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(storeInitializedFromStorage(TodoLocalStorage.getTodoList()));
  }, [dispatch]);

  useEffect(() => {
    TodoLocalStorage.storeTodoList(todoList);
  }, [todoList]);

  return (
    <>
      <TodoInput />
      {!!todoList.length && <MainTodoSection />}
    </>
  );
};

export default TodoApp;
