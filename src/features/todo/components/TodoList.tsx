import React from "react";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { Todo } from "../../../model/todo";
import { useAppSelector } from "../../../app/hooks";
import {
  allTodosCompleted,
  areAllTodosCompleted,
  todoDeleted,
  todoUpdated,
} from "../store/todoSlice";
import { selectFilteredTodos } from "../store/todoSelectors";

export const TodoList = () => {
  const dispatch = useDispatch();

  const filteredTodoList: Todo[] = useAppSelector((state) =>
    selectFilteredTodos(state, state.filter.filter)
  );

  const areAllCompleted = useAppSelector((state) =>
    areAllTodosCompleted(state.todos.todos)
  );

  const completeAll = () => dispatch(allTodosCompleted());
  const edit = (values: Todo) => dispatch(todoUpdated(values));
  const remove = (id: string) => dispatch(todoDeleted(id));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={areAllCompleted}
        readOnly
      />
      <label htmlFor="toggle-all" onClick={completeAll} />

      <ul className="todo-list">
        {filteredTodoList.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDestroy={remove}
            onToggle={edit}
          />
        ))}
      </ul>
    </section>
  );
};
