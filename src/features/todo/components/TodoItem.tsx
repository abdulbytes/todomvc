import { FC, Fragment, useState } from "react";
import classNames from "classnames";
import { Todo } from "../../../model/todo";
import { Badge } from "react-bootstrap";
import TodoModal from "./TodoModal";
import { useDispatch } from "react-redux";
import { todoUpdated } from "../store/todoSlice";

type TodoItemProps = {
  todo: Todo;
  onDestroy: (id: string) => void;
  onToggle: (todo: Todo) => void;
};

const TodoItem: FC<TodoItemProps> = ({ todo, onDestroy, onToggle }) => {
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const handleCompleted = () => {
    onToggle({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    onDestroy(todo.id);
  };

  const handleSubmit = (updated: Todo) => {
    dispatch(todoUpdated(updated));
  };

  const handleClose = () => setEditing(false);
  const handleShow = () => setEditing(true);

  const { completed, tags } = todo;

  return (
    <div
      onDoubleClick={(e) => {
        handleShow();
      }}
    >
      <li
        className={classNames({ completed, editing })}
        data-testid="todo-item"
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompleted}
          />
          <label data-testid="todo-name">{todo.title}</label>
          <div className="badge-container">
            {tags &&
              tags.map((tag, index) => (
                <Fragment key={index}>
                  <Badge variant="dark" className="badge">
                    {tag}
                  </Badge>{" "}
                </Fragment>
              ))}
          </div>

          <button
            className="destroy"
            onClick={handleDelete}
            data-testid="todo-remove"
          />
        </div>
        <TodoModal
          onHide={handleClose}
          showModal={editing}
          onSave={handleSubmit}
          currentTodo={todo}
        />
      </li>
    </div>
  );
};

export default TodoItem;
