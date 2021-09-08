import { useState } from "react";
import { Todo } from "../../../model/todo";
import { todoAdded } from "../store/todoSlice";
import TodoModal from "./TodoModal";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

const TodoInput = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (todo: Todo) => {
    dispatch(todoAdded(todo));
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button onClick={handleShow} className="new-todo">
        + Add
      </Button>
      <TodoModal
        onHide={handleClose}
        showModal={showModal}
        onSave={handleSubmit}
      />
    </>
  );
};

export default TodoInput;
